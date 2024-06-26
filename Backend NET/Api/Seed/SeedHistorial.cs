using Core.Entities;
using Infraestructure.Context;
using Microsoft.IdentityModel.Tokens;
using System.Text.Json;

namespace Api.Seed
{
    public static class SeedHistorial
    {
        public static void Seed_Historial(this SistemaMedicoContext context)
        {

            string path = Path.Combine("Seed", "Data", "Historial.json");

            if (!path.IsNullOrEmpty())
            {
                var historialData = File.ReadAllText(path);
                var historiales = JsonSerializer.Deserialize<List<HistorialMedico>>(historialData);

                foreach (var historial in historiales)
                {
                    var HistorialExiste = context.HistorialMedico.Find(historial.Id);

                    if(HistorialExiste == null)
                    {
                    context.HistorialMedico.Add(historial);
                    }
                }

                context.SaveChanges();
            }
        }
    }
}
