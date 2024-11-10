import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [AuthModule, EventsModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
