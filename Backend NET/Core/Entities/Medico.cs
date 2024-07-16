
using Core.Entities.Base;
using Microsoft.EntityFrameworkCore;

namespace Core.Entities
{
    public class Medico : BaseUser
    {
        public string Especialidad { get; set; }
        public List<Citas> CitasProgramadas {  get; set; }

        public static implicit operator DbSet<object>(Medico? v)
        {
            throw new NotImplementedException();
        }
    }
}
