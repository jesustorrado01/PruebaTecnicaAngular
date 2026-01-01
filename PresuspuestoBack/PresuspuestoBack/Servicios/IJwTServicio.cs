using PresuspuestoBack.Models;

namespace PresuspuestoBack.Servicios
{
    public interface IJwTServicio
    {
        string GenerarToken(Usuario usuario);
    }
}
