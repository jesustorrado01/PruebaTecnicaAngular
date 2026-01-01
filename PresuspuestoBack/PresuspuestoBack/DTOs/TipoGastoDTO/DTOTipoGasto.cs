namespace PresuspuestoBack.DTOs.TipoGastoDTO
{
    public class DTOTipoGasto
    {
        public int? IdTipoGasto { get; set; }
        public string? Codigo { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public DateTime? FechaRegistro { get; set; }
        public bool? Activo { get; set; }
    }
}
