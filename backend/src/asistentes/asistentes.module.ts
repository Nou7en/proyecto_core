import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AsistentesService } from './asistentes.service';
import { AsistentesController } from './asistentes.controller';

@Module({
  controllers: [AsistentesController],
  providers: [AsistentesService, PrismaService],
})
export class AsistentesModule {}
