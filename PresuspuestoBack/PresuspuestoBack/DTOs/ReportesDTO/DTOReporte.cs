namespace PresuspuestoBack.DTOs.ReportesDTO
{
    public class DTOReporte
    {
        public int IdMovimiento { get; set; }
        public DateTime Fecha { get; set; }
        public string FondoMonetario { get; set; }
        public string TipoGasto { get; set; }
        public int Monto { get; set; }
        public string TipoMovimiento { get; set; }
        public string Observaciones { get; set; }
        public string NombreComercio { get; set; }
        public string TipoDocumento { get; set; }
    }
}
