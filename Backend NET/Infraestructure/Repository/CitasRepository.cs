using Azure.Core;
using Core.Entities;
using Infraestructure.Context;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infraestructure.Repository
{
    public class CitasRepository(SistemaMedicoContext context)
    {

        public IActionResult Get()
        {
            var citas = context.Citas.Select(x => new
            {
                x.Id,
                Paciente = x.Paciente.userName,
                Medico = x.Medico.userName,
                Fecha = x.FechaHora,
                x.Completada
            });

            

            return new JsonResult(citas);
        }

        public async Task<IActionResult> Create(Citas cita)
        {
            var citaExistente = context.Citas.FirstOrDefault(x => x.PacienteId.Equals(cita.PacienteId) && x.MedicoId.Equals(cita.MedicoId));

            var fechaExistente = context.Citas.FirstOrDefault(x => x.PacienteId.Equals(cita.PacienteId) && x.FechaHora.Date.Equals(cita.FechaHora.Date));


            if (citaExistente != null)
            {
                return new JsonResult(new
                {
                    message = "Esa cita ya esta registrada",
                    code = StatusCodes.Status406NotAcceptable
                });
            }

            if (fechaExistente != null)
            {
                return new JsonResult(new
                {
                    message = "Ya tiene una cita para ese dia ",
                    code = StatusCodes.Status406NotAcceptable
                });
            }

           // await context.Citas.AddAsync(cita);
            //await context.SaveChangesAsync();

            return new JsonResult(cita);
        }


        public async Task<Citas> Update(Citas entidad)
        {

            var entida = await context.Citas.FindAsync(entidad.Id);

            foreach (var propiedad in entidad.GetType().GetProperties())
            {
                var valorEntidad = propiedad.GetValue(entidad);
                var valorFinal = valorEntidad ?? propiedad.GetValue(entida);

                propiedad.SetValue(entida, valorFinal);
            }

            await context.SaveChangesAsync();

            return entidad;
        }
    }
}
