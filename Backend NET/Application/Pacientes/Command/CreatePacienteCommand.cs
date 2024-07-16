
using Microsoft.AspNetCore.Mvc;

namespace Application.Pacientes.Command;

public class CreatePacienteCommand : IRequest<IActionResult>
{

    public string UserName { get; set; }
    public string Password { get; set; }
    public string Email { get; set; }
}

public class CreatePacienteHandler(PacienteRepository context) : IRequestHandler<CreatePacienteCommand, IActionResult>
{


    public async Task<IActionResult> Handle(CreatePacienteCommand request, CancellationToken cancellationToken)
    {
        

        var Paciente = MapperControl.mapper.Map<Paciente>(request);

        var response = await context.Create(Paciente);

        return response;
    }
}