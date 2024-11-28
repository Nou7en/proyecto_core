import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PlatosService } from './platos.service';
import { PlatosController } from './platos.controller';

@Module({
  controllers: [PlatosController],
  providers: [PlatosService, PrismaService],
})
export class PlatosModule {}
