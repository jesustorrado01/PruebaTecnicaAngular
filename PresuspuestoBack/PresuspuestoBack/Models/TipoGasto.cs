using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace PresuspuestoBack.Models;

[Table("TipoGasto")]
public partial class TipoGasto
{
    [Key]
    public int IdTipoGasto { get; set; }

    [StringLength(8)]
    public string? Codigo { get; set; }

    [StringLength(150)]
    public string? Nombre { get; set; }

    [StringLength(200)]
    public string? Descripcion { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? FechaRegistro { get; set; }

    public bool? Activo { get; set; }

    [InverseProperty("IdTipoGastoNavigation")]
    public virtual ICollection<GastoDetalle> GastoDetalles { get; set; } = new List<GastoDetalle>();

    [InverseProperty("IdTipoGastoNavigation")]
    public virtual ICollection<Presupuesto> Presupuestos { get; set; } = new List<Presupuesto>();
}
