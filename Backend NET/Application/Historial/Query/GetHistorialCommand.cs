using Microsoft.AspNetCore.Mvc;

namespace Application.Historial.Query
{
    public class GetHistorialCommand : IRequest<IActionResult>
    {
    }

    public class GetHistorialHandler(HistorialRepository historial) : IRequestHandler<GetHistorialCommand, IActionResult>
    {
        public async Task<IActionResult> Handle(GetHistorialCommand request, CancellationToken cancellationToken)
        {
            return historial.Get();
        }
    }
}
