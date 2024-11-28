import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePlatoDto } from './dto/create-plato.dto';
import { Ingredientes } from '@prisma/client';

@Injectable()
export class PlatosService {
  constructor(private readonly prisma: PrismaService) {}

  async createPlato(createPlatoDto: CreatePlatoDto) {
    try {
      // Validación de los ingredientes antes de crear el plato
      const validIngredients = Object.values(Ingredientes);

      createPlatoDto.ingredientes.forEach((ingrediente) => {
        if (!validIngredients.includes(ingrediente as Ingredientes)) {
          throw new BadRequestException(
            `Ingrediente inválido: ${ingrediente}. Debe ser uno de: ${validIngredients.join(', ')}.`,
          );
        }
      });

      // Creación del plato después de la validación
      return await this.prisma.plato.create({
        data: {
          name: createPlatoDto.name,
          isVegan: createPlatoDto.isVegan,
          isGlutenFree: createPlatoDto.isGlutenFree,
          origen: createPlatoDto.origen,
          precio: createPlatoDto.precio,
          ingredientes: {
            create: createPlatoDto.ingredientes.map((ingrediente) => ({
              ingrediente: ingrediente as Ingredientes, // Convierte el string a enum
            })),
          },
        },
      });
    } catch (error) {
      console.error('Error creando el plato:', error);
      throw new BadRequestException('Error al crear el plato');
    }
  }

  async getAllPlatos() {
    return this.prisma.plato.findMany({
      include: {
        ingredientes: true,
      },
    });
  }
}
