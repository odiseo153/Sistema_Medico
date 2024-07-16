using Core.Entities.Base;
using Microsoft.AspNetCore.Identity;

namespace Core.Entities
{
    public class Paciente : BaseUser
    {

        public List<Citas> CitasProgramadas { get; set; }
        public List<HistorialMedico> Historial { get; set; }
        
    }
}








