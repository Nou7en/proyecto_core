import { Controller, Post, Body } from '@nestjs/common';
import { AsistentesService } from './asistentes.service';
import { CreateAsistenteDto } from './dto/create-asistente.dto';

@Controller('asistentes')
export class AsistentesController {
  constructor(private readonly asistentesService: AsistentesService) {}

  @Post()
  async createAsistente(@Body() createAsistenteDto: CreateAsistenteDto) {
    return this.asistentesService.createAsistente(createAsistenteDto);
  }
}
