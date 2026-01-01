using PresuspuestoBack.DTOs.ReportesDTO;
using PresuspuestoBack.Models;
using Microsoft.EntityFrameworkCore;

namespace PresuspuestoBack.Servicios.ReportesService
{
    public class ReporteServicio : IReportesServicios
    {
        private readonly AppDbContext _context;
        public ReporteServicio(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<DTOReporte>> ObtenerMovimientos(DateTime fechaInicio, DateTime fechaFin)
        {
            // Movimientos de gastos
            var gastosQuery = from ge in _context.GastoEncabezados
                              join gd in _context.GastoDetalles on ge.IdGastoEncabezado equals gd.IdGastoEncabezado
                              join fm in _context.FondoMonetarios on ge.IdFondoMonetario equals fm.IdFondoMonetario
                              join tg in _context.TipoGastos on gd.IdTipoGasto equals tg.IdTipoGasto
                              where (ge.Activo ?? true) && (gd.Activo ?? true)
                                    && ge.Fecha >= fechaInicio && ge.Fecha <= fechaFin
                              select new DTOReporte
                              {
                                  IdMovimiento = ge.IdGastoEncabezado,
                                  Fecha = ge.Fecha.Value,           
                                  FondoMonetario = fm.Nombre,
                                  TipoGasto = tg.Nombre,
                                  Monto = gd.Monto ?? 0,            
                                  TipoMovimiento = "GASTO",
                                  Observaciones = ge.Observaciones,
                                  NombreComercio = ge.NombreComercio,
                                  TipoDocumento = ge.TipoDocumento
                              };

            // Movimientos de depósitos
            var depositosQuery = from d in _context.Depositos
                                 join fm in _context.FondoMonetarios on d.IdFondoMonetario equals fm.IdFondoMonetario
                                 where (d.Activo ?? true)
                                       && d.Fecha >= fechaInicio && d.Fecha <= fechaFin
                                 select new DTOReporte
                                 {
                                     IdMovimiento = d.IdDeposito,
                                     Fecha = d.Fecha.Value,           
                                     FondoMonetario = fm.Nombre,
                                     TipoGasto = null,
                                     Monto = d.Monto ?? 0,            
                                     TipoMovimiento = "DEPOSITO",
                                     Observaciones = null,
                                     NombreComercio = null,
                                     TipoDocumento = "DEPOSITO"
                                 };

            // Unimos ambos tipos de movimientos y ordenamos
            var movimientos = await gastosQuery
                .Union(depositosQuery)
                .OrderByDescending(m => m.Fecha)
                .ToListAsync();

            return movimientos;
        }
    }
}
