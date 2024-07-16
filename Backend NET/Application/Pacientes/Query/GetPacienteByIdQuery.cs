using Microsoft.AspNetCore.Mvc;



namespace Application.Pacientes.Query
{
    public class GetPacienteByIdQuery(Guid Id) : IRequest<IActionResult>
    {
      public Guid Id { get; set; } = Id;
    }

    public class GetPacienteByIdHandler(PacienteRepository paciente) : IRequestHandler<GetPacienteByIdQuery, IActionResult>
    {
        public async Task<IActionResult> Handle(GetPacienteByIdQuery request, CancellationToken cancellationToken)
        {
            var response = paciente.Get(request.Id);

            return response;
        }
    }
}



