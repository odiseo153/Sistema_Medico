using Core.Entities;
using Core.Entities.Base;
using Dapper;
using Infraestructure.Context;
using Infraestructure.DapperConnection;
using Microsoft.AspNetCore.Http;


namespace Infraestructure.Repository
{
    public class PacienteRepository(SistemaMedicoContext context)
    {
        public IActionResult Get()
        {
            var pacientes = context.Pacientes.Select(x => new
            {
                x.userName,
                x.Email,
                x.Id,
                Citas = x.CitasProgramadas.Select(c => new {
                Fecha = c.FechaHora,
                Medico = c.Medico.userName,
                }),

            });


            return new JsonResult(pacientes);
        }

        public IActionResult Get(Guid id)
        {
            var pacientes = context.Pacientes.Select(x => new
            {
                x.userName,
                x.Email,
                x.Id,
                Citas = x.CitasProgramadas.Select(c => new
                {
                    c.Id,
                    Fecha = c.FechaHora,
                    Medico = c.Medico.userName,
                    
                }),

            }).FirstOrDefault(x => x.Id == id);

            var pacienteInfo = Connection.Open().Query($@"
    SELECT TOP 1
        Id,
        userName,
        Email
    FROM 
        [SistemaMedico].[Identity].[Paciente]
    WHERE
        Id = @id
", new { id }).FirstOrDefault();

            var citasPendientes = Connection.Open().Query($@"
    SELECT
        cp.Id ,
        cp.FechaHora AS Fecha,
        p.userName AS Medico

    FROM 
        [SistemaMedico].[Identity].[Citas] cp
    LEFT JOIN
        [SistemaMedico].[Identity].[Medico] p ON cp.MedicoId = p.Id
    WHERE
        cp.PacienteId = @id
", new { id }).ToList();

            var paciente = pacienteInfo != null ? new
            {
                pacienteInfo.Id,
                pacienteInfo.userName,
                pacienteInfo.Email,
                pacienteInfo.Especialidad,
                CitasPendiente = citasPendientes.Select(c => new
                {
                    c.Id,
                   c.Fecha,
                    c.Medico,
                    
                })
            } : null;


            return new JsonResult(paciente);
        }


        public async Task<IActionResult> Create(Paciente paciente)
        {
            var emailExist = context.Pacientes.FirstOrDefault(x => x.Email.Equals(paciente.Email));

            if (emailExist != null)
            {
                return new JsonResult(new
                {
                    message = "Ese email ya existe",
                    code = StatusCodes.Status406NotAcceptable
                });
            }

            await context.Pacientes.AddAsync(paciente);
            await context.SaveChangesAsync();

            return new JsonResult(paciente);
        }

    }
}
