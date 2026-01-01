using Microsoft.EntityFrameworkCore;
using PresuspuestoBack.DTOs.TipoGastoDTO;
using PresuspuestoBack.Models;

namespace PresuspuestoBack.Servicios.TipoGastoService
{
    public class TipoGastoService : ITipoGastoServicio
    {
        private readonly AppDbContext _context;

        public TipoGastoService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<TipoGasto>> ObtenerTiposDeGastoAsync()
        {
            return await _context.TipoGastos
                .Where(t => t.Activo == true)
                .ToListAsync();
        }

        public async Task<TipoGasto> ObtenerTipoDeGastoPorIdAsync(int id)
        {
            return await _context.TipoGastos
                .FirstOrDefaultAsync(t => t.IdTipoGasto == id && t.Activo == true);
        }

        public async Task<TipoGasto> CrearActualizarTipoDeGastoAsync(DTOTipoGasto parametros)
        {
            if (parametros == null)
                throw new ArgumentNullException(nameof(parametros));

            // ACTUALIZAR
            if (parametros.IdTipoGasto != 0)
            {
                var tipoGastoExistente = await _context.TipoGastos
                    .FirstOrDefaultAsync(t => t.IdTipoGasto == parametros.IdTipoGasto);

                if (tipoGastoExistente == null)
                    throw new Exception("No se encontró el Tipo de Gasto");

                tipoGastoExistente.Nombre = parametros.Nombre;
                tipoGastoExistente.Descripcion = parametros.Descripcion;

                await _context.SaveChangesAsync();
                return tipoGastoExistente;
            }

            // CREAR
            var ultimoRegistro = await _context.TipoGastos
                .OrderByDescending(t => t.IdTipoGasto)
                .Select(t => t.Codigo)
                .FirstOrDefaultAsync();

            int nuevoNumero = 1;

            if (!string.IsNullOrEmpty(ultimoRegistro))
            {
                var soloNumero = ultimoRegistro.Replace("TG-", "");
                int.TryParse(soloNumero, out nuevoNumero);
                nuevoNumero++;
            }

            string nuevoCodigo = $"TG-{nuevoNumero.ToString("D3")}";

            var nuevoTipoGasto = new TipoGasto
            {
                Codigo = nuevoCodigo,
                Nombre = parametros.Nombre,
                Descripcion = parametros.Descripcion,
                Activo = true,
                FechaRegistro = DateTime.Now
            };

            _context.TipoGastos.Add(nuevoTipoGasto);
            await _context.SaveChangesAsync();

            return nuevoTipoGasto;
        }

        public async Task<bool> EliminarTipoDeGastoAsync(int id)
        {
            if (id != 0)
            {
                var tipoGastoExistente = await _context.TipoGastos
                    .FirstOrDefaultAsync(t => t.IdTipoGasto == id);

                if (tipoGastoExistente == null)
                    throw new Exception("No se encontró el Tipo de Gasto");

                tipoGastoExistente.Activo = false;
                await _context.SaveChangesAsync();

                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
