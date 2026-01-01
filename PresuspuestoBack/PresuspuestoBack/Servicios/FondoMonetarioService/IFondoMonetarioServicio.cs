using PresuspuestoBack.DTOs.FondoMonetarioDTO;
using PresuspuestoBack.Models;

namespace PresuspuestoBack.Servicios.FondoMonetarioService
{
    public interface IFondoMonetarioServicio
    {
        Task<List<FondoMonetario>> ObtenerFondosMonetariosAsync();
        Task<FondoMonetario> ObtenerFondoMonetarioPorIdAsync(int id);
        Task<FondoMonetario> CrearActualizarFondoMonetarioAsync(DTOFondoMonetario parametros);
        Task<bool> EliminarFondoMonetarioAsync(int id);
    }
}
