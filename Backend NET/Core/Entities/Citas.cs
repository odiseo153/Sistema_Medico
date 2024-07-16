using Core.Entities.Base;


namespace Core.Entities
{
    public class Citas : BaseEntity
    {
    public DateTime FechaHora { get; set; } 
    public Paciente Paciente { get; set; }
    public Medico Medico { get; set; }
    public Guid PacienteId { get; set; }
    public Guid MedicoId { get; set; }
    public bool Completada { get; set; } = false;
    public string Estado { get; set; }
    public string Comentarios { get; set; }
    }
}


