import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) {}

  async createEvent(data: CreateEventDto) {
    return this.prisma.event.create({ data });
  }

  async getAllEvents() {
    return this.prisma.event.findMany();
  }

  async getEventById(id: number) {
    return this.prisma.event.findUnique({ where: { id } });
  }

  async deleteEvent(id: number) {
    return this.prisma.event.delete({ where: { id } });
  }
}
