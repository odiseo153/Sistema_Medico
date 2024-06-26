using Microsoft.AspNetCore.Mvc;



namespace Application.Medicos.Query
{
    public class GetMedicoCommand : IRequest<IActionResult>
    {
    }

    public class GetMedicoHandler(MedicoRepository medico) : IRequestHandler<GetMedicoCommand, IActionResult>
    {
        public async Task<IActionResult> Handle(GetMedicoCommand request, CancellationToken cancellationToken)
        {

            return medico.Get();
        }
    }
   
}






