using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace PresuspuestoBack.Models;

public partial class AppDbContext : DbContext
{
    public AppDbContext()
    {
    }

    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Deposito> Depositos { get; set; }

    public virtual DbSet<FondoMonetario> FondoMonetarios { get; set; }

    public virtual DbSet<GastoDetalle> GastoDetalles { get; set; }

    public virtual DbSet<GastoEncabezado> GastoEncabezados { get; set; }

    public virtual DbSet<Persona> Personas { get; set; }

    public virtual DbSet<Presupuesto> Presupuestos { get; set; }

    public virtual DbSet<TipoGasto> TipoGastos { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Deposito>(entity =>
        {
            entity.HasKey(e => e.IdDeposito).HasName("PK__Deposito__011A5BF26BB47BBF");

            entity.Property(e => e.Activo).HasDefaultValue(true);
            entity.Property(e => e.FechaRegistro).HasDefaultValueSql("(getdate())");
        });

        modelBuilder.Entity<FondoMonetario>(entity =>
        {
            entity.HasKey(e => e.IdFondoMonetario).HasName("PK__FondoMon__5A6C75A36099D42B");

            entity.Property(e => e.Activo).HasDefaultValue(true);
            entity.Property(e => e.FechaRegistro).HasDefaultValueSql("(getdate())");
        });

        modelBuilder.Entity<GastoDetalle>(entity =>
        {
            entity.HasKey(e => e.IdGastoDetalle).HasName("PK__GastoDet__8D104DDDF7767847");

            entity.Property(e => e.Activo).HasDefaultValue(true);
            entity.Property(e => e.FechaRegistro).HasDefaultValueSql("(getdate())");

            entity.HasOne(d => d.IdGastoEncabezadoNavigation).WithMany(p => p.GastoDetalles)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_GastoDetalle_GastoEncabezado");

            entity.HasOne(d => d.IdTipoGastoNavigation).WithMany(p => p.GastoDetalles)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_GastoDetalle_TipoGasto");
        });

        modelBuilder.Entity<GastoEncabezado>(entity =>
        {
            entity.HasKey(e => e.IdGastoEncabezado).HasName("PK__GastoEnc__5C1D3EBAA37AB7C8");

            entity.Property(e => e.Activo).HasDefaultValue(true);
            entity.Property(e => e.FechaRegistro).HasDefaultValueSql("(getdate())");

            entity.HasOne(d => d.IdFondoMonetarioNavigation).WithMany(p => p.GastoEncabezados)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_GastoEncabezado_FondoMonetario");
        });

        modelBuilder.Entity<Persona>(entity =>
        {
            entity.HasKey(e => e.IdPersona).HasName("PK__Persona__2EC8D2AC90F06728");

            entity.Property(e => e.Activo).HasDefaultValue(true);
            entity.Property(e => e.FechaRegistro).HasDefaultValueSql("(getdate())");
        });

        modelBuilder.Entity<Presupuesto>(entity =>
        {
            entity.HasKey(e => e.IdPresupuesto).HasName("PK__Presupue__D70FD19043D9B0B7");

            entity.Property(e => e.Activo).HasDefaultValue(true);
            entity.Property(e => e.FechaRegistro).HasDefaultValueSql("(getdate())");

            entity.HasOne(d => d.IdTipoGastoNavigation).WithMany(p => p.Presupuestos)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Presupuesto_TipoGasto");
        });

        modelBuilder.Entity<TipoGasto>(entity =>
        {
            entity.HasKey(e => e.IdTipoGasto).HasName("PK__TipoGast__656E88E4E26D9215");

            entity.Property(e => e.Activo).HasDefaultValue(true);
            entity.Property(e => e.FechaRegistro).HasDefaultValueSql("(getdate())");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.IdUsuario).HasName("PK__Usuario__5B65BF975BAC2445");

            entity.Property(e => e.Activo).HasDefaultValue(true);
            entity.Property(e => e.FechaRegistro).HasDefaultValueSql("(getdate())");

            entity.HasOne(d => d.IdPersonaNavigation).WithMany(p => p.Usuarios)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Usuario_Persona");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
