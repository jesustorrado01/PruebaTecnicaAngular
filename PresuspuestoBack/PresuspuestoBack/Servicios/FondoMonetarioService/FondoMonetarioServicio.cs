using Microsoft.EntityFrameworkCore;
using PresuspuestoBack.DTOs.FondoMonetarioDTO;
using PresuspuestoBack.Models;

namespace PresuspuestoBack.Servicios.FondoMonetarioService
{
    public class FondoMonetarioServicio : IFondoMonetarioServicio
    {

        private readonly AppDbContext _context;

        public FondoMonetarioServicio(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<FondoMonetario>> ObtenerFondosMonetariosAsync()
        {
            return await _context.FondoMonetarios
                .Where(f => f.Activo == true)
                .ToListAsync();
        }

        public async Task<FondoMonetario> ObtenerFondoMonetarioPorIdAsync(int id)
        {
            return await _context.FondoMonetarios
                .FirstOrDefaultAsync(f => f.IdFondoMonetario == id && f.Activo == true);
        }

        public async Task<FondoMonetario> CrearActualizarFondoMonetarioAsync(DTOFondoMonetario parametros)
        {
            if (parametros == null)
            {
                throw new ArgumentNullException(nameof(parametros));
            }

            // Actualizar
            if (parametros.IdFondoMonetario != 0)
            {
                var FondoMonetarioExistente = _context.FondoMonetarios
                    .FirstOrDefault(f => f.IdFondoMonetario == parametros.IdFondoMonetario);

                if (FondoMonetarioExistente == null)
                {
                    throw new Exception("Fondo Monetario no encontrado.");
                }

                FondoMonetarioExistente.Nombre = parametros.Nombre;
                FondoMonetarioExistente.Tipo = parametros.Tipo;
                FondoMonetarioExistente.Descripcion = parametros.Descripcion;

                await _context.SaveChangesAsync();

                return FondoMonetarioExistente;
            }

            // Crear
            var nuevoFondoMonetario = new FondoMonetario
            {
                Nombre = parametros.Nombre,
                Tipo = parametros.Tipo,
                Descripcion = parametros.Descripcion,
                Activo = true,
                FechaRegistro = DateTime.Now
            };

            _context.FondoMonetarios.Add(nuevoFondoMonetario);
            await _context.SaveChangesAsync();

            return nuevoFondoMonetario;
        }

        public async Task<bool> EliminarFondoMonetarioAsync(int id)
        {
            if (id != 0)
            {
                var fondoMonetarioExistente = await _context.FondoMonetarios
                    .FirstOrDefaultAsync(f => f.IdFondoMonetario == id);

                if (fondoMonetarioExistente == null)
                    throw new Exception("Fondo Monetario no encontrado.");

                fondoMonetarioExistente.Activo = false;
                await _context.SaveChangesAsync();

                return true;
            } else
            {
                return false;
            }
        }

    }
}
