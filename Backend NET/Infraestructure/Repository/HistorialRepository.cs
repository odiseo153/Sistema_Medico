using Core.Entities;
using Infraestructure.Context;
using Microsoft.CodeAnalysis;

namespace Infraestructure.Repository
{
    public class HistorialRepository(SistemaMedicoContext context)
    {             

        public IActionResult Get()
        {
            var historial = context.HistorialMedico.Select(x => new
            {
                x.Id,
                Paciente = x.Paciente.userName,
                Diagnostico = x.Diagnosticos,
                Tratamiento = x.Tratamientos,
                Receta = x.Recetas,
                Resultado = x.Resultados
            });



            return new JsonResult(historial);
        }

        public async Task<IActionResult> Create(HistorialMedico historialMedico)
        {
            try
            {
                context.HistorialMedico.Add(historialMedico);
                await context.SaveChangesAsync();
                return new JsonResult(new { Message = "Historial médico creado correctamente" });
            }
            catch (Exception ex)
            {
                return new JsonResult(new { Error = $"Error al crear historial médico: {ex.Message}" });
            }
        }

        public async Task<IActionResult> Update(int id, HistorialMedico historialMedico)
        {
            var historialToUpdate = await context.HistorialMedico.FindAsync(id);

            if (historialToUpdate == null)
            {
                return new JsonResult(new { Error = $"No se encontró el historial médico con ID {id}" });
            }

            historialToUpdate.Paciente.Id = historialMedico.Paciente.Id;

            try
            {
                context.HistorialMedico.Update(historialToUpdate);
                await context.SaveChangesAsync();
                return new JsonResult(new { Message = $"Historial médico con ID {id} actualizado correctamente" });
            }
            catch (Exception ex)
            {
                return new JsonResult(new { Error = $"Error al actualizar el historial médico con ID {id}: {ex.Message}" });
            }
        }
    }
}

