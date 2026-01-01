export interface TipoGastoDTO {
  idTipoGasto?: number;
  codigo?: string;
  nombre: string;
  descripcion: string;
  fechaRegistro?: Date;
  activo?: boolean;
}

export interface ListarTipoGasto {
  idTipoGasto: number;
  nombre: string;
}
