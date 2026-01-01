using PresuspuestoBack.DTOs.TipoGastoDTO;
using PresuspuestoBack.Models;

namespace PresuspuestoBack.Servicios.TipoGastoService
{
    public interface ITipoGastoServicio
    {
        Task<List<TipoGasto>> ObtenerTiposDeGastoAsync();
        Task<TipoGasto> ObtenerTipoDeGastoPorIdAsync(int id);
        Task<TipoGasto> CrearActualizarTipoDeGastoAsync(DTOTipoGasto parametros);
        Task<bool> EliminarTipoDeGastoAsync(int id);
    }
}
