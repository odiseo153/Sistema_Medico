


using Microsoft.AspNetCore.Mvc;

namespace Application.Medicos.Query
{
    public class GetMedicoByIdQuery(Guid Id) : IRequest<IActionResult>
    {
        public Guid Id { get; set; } = Id;
    }

    public class GetMedicoByIdHandler(MedicoRepository medico) : IRequestHandler<GetMedicoByIdQuery, IActionResult>
    {
        public async Task<IActionResult> Handle(GetMedicoByIdQuery request, CancellationToken cancellationToken)
        {
            var response = medico.Get(request.Id);

            return response;
        }
    }
}
