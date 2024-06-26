using Application.Medicos.Validation;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Application.Medicos.Command;

public class CreateMedicoCommand : IRequest<IActionResult>
{
    public string UserName { get; set; }
    public string PassWord { get; set; }
    public string Email { get; set; }
    public string Especialidad { get; set; }
}

public class CreateMedicoHandler(MedicoRepository Medico) : IRequestHandler<CreateMedicoCommand, IActionResult> 
{
    public async Task<IActionResult> Handle(CreateMedicoCommand request, CancellationToken cancellationToken)
    {
        var medico = MapperControl.mapper.Map<Medico>(request);

        var response = await Medico.Create(medico);

        return new JsonResult(response);
    }


}


