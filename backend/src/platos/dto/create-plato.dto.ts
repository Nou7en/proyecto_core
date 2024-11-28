export class CreatePlatoDto {
  name: string;
  isVegan: boolean;
  isGlutenFree: boolean;
  origen: string; // Origen del plato (ejemplo: país)
  precio: number; // Precio del plato
  menuId: number; // ID del menú al que pertenece el plato
  ingredientes: string[]; // Lista de ingredientes en formato string
}
