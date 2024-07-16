using Microsoft.AspNetCore.Mvc;


namespace Application.Pacientes.Query
{
    public class GetPacientesCommand : IRequest<IActionResult>
    {
    }


    public class GetPacienteHandler(PacienteRepository paciente) : IRequestHandler<GetPacientesCommand, IActionResult>
    {
        public async Task<IActionResult> Handle(GetPacientesCommand request, CancellationToken cancellationToken)
        {

            return paciente.Get();
        }
    }
}
