import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) {}

  async createEvent(data: CreateEventDto) {
    const formattedDate = new Date(data.date).toISOString();
    return this.prisma.event.create({
      data: {
        ...data,
        date: formattedDate,
      },
    });
  }

  async getAllEvents() {
    return this.prisma.event.findMany();
  }

  async getEventById(id: number) {
    return this.prisma.event.findUnique({ where: { id } });
  }

  async updateEvent(id: number, data: UpdateEventDto) {
    return this.prisma.event.update({
      where: { id },
      data,
    });
  }

  async deleteEvent(id: number) {
    return this.prisma.event.delete({ where: { id } });
  }

  async getFullEventDetails(eventId: number) {
    return this.prisma.event.findUnique({
      where: { id: eventId },
      include: {
        asistentes: {
          include: {
            alergenos: true,
          },
        },
        Menu: {
          include: {
            platos: {
              include: {
                ingredientes: true,
              },
            },
          },
        },
      },
    });
  }

  // Método para generar el menú del evento
  async generateMenuForEvent(eventId: number) {
    const event = await this.getFullEventDetails(eventId);
    if (!event) {
      throw new Error('Evento no encontrado');
    }

    if (!event.asistentes || event.asistentes.length === 0) {
      throw new Error(
        'No se puede generar un menú para un evento sin asistentes.',
      );
    }

    // Obtener los países de los asistentes y calcular la cantidad de asistentes por país
    const asistentesPorPais = event.asistentes.reduce(
      (acc, asistente) => {
        if (!acc[asistente.country]) {
          acc[asistente.country] = 0;
        }
        acc[asistente.country]++;
        return acc;
      },
      {} as Record<string, number>,
    );

    const totalAsistentes = event.asistentes.length;

    // Calcular el porcentaje de asistentes por país
    const porcentajesPorPais = Object.entries(asistentesPorPais).map(
      ([pais, cantidad]) => ({
        pais,
        cantidad,
        porcentaje: (cantidad / totalAsistentes) * 100,
      }),
    );

    // Obtener los platos de los países de los asistentes que ya están en la tabla de platos
    const availablePlatos = await this.prisma.plato.findMany({
      where: {
        origen: {
          in: Object.keys(asistentesPorPais),
        },
      },
      include: {
        ingredientes: true,
      },
    });

    // Obtener los alérgenos de los asistentes
    const alergenos = event.asistentes.flatMap((asistente) =>
      asistente.alergenos.map((a) => a.alergeno),
    );

    // Filtrar los platos según los alérgenos
    const filteredPlatos = availablePlatos.filter((plato) => {
      return !plato.ingredientes.some((ingrediente) =>
        alergenos.includes(ingrediente.ingrediente as any),
      );
    });

    // Calcular las rondas posibles de bocadillos
    const durationHours = event.durationHours;
    const rondasEsperadas = Math.ceil(durationHours / 2);
    let budgetRemaining = event.budget;

    const rondas: any[] = [];

    for (let rondaIndex = 0; rondaIndex < rondasEsperadas; rondaIndex++) {
      let rondaActual: { plato: any; cantidad: number }[] = [];

      // Determinar la cantidad de cada bocadillo según el porcentaje de asistentes por país
      for (const porcentaje of porcentajesPorPais) {
        const platosDelPais = filteredPlatos.filter(
          (plato) => plato.origen === porcentaje.pais,
        );

        platosDelPais.forEach((plato) => {
          const cantidadPorPlato = Math.ceil(
            (porcentaje.cantidad / totalAsistentes) * totalAsistentes,
          );

          const costoPorPlato = plato.precio * cantidadPorPlato;
          if (budgetRemaining >= costoPorPlato) {
            rondaActual.push({ plato, cantidad: cantidadPorPlato });
            budgetRemaining -= costoPorPlato;
          }
        });
      }

      if (rondaActual.length > 0) {
        rondas.push(rondaActual);
      } else {
        break; // Si no se puede agregar más bocadillos, se termina el proceso
      }
    }

    // Crear el menú para el evento en la base de datos
    const newMenu = await this.prisma.menu.create({
      data: {
        name: `Menú del evento ${event.name}`,
        eventId: eventId,
        platos: {
          connect: rondas.flat().map((r) => ({
            id: r.plato.id,
          })),
        },
      },
    });

    // Estructurar la salida con información detallada de las rondas y los bocadillos
    const output = {
      id: newMenu.id, // Añadir el ID del menú recién creado
      numeroRondas: rondas.length,
      detallesRondas: rondas.map((ronda, index) => ({
        ronda: index + 1,
        bocadillos: ronda.map((item) => ({
          nombre: item.plato.name,
          cantidad: item.cantidad,
        })),
      })),
      budgetRemaining,
    };

    return output;
  }

  async confirmarMenu(eventId: number, menuId: number) {
    const menu = await this.prisma.menu.findUnique({
      where: { id: menuId },
      include: {
        platos: true,
      },
    });

    if (!menu) {
      throw new Error('Menú no encontrado');
    }

    const confirmedMenu = await this.prisma.menuConfirmado.create({
      data: {
        eventId,
        platos: {
          connect: menu.platos.map((plato) => ({ id: plato.id })),
        },
      },
    });

    return confirmedMenu;
  }
  async getReportePlatosMasRepetidos() {
    const menusConfirmados = await this.prisma.menuConfirmado.findMany({
      include: {
        platos: true,
      },
    });

    const platoCount: Record<number, number> = {};

    for (const menu of menusConfirmados) {
      for (const plato of menu.platos) {
        platoCount[plato.id] = (platoCount[plato.id] || 0) + 1;
      }
    }

    const platos = await this.prisma.plato.findMany();

    const reporte = platos
      .filter((plato) => platoCount[plato.id] > 0) // Filtrar platos que no tienen repeticiones
      .map((plato) => ({
        nombre: plato.name,
        repeticiones: platoCount[plato.id] || 0,
      }));

    reporte.sort((a, b) => b.repeticiones - a.repeticiones);

    return reporte;
  }

  async getReporteAlergenosMasRepetidos() {
    const asistentes = await this.prisma.asistentes.findMany({
      include: {
        alergenos: true,
      },
    });

    const alergenoCount: Record<string, number> = {};

    for (const asistente of asistentes) {
      for (const alergenoAsistente of asistente.alergenos) {
        const alergeno = alergenoAsistente.alergeno;

        alergenoCount[alergeno] = (alergenoCount[alergeno] || 0) + 1;
      }
    }

    const reporte = Object.entries(alergenoCount)
      .map(([nombre, repeticiones]) => ({
        nombre,
        repeticiones,
      }))
      .filter((item) => item.repeticiones > 0);

    reporte.sort((a, b) => b.repeticiones - a.repeticiones);

    return reporte;
  }
}
