using Microsoft.AspNetCore.Mvc;

namespace Application.Pacientes.Command;

public class UpdatePacienteCommand : IRequest<IActionResult>
{
    public Guid Id { get; set; }
    public string UserName { get; set; }
    public string Email { get; set; }
}

public class UpdatePacienteHandler(Repository<Paciente> context) : IRequestHandler<UpdatePacienteCommand,IActionResult>
{
    public async Task<IActionResult> Handle(UpdatePacienteCommand request, CancellationToken cancellationToken)
    {
        var paciente = MapperControl.mapper.Map<Paciente>(request);
        var response =await context.Update(paciente);
        
        return new JsonResult(response);
    }
}