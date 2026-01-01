using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace PresuspuestoBack.Models;

[Table("GastoDetalle")]
public partial class GastoDetalle
{
    [Key]
    public int IdGastoDetalle { get; set; }

    public int IdGastoEncabezado { get; set; }

    public int IdTipoGasto { get; set; }

    public int? Monto { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? FechaRegistro { get; set; }

    public bool? Activo { get; set; }

    [ForeignKey("IdGastoEncabezado")]
    [InverseProperty("GastoDetalles")]
    public virtual GastoEncabezado IdGastoEncabezadoNavigation { get; set; } = null!;

    [ForeignKey("IdTipoGasto")]
    [InverseProperty("GastoDetalles")]
    public virtual TipoGasto IdTipoGastoNavigation { get; set; } = null!;
}
