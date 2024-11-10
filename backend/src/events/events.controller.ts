import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  BadRequestException,
  NotFoundException,
  UsePipes,
  ValidationPipe,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { EventService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async createEvent(@Body() createEventDto: CreateEventDto) {
    try {
      return await this.eventService.createEvent(createEventDto);
    } catch (error) {
      throw new BadRequestException('Error al crear el evento');
    }
  }

  @Get()
  async getAllEvents() {
    return this.eventService.getAllEvents();
  }

  @Get(':id')
  async getEventById(@Param('id', ParseIntPipe) id: number) {
    const event = await this.eventService.getEventById(id);
    if (!event) {
      throw new NotFoundException('Evento no encontrado');
    }
    return event;
  }

  @Delete(':id')
  async deleteEvent(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.eventService.deleteEvent(id);
      return { message: 'Evento eliminado con éxito' };
    } catch (error) {
      throw new NotFoundException(
        'Error al eliminar el evento. Asegúrate de que el ID sea correcto.',
      );
    }
  }
}
