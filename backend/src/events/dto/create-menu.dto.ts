// src/events/dto/create-menu.dto.ts
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateMenuDto {
  @IsInt()
  @IsNotEmpty()
  eventId: number;
}
