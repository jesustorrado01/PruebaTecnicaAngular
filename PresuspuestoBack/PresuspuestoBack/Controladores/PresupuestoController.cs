using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PresuspuestoBack.DTOs.TipoGastoDTO;
using PresuspuestoBack.Servicios.TipoGastoService;
using PresuspuestoBack.Servicios.FondoMonetarioService;
using PresuspuestoBack.DTOs.FondoMonetarioDTO;
using PresuspuestoBack.Servicios.PresupuestoService;
using PresuspuestoBack.DTOs.PresupuestoDTO;
using PresuspuestoBack.Servicios.ReportesService;

namespace PresuspuestoBack.Controladores
{
    [Authorize]
    [ApiController]
    [Route("api/presupuesto")]
    public class PresupuestoController : ControllerBase
    {
        // ================= SERVICIOS =================
        private readonly ITipoGastoServicio _tipoGastoServicio;
        private readonly IFondoMonetarioServicio _fondoMonetarioServicio;
        private readonly IPresupuestoServicio _presupuestoServicio;
        private readonly IReportesServicios _reportesServicio;

        // Constructor único para todos los servicios
        public PresupuestoController(
            ITipoGastoServicio tipoGastoServicio,
            IFondoMonetarioServicio fondoMonetarioServicio,
            IPresupuestoServicio presupuestoServicio,
            IReportesServicios reportesServicio
        )
        {
            _tipoGastoServicio = tipoGastoServicio;
            _fondoMonetarioServicio = fondoMonetarioServicio;
            _presupuestoServicio = presupuestoServicio;
            _reportesServicio = reportesServicio;
        }

        #region Tipo Gasto

        [HttpGet("tipogasto/obtenerTodos")]
        public async Task<IActionResult> ObtenerTiposDeGasto()
        {
            var tiposDeGasto = await _tipoGastoServicio.ObtenerTiposDeGastoAsync();
            return Ok(tiposDeGasto);
        }

        [HttpGet("tipogasto/obtener/{id}")]
        public async Task<IActionResult> ObtenerTipoDeGastoPorId(int id)
        {
            var tipoDeGasto = await _tipoGastoServicio.ObtenerTipoDeGastoPorIdAsync(id);
            if (tipoDeGasto == null)
                return NotFound(new { message = "Tipo de Gasto no encontrado" });
            return Ok(tipoDeGasto);
        }

        [HttpPost("tipogasto/crearActualizar")]
        public async Task<IActionResult> CrearActualizarTipoDeGasto([FromBody] DTOTipoGasto parametros)
        {
            try
            {
                var tipoDeGasto = await _tipoGastoServicio.CrearActualizarTipoDeGastoAsync(parametros);
                return Ok(tipoDeGasto);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("tipogasto/eliminar/{id}")]
        public async Task<IActionResult> EliminarTipoDeGasto(int id)
        {
            var resultado = await _tipoGastoServicio.EliminarTipoDeGastoAsync(id);
            if (!resultado)
                return NotFound(new { message = "Tipo de Gasto no encontrado o ya eliminado" });
            return Ok(new { message = "Tipo de Gasto eliminado exitosamente" });
        }

        #endregion

        #region Fondo Monetario

        [HttpGet("fondomonetario/obtenerTodos")]
        public async Task<IActionResult> ObtenerFondosMonetarios()
        {
            var fondosMonetarios = await _fondoMonetarioServicio.ObtenerFondosMonetariosAsync();
            return Ok(fondosMonetarios);
        }

        [HttpGet("fondomonetario/obtener/{id}")]
        public async Task<IActionResult> ObtenerFondoMonetarioPorId(int id)
        {
            var fondoMonetario = await _fondoMonetarioServicio.ObtenerFondoMonetarioPorIdAsync(id);
            if (fondoMonetario == null)
                return NotFound(new { message = "Fondo Monetario no encontrado" });
            return Ok(fondoMonetario);
        }

        [HttpPost("fondomonetario/crearActualizar")]
        public async Task<IActionResult> CrearActualizarFondoMonetario([FromBody] DTOFondoMonetario parametros)
        {
            try
            {
                var fondoMonetario = await _fondoMonetarioServicio.CrearActualizarFondoMonetarioAsync(parametros);
                return Ok(fondoMonetario);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("fondomonetario/eliminar/{id}")]
        public async Task<IActionResult> EliminarFondoMonetario(int id)
        {
            var resultado = await _fondoMonetarioServicio.EliminarFondoMonetarioAsync(id);
            if (!resultado)
                return NotFound(new { message = "Fondo Monetario no encontrado o ya eliminado" });
            return Ok(new { message = "Fondo Monetario eliminado exitosamente" });
        }

        #endregion

        #region Presupuesto y gastos
        [HttpGet("presupuesto/obtenerTodos")]
        public async Task<IActionResult> ObtenerPresupuestos()
        {
            var presupuestos = await _presupuestoServicio.ObtenerPresupuestoAsync();
            return Ok(presupuestos);
        }

        [HttpGet("gastos/obtenerTodos")]
        public async Task<IActionResult> ObtenerRegistroGastos()
        {
            var gastos = await _presupuestoServicio.ObtenerRegistrosGastosAsync();
            return Ok(gastos);
        }

        [HttpPost("presupuesto/crear")]
        public async Task<IActionResult> CrearPresupuesto([FromBody] DTOPresupuesto parametros)
        {
            try
            {
                var presupuesto = await _presupuestoServicio.CrearPresupuestoAsync(parametros);
                return Ok(presupuesto);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("gastos/crear")]
        public async Task<IActionResult> CrearRegistroGasto([FromBody] DTORegistroGasto parametros)
        {
            try
            {
                var gasto = await _presupuestoServicio.CrearRegistroGastoAsync(parametros);
                return Ok(gasto);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
        #endregion

        #region Reportes
        [HttpGet("reportes/movimientos")]
        public async Task<IActionResult> ObtenerMovimientos([FromQuery] DateTime fechaInicio, [FromQuery] DateTime fechaFin)
        {
            try
            {
                var movimientos = await _reportesServicio.ObtenerMovimientos(fechaInicio, fechaFin);
                return Ok(movimientos);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
        #endregion
    }
}
