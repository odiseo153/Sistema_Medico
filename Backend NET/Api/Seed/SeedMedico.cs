using Application;
using Application.Medicos.Command;
using Core.Entities;
using Infraestructure.Context;
using Microsoft.AspNetCore.Identity;
using System.Text.Json;

namespace Api.Seed
{
    public static class SeedMedico
    {
        public static void Seed_Medico(this SistemaMedicoContext context)
        {
            string path = Path.Combine("Seed", "Data", "Medicos.json");

            if (!string.IsNullOrEmpty(path))
            {
                var medicoData = File.ReadAllText(path);
                var medicos = JsonSerializer.Deserialize<List<Medico>>(medicoData);

                foreach (var medico in medicos)
                {
                    // Verificar si el médico ya existe en la base de datos por su ID
                    var existingMedico = context.Medicos.FirstOrDefault(x => x.Id == medico.Id);

                    // Si el médico no existe, agregarlo a la base de datos
                    if (existingMedico == null && medico != null)
                    {
                        context.Medicos.Add(medico);
                    }
                   
                }

                context.SaveChanges();
            }
        }

    }
}
