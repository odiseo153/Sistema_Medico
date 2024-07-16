using Application;
using Application.Pacientes.Command;
using Core.Entities;
using Infraestructure.Context;
using Microsoft.IdentityModel.Tokens;
using System.Text.Json;


namespace Api.Seed
{
    public static class SeedPacientes
    {
        public static void Seed_Pacientes(this SistemaMedicoContext context)
        {

            string path = Path.Combine("Seed", "Data", "Pacientes.json");

            if (!path.IsNullOrEmpty())
            {
                var pacienteData = File.ReadAllText(path);
                var pacientes = JsonSerializer.Deserialize<List<Paciente>>(pacienteData);
                //var pacientes = MapperControl.mapper.Map<List<Paciente>>(pacientesMap);

                foreach (var paciente in pacientes)
                {
                    var pacienteExiste = context.Pacientes.Find(paciente.Id);

                    if (pacienteExiste == null && paciente != null)
                    {
                      context.Pacientes.Add(paciente);
                        context.SaveChanges();
                    }

                }

                
            }
        }
    }
}
