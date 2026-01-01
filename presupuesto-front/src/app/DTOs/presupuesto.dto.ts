export interface PresupuestoDTO {
  idPresupuesto: number;
  idTipoGasto: number;
  mes?: Date;
  nombreTipoGasto?: string;
  montoPresupuestado: number;
  fechaRegistro?: Date;
  activo?: boolean;
}
