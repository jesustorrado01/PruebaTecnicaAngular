using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace PresuspuestoBack.Models;

[Table("Persona")]
public partial class Persona
{
    [Key]
    public int IdPersona { get; set; }

    [StringLength(20)]
    public string? PrimerNombre { get; set; }

    [StringLength(20)]
    public string? PrimerApellido { get; set; }

    [StringLength(30)]
    public string? Correo { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? FechaRegistro { get; set; }

    public bool? Activo { get; set; }

    [InverseProperty("IdPersonaNavigation")]
    public virtual ICollection<Usuario> Usuarios { get; set; } = new List<Usuario>();
}
