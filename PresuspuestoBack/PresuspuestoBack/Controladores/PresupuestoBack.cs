using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PresuspuestoBack.Models;
using PresuspuestoBack.Servicios;
using PresuspuestoBack.DTOs;

namespace PresuspuestoBack.Controladores
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IJwTServicio _jwtServicio;

        public AuthController(AppDbContext context, IJwTServicio jwtServicio)
        {
            _context = context;
            _jwtServicio = jwtServicio;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequisitoDTO loginDto)
        {
            var usuario = await _context.Usuarios
                .Include(u => u.IdPersonaNavigation)
                .FirstOrDefaultAsync(u =>
                    u.Usuario1 == loginDto.Usuario &&
                    u.ClaveHash == loginDto.Contrasena &&
                    u.Activo == true
                );

            if (usuario == null)
                return Unauthorized(new { message = "Credenciales inválidas" });

            var token = _jwtServicio.GenerarToken(usuario);

            return Ok(new
            {
                token,
                usuario = usuario.Usuario1,
                nombreCompleto = $"{usuario.IdPersonaNavigation.PrimerNombre} {usuario.IdPersonaNavigation.PrimerApellido}"
            });
        }
    }
}
