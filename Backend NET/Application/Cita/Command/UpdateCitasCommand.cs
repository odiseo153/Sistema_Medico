using Microsoft.AspNetCore.Mvc;

namespace Application.Commands.Cita;

public class UpdateCitasCommand : IRequest<IActionResult>
{
    public Guid Id { get; set; }
    public DateTime? FechaHora { get; set; }
    public Guid? MedicoId { get; set; }
    public bool Completada { get; set; }
}

public class UpdateCitasHandler(CitasRepository repository) : IRequestHandler<UpdateCitasCommand,IActionResult>
{

    public async Task<IActionResult> Handle(UpdateCitasCommand request, CancellationToken cancellationToken)
    {
        var nuevaCita = MapperControl.mapper.Map<Citas>(request);
        var response =await repository.Update(nuevaCita);
        
        return new JsonResult(response);
    }
}