using PresuspuestoBack.DTOs.PresupuestoDTO;
using PresuspuestoBack.Models;
using Microsoft.EntityFrameworkCore;

namespace PresuspuestoBack.Servicios.PresupuestoService
{
    public class PresupuestoServicio : IPresupuestoServicio
    {

        private readonly AppDbContext _context;
        public PresupuestoServicio(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<DTOPresupuesto>> ObtenerPresupuestoAsync()
        {
            return await _context.Presupuestos
                .Where(p => p.Activo == true)
                .Select(p => new DTOPresupuesto
                {
                    IdPresupuesto = p.IdPresupuesto,
                    Mes = p.Mes,
                    IdTipoGasto = p.IdTipoGasto,
                    MontoPresupuestado = p.MontoPresupuestado,
                    NombreTipoGasto = p.IdTipoGastoNavigation.Nombre,
                    FechaRegistro = p.FechaRegistro,
                    Activo = p.Activo,
                    
                })
                .ToListAsync();
        }

        public async Task<List<DTORegistroGasto>> ObtenerRegistrosGastosAsync()
        {
            return await _context.GastoEncabezados
                .Where(h => h.Activo == true)
                .Include(h => h.GastoDetalles)
                .ThenInclude(d => d.IdTipoGastoNavigation)
                .Include(h => h.IdFondoMonetarioNavigation)
                .Select(h => new DTORegistroGasto
                {
                    Fecha = h.Fecha ?? DateTime.MinValue,
                    IdFondoMonetario = h.IdFondoMonetario,
                    nombreFondoMonetario = h.IdFondoMonetarioNavigation.Nombre,
                    Observaciones = h.Observaciones,
                    NombreComercio = h.NombreComercio,
                    TipoDocumento = h.TipoDocumento,
                    Detalles = h.GastoDetalles.Select(d => new DTOGastoDetalle
                    {
                        IdTipoGasto = d.IdTipoGasto,
                        Monto = d.Monto ?? 0,
                        NombreTipoGasto = d.IdTipoGastoNavigation.Nombre
                    }).ToList()
                })
                .ToListAsync();
        }

        public async Task<Presupuesto> CrearPresupuestoAsync(DTOPresupuesto parametros)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                if (parametros == null)
                    throw new ArgumentNullException(nameof(parametros));

                var ahora = DateTime.Now;

                bool existe = await _context.Presupuestos.AnyAsync(p =>
                    p.Mes.HasValue &&
                    p.Mes.Value.Year == ahora.Year &&
                    p.Mes.Value.Month == ahora.Month &&
                    p.IdTipoGasto == parametros.IdTipoGasto &&
                    p.Activo == true
                );

                if (existe)
                {
                    throw new InvalidOperationException(
                        "Ya existe un presupuesto para este tipo de gasto en el mes actual.");
                }

                var nuevoPresupuesto = new Presupuesto
                {
                    Mes = ahora,
                    IdTipoGasto = parametros.IdTipoGasto,
                    MontoPresupuestado = parametros.MontoPresupuestado,
                    FechaRegistro = ahora,
                    Activo = true
                };

                _context.Presupuestos.Add(nuevoPresupuesto);
                await _context.SaveChangesAsync();

                await transaction.CommitAsync();

                return nuevoPresupuesto;
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }

        public async Task<string> CrearRegistroGastoAsync(DTORegistroGasto parametros)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                if (parametros == null)
                    throw new ArgumentNullException(nameof(parametros));

                if (parametros.Detalles == null || parametros.Detalles.Count == 0)
                    throw new InvalidOperationException("Debe ingresar al menos un detalle de gasto.");

                var encabezado = new GastoEncabezado
                {
                    Fecha = parametros.Fecha,
                    IdFondoMonetario = parametros.IdFondoMonetario,
                    Observaciones = parametros.Observaciones,
                    NombreComercio = parametros.NombreComercio,
                    TipoDocumento = parametros.TipoDocumento,
                    Activo = true,
                    FechaRegistro = DateTime.Now
                };

                _context.GastoEncabezados.Add(encabezado);
                await _context.SaveChangesAsync();

                foreach (var detalleDto in parametros.Detalles)
                {
                    var detalle = new GastoDetalle
                    {
                        IdGastoEncabezado = encabezado.IdGastoEncabezado,
                        IdTipoGasto = detalleDto.IdTipoGasto,
                        Monto = (int)detalleDto.Monto,
                        Activo = true,
                        FechaRegistro = DateTime.Now
                    };

                    _context.GastoDetalles.Add(detalle);
                }

                await _context.SaveChangesAsync();

                string alerta = "";
                int mes = parametros.Fecha.Month;
                int año = parametros.Fecha.Year;

                var tiposGasto = parametros.Detalles.Select(d => d.IdTipoGasto).Distinct().ToList();

                foreach (var tipo in tiposGasto)
                {
                    var presupuesto = await _context.Presupuestos
                        .FirstOrDefaultAsync(p =>
                            p.IdTipoGasto == tipo &&
                            p.Mes.HasValue &&
                            p.Mes.Value.Month == mes &&
                            p.Mes.Value.Year == año &&
                            p.Activo == true
                        );

                    if (presupuesto != null)
                    {
                        var totalGastado = await _context.GastoDetalles
                            .Where(d =>
                                d.IdTipoGasto == tipo &&
                                d.IdGastoEncabezadoNavigation.Fecha.HasValue &&
                                d.IdGastoEncabezadoNavigation.Fecha.Value.Month == mes &&
                                d.IdGastoEncabezadoNavigation.Fecha.Value.Year == año &&
                                d.Activo == true
                            )
                            .SumAsync(d => d.Monto ?? 0);

                        if (totalGastado > presupuesto.MontoPresupuestado)
                        {
                            var exceso = totalGastado - (int)presupuesto.MontoPresupuestado;
                            alerta += $"⚠ Tipo de gasto '{tipo}' sobregirado. " +
                                       $"Presupuesto: {presupuesto.MontoPresupuestado} - " +
                                       $"Gastado: {totalGastado} - " +
                                       $"Exceso: {exceso}\n";
                        }
                    }
                }

                await transaction.CommitAsync();

                return string.IsNullOrEmpty(alerta) ? "✅ Gasto registrado correctamente" : alerta;
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }

    }
}