using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace PresuspuestoBack.Models;

[Table("GastoEncabezado")]
public partial class GastoEncabezado
{
    [Key]
    public int IdGastoEncabezado { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? Fecha { get; set; }

    public int IdFondoMonetario { get; set; }

    [StringLength(200)]
    public string? Observaciones { get; set; }

    [StringLength(100)]
    public string? NombreComercio { get; set; }

    [StringLength(100)]
    public string? TipoDocumento { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? FechaRegistro { get; set; }

    public bool? Activo { get; set; }

    [InverseProperty("IdGastoEncabezadoNavigation")]
    public virtual ICollection<GastoDetalle> GastoDetalles { get; set; } = new List<GastoDetalle>();

    [ForeignKey("IdFondoMonetario")]
    [InverseProperty("GastoEncabezados")]
    public virtual FondoMonetario IdFondoMonetarioNavigation { get; set; } = null!;
}
