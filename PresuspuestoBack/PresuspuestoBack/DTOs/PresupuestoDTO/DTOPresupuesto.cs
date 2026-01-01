using PresuspuestoBack.Models;

namespace PresuspuestoBack.DTOs.PresupuestoDTO
{
    public class DTOPresupuesto
    {
        public int IdPresupuesto { get; set; }
        public int IdTipoGasto { get; set; }
        public string? NombreTipoGasto { get; set; }
        public DateTime? Mes { get; set; }
        public int? MontoPresupuestado { get; set; }
        public DateTime? FechaRegistro { get; set; }
        public bool? Activo { get; set; }
    }
}
