export interface FondoMonetarioDTO {
  idFondoMonetario?: number;
  nombre: string;
  tipo: string;
  descripcion: string;
  fechaRegistro?: Date;
  activo?: boolean;
}

export interface ListarFondoMonetario {
  idFondoMonetario: number;
  nombre: string;
}
