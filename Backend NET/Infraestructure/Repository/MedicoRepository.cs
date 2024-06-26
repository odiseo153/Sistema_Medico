using Infraestructure.Context;
using System.Data.Entity;
using System.Text.Json.Serialization;
using System.Text.Json;
using Core.Entities;
using Microsoft.AspNetCore.Http;
using Infraestructure.DapperConnection;
using Dapper;


namespace Infraestructure.Repository
{
    public class MedicoRepository(SistemaMedicoContext context)
    {
        

        public IActionResult Get()
        {
            /*
            var medicos = context.Medicos.Select(x => new
            {
                x.Id,
                x.userName,
                x.Email,
                x.Especialidad,
                CitasPendiente = x.CitasProgramadas.Select(c => new
                {
                    fechaHora = c.FechaHora,
                    Paciente = c.Paciente.userName,
                    c.Completada

                }),
            });
            */

            var medicos = context.Medicos.Select(x => new
            {
                x.Id,
                x.userName,
                x.Especialidad,
             
            });

            return new JsonResult(medicos);
        }

        public IActionResult Get(Guid id)
        {

            var medicoInfo = Connection.Open().Query($@"
    SELECT TOP 1
        Id,
        userName,
        Email,
        Especialidad
    FROM
        [SistemaMedico].[Identity].[Medico]
    WHERE
        Id = @id
", new { id }).FirstOrDefault();

            var citasPendientes = Connection.Open().Query($@"
    SELECT
        cp.Id ,
        cp.FechaHora AS fechaHora,
        p.userName AS PacienteName,
        cp.Completada,
        p.Id ,
        p.userName ,
        p.Email 
    FROM
        [SistemaMedico].[Identity].[Citas] cp
    LEFT JOIN
        [SistemaMedico].[Identity].[Paciente] p ON cp.PacienteId = p.Id
    WHERE
        cp.MedicoId = @id
",new {id}).ToList();

            var medico = medicoInfo != null ? new
            {
                medicoInfo.Id,
                medicoInfo.userName,
                medicoInfo.Email,
                medicoInfo.Especialidad,
                CitasPendiente = citasPendientes.Select(c => new
                {
                    c.Id,
                    fechaHora = c.fechaHora,
                    PacienteName = c.PacienteName,
                    c.Completada,
                    paciente = new
                    {
                        c.Id,
                        c.userName,
                        c.Email,
                    }
                })
            } : null;




            return new JsonResult(medico);
        }

        public async Task<Medico> Update(Medico entidad)
        {
            var entida = await context.Medicos.FindAsync(entidad.Id);

            foreach (var propiedad in entidad.GetType().GetProperties())
            {
                var valorEntidad = propiedad.GetValue(entidad);
                var valorFinal = valorEntidad ?? propiedad.GetValue(entida);

                propiedad.SetValue(entida, valorFinal);
            }

            await context.SaveChangesAsync();

            return entidad;
        }


        public async Task<IActionResult> Create(Medico medico)
        {
            var emailExist = context.Medicos.FirstOrDefault(x => x.Email.Equals(medico.Email));

            if (emailExist != null)
            {
                return new JsonResult(new
                {
                    message = "Ese email ya existe",
                    code = StatusCodes.Status406NotAcceptable
                });
            }

            await context.Medicos.AddAsync(medico);
            await context.SaveChangesAsync();

            return new JsonResult(medico);
        }


    }
}
