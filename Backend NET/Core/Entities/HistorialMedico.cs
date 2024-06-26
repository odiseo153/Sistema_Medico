
using Core.Entities.Base;

namespace Core.Entities
{
    public class HistorialMedico :BaseEntity
    {
        public Paciente Paciente { get; set; }
        public string Diagnosticos { get; set; }
        public string Tratamientos { get; set; }
        public string Recetas { get; set; }
        public string Resultados { get; set; }

    }
}
