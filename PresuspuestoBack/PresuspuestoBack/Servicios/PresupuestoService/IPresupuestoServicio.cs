using PresuspuestoBack.DTOs.PresupuestoDTO;
using PresuspuestoBack.Models;

namespace PresuspuestoBack.Servicios.PresupuestoService
{
    public interface IPresupuestoServicio
    {
        Task<List<DTOPresupuesto>> ObtenerPresupuestoAsync();
        Task<List<DTORegistroGasto>> ObtenerRegistrosGastosAsync();
        Task<Presupuesto> CrearPresupuestoAsync(DTOPresupuesto parametros);
        Task<string> CrearRegistroGastoAsync(DTORegistroGasto parametros);
    }
}
