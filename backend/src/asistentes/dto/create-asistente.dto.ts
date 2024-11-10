import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsEmail,
  IsNumber,
  IsArray,
  IsEnum,
} from 'class-validator';
import { Alergenos } from '@prisma/client';

export class CreateAsistenteDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsNumber()
  @IsNotEmpty()
  eventId: number; // ID del evento al cual el asistente se conectará

  @IsArray()
  @IsEnum(Alergenos, { each: true })
  @IsOptional()
  alergenos?: Alergenos[];
}
