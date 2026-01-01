using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace PresuspuestoBack.Models;

[Table("FondoMonetario")]
public partial class FondoMonetario
{
    [Key]
    public int IdFondoMonetario { get; set; }

    [StringLength(150)]
    public string? Nombre { get; set; }

    [StringLength(50)]
    public string? Tipo { get; set; }

    [StringLength(200)]
    public string? Descripcion { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? FechaRegistro { get; set; }

    public bool? Activo { get; set; }

    [InverseProperty("IdFondoMonetarioNavigation")]
    public virtual ICollection<GastoEncabezado> GastoEncabezados { get; set; } = new List<GastoEncabezado>();
}
