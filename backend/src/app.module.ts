import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import { AsistentesModule } from './asistentes/asistentes.module';
import { PlatosModule } from './platos/platos.module'; // Añadir PlatosModule aquí

@Module({
  imports: [AuthModule, EventsModule, AsistentesModule, PlatosModule], // Añadir PlatosModule al imports array
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
