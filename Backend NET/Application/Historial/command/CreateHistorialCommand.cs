using Infraestructure.Context;
using Microsoft.AspNetCore.Mvc;

namespace Application.Historial.command
{
    public class CreateHistorialCommand : IRequest<IActionResult>   
    {
        public HistorialMedico HistorialMedico { get; set; }
    }

    public class CreateHistorialHandler(HistorialRepository
    _context, SistemaMedicoContext context) : IRequestHandler<CreateHistorialCommand, IActionResult>
    {

        public async Task<IActionResult> Handle(CreateHistorialCommand request, CancellationToken cancellationToken)
        {

            var historial = MapperControl.mapper.Map<HistorialMedico>(request);
            var response = await _context.Create(historial);

            return response;
        }
    }
}
