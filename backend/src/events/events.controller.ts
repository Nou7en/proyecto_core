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
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { EventService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto'; // Crear un DTO para las actualizaciones

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async createEvent(@Body() createEventDto: CreateEventDto) {
    try {
      console.log('Datos recibidos para crear el evento:', createEventDto);
      return await this.eventService.createEvent(createEventDto);
    } catch (error) {
      console.error('Error al crear el evento:', error);
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

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async updateEvent(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    try {
      const updatedEvent = await this.eventService.updateEvent(
        id,
        updateEventDto,
      );
      if (!updatedEvent) {
        throw new NotFoundException('Evento no encontrado');
      }
      return updatedEvent;
    } catch (error) {
      console.error('Error al actualizar el evento:', error);
      throw new BadRequestException('Error al actualizar el evento');
    }
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
