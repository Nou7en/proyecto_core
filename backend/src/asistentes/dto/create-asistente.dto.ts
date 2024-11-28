import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsEmail,
  IsNumber,
  IsArray,
  IsEnum,
  Length,
  IsPhoneNumber,
  IsPositive,
} from 'class-validator';
import { Alergenos } from '@prisma/client';

export class CreateAsistenteDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 50, { message: 'El nombre debe tener entre 2 y 50 caracteres.' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 50, { message: 'El país debe tener entre 2 y 50 caracteres.' })
  country: string;

  @IsEmail({}, { message: 'El correo electrónico debe ser válido.' })
  @IsOptional()
  email?: string;

  @IsString()
  @IsPhoneNumber('EC', {
    message: 'El número de teléfono debe ser válido y tener 10 dígitos.',
  })
  @Length(10, 10, {
    message: 'El número de teléfono debe tener exactamente 10 dígitos.',
  })
  @IsOptional()
  phone?: string;

  @IsNumber()
  @IsPositive({ message: 'El ID del evento debe ser un número positivo.' })
  eventId: number; // ID del evento al cual el asistente se conectará

  @IsArray()
  @IsEnum(Alergenos, {
    each: true,
    message: 'Uno o más alérgenos no son válidos.',
  })
  @IsOptional()
  alergenos?: Alergenos[];
}
