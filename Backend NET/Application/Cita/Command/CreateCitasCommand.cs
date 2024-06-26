using Infraestructure.Context;
using Microsoft.AspNetCore.Mvc;


namespace Application.Commands.Cita;

public class CreateCitasCommand : IRequest<IActionResult>
{
    public Guid PacienteId { get; set; }
    public Guid MedicoId { get; set; }
    public string Estado { get; set; }
    public string Comentarios { get; set; }

    public DateTime Fecha { get; set; }
}

public class CreateCitasHandler(CitasRepository
    _context,SistemaMedicoContext context) : IRequestHandler<CreateCitasCommand, IActionResult>
{
    
    public async Task<IActionResult> Handle(CreateCitasCommand request, CancellationToken cancellationToken)
    {

        var cita = MapperControl.mapper.Map<Citas>(request);
        var response = await _context.Create(cita);

        return response;
    }
}