export interface GastoDetalleDTO {
  idTipoGasto: number;
  nombreTipoGasto?: string;
  monto: number;
}

export interface RegistroGastoDTO {
  fecha: string;
  idFondoMonetario: number;
  nombreFondoMonetario?: string | null;
  observaciones?: string | null;
  nombreComercio?: string | null;
  tipoDocumento?: string | null;

  detalles: GastoDetalleDTO[];
  totalGasto?: number;
}
