

using Microsoft.AspNetCore.Mvc;

namespace Application.Medicos.Command
{
    public class UpdateMedicoCommand : CreateMedicoCommand,IRequest<IActionResult>
    {
        public Guid Id { get; set; }
    }

    public class UpdateMedicoHandler(MedicoRepository context) : IRequestHandler<UpdateMedicoCommand, IActionResult>
    {
        public async Task<IActionResult> Handle(UpdateMedicoCommand request, CancellationToken cancellationToken)
        {
            var medico = MapperControl.mapper.Map<Medico>(request);
            var response =await context.Update(medico);

            return new JsonResult(response);
        }
    }


}
