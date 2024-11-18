import { IsString, IsNotEmpty, IsNumber, IsDateString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDateString() // Cambiar de @IsDate() a @IsDateString()
  @IsNotEmpty()
  date: Date; // Acepta la fecha como cadena

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsNumber()
  @IsNotEmpty()
  budget: number;

  @IsString()
  description?: string; // Campo opcional
}
