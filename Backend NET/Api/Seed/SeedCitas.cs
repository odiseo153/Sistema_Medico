using Application;
using Application.Commands.Cita;
using Core.Entities;
using Infraestructure.Context;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic; // Para List<T>
using System.IO; // Para Path y File
using System.Text.Json;

namespace Api.Seed
{
    public static class SeedCitas
    {
        public static void Seed_Citas(this SistemaMedicoContext context)
        {
            string path = Path.Combine("Seed", "Data", "Citas.json");

            if (!string.IsNullOrEmpty(path))
            {
                var citasData = File.ReadAllText(path);
                var citas = JsonSerializer.Deserialize<List<Citas>>(citasData);

                foreach (var cita in citas)
                {
                    var citaExiste = context.Citas.Find(cita.Id);

                    if (citaExiste == null)
                    {
                        context.Citas.Add(cita);
                    }
                }

                context.SaveChanges();
            }
        }
    }
}
