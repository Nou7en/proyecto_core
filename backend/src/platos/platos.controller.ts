import { Controller, Post, Body, Get } from '@nestjs/common';
import { PlatosService } from './platos.service';
import { CreatePlatoDto } from './dto/create-plato.dto';

@Controller('platos')
export class PlatosController {
  constructor(private readonly platosService: PlatosService) {}

  @Post()
  async createPlato(@Body() createPlatoDto: CreatePlatoDto) {
    return this.platosService.createPlato(createPlatoDto);
  }

  @Get()
  async getAllPlatos() {
    return this.platosService.getAllPlatos();
  }
}
