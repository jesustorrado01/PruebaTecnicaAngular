using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace PresuspuestoBack.Models;

[Table("Usuario")]
public partial class Usuario
{
    [Key]
    public int IdUsuario { get; set; }

    [Column("Usuario")]
    [StringLength(15)]
    public string? Usuario1 { get; set; }

    [StringLength(255)]
    public string? ClaveHash { get; set; }

    public int IdPersona { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? FechaRegistro { get; set; }

    public bool? Activo { get; set; }

    [ForeignKey("IdPersona")]
    [InverseProperty("Usuarios")]
    public virtual Persona IdPersonaNavigation { get; set; } = null!;
}
