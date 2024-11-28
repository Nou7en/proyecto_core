import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsDateString,
  Length,
  IsOptional,
  IsPositive,
} from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre del evento no puede estar vacío.' })
  @Length(3, 100, { message: 'El nombre debe tener entre 3 y 100 caracteres.' })
  name: string;

  @IsDateString(
    {},
    { message: 'La fecha debe tener el formato correcto (ISO 8601).' },
  )
  @IsNotEmpty({ message: 'La fecha del evento no puede estar vacía.' })
  date: Date; // Acepta la fecha como cadena

  @IsString()
  @IsNotEmpty({ message: 'La ubicación del evento no puede estar vacía.' })
  @Length(3, 100, {
    message: 'La ubicación debe tener entre 3 y 100 caracteres.',
  })
  location: string;

  @IsNumber()
  @IsPositive({ message: 'El presupuesto debe ser un número positivo.' })
  @IsNotEmpty({ message: 'El presupuesto del evento no puede estar vacío.' })
  budget: number;

  @IsNumber()
  @IsPositive({ message: 'La duración debe ser un número positivo en horas.' })
  @IsNotEmpty({ message: 'La duración del evento no puede estar vacía.' })
  durationHours: number; // Nuevo campo para la duración del evento en horas

  @IsString()
  @IsOptional()
  @Length(0, 255, {
    message: 'La descripción no puede exceder los 255 caracteres.',
  })
  description?: string; // Campo opcional
}
