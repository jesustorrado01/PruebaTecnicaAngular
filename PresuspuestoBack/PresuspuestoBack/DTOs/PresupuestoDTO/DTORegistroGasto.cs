namespace PresuspuestoBack.DTOs.PresupuestoDTO
{
    public class DTORegistroGasto
    {
        public DateTime Fecha { get; set; }
        public int IdFondoMonetario { get; set; }
        public string? nombreFondoMonetario { get; set; }
        public string? Observaciones { get; set; }
        public string? NombreComercio { get; set; }
        public string? TipoDocumento { get; set; }

        public List<DTOGastoDetalle> Detalles { get; set; } = new List<DTOGastoDetalle>();
    }

    public class DTOGastoDetalle
    {
        public int IdTipoGasto { get; set; }
        public string? NombreTipoGasto { get; set; }
        public decimal Monto { get; set; }
    }
}
