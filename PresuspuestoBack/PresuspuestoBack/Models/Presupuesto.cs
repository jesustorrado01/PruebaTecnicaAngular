using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace PresuspuestoBack.Models;

[Table("Presupuesto")]
public partial class Presupuesto
{
    [Key]
    public int IdPresupuesto { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? Mes { get; set; }

    public int IdTipoGasto { get; set; }

    public int? MontoPresupuestado { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? FechaRegistro { get; set; }

    public bool? Activo { get; set; }

    [ForeignKey("IdTipoGasto")]
    [InverseProperty("Presupuestos")]
    public virtual TipoGasto IdTipoGastoNavigation { get; set; } = null!;
}
