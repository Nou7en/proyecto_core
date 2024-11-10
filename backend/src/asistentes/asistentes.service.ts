import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAsistenteDto } from './dto/create-asistente.dto';

@Injectable()
export class AsistentesService {
  constructor(private readonly prisma: PrismaService) {}

  async createAsistente(createAsistenteDto: CreateAsistenteDto) {
    try {
      return await this.prisma.asistentes.create({
        data: {
          name: createAsistenteDto.name,
          country: createAsistenteDto.country,
          email: createAsistenteDto.email,
          phone: createAsistenteDto.phone,
          event: {
            connect: {
              id: createAsistenteDto.eventId, // Conectar usando el ID del evento
            },
          },
          alergenos: {
            create: createAsistenteDto.alergenos?.map((alergeno) => ({
              alergeno,
            })),
          },
        },
      });
    } catch (error) {
      console.error('Error creating Asistente:', error);
      throw new BadRequestException('Error al crear el asistente');
    }
  }
}
