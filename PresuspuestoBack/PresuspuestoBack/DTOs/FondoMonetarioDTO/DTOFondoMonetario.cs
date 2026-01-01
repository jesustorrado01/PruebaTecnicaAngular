namespace PresuspuestoBack.DTOs.FondoMonetarioDTO
{
    public class DTOFondoMonetario
    {
        public int? IdFondoMonetario { get; set; }
        public string Nombre { get; set; }
        public string Tipo { get; set; }
        public  string Descripcion { get; set; }
        public DateTime? FechaRegistro { get; set; }
        public bool? Activo { get; set; }
    }
}
