import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import { AsistentesModule } from './asistentes/asistentes.module';

@Module({
  imports: [AuthModule, EventsModule, AsistentesModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
