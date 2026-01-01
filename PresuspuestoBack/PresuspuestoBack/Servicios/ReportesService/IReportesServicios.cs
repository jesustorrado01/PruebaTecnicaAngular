using PresuspuestoBack.DTOs.ReportesDTO;
using PresuspuestoBack.Models;

namespace PresuspuestoBack.Servicios.ReportesService
{
    public interface IReportesServicios
    {
        Task<List<DTOReporte>> ObtenerMovimientos(DateTime fechaInicio, DateTime fechaFin);
    }
}
