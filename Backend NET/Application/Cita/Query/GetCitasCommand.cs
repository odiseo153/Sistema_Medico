using Microsoft.AspNetCore.Mvc;


namespace Application.Cita.Query
{
    public class GetCitasCommand : IRequest<IActionResult>
    {
    }

    public class GetCitasHandler(CitasRepository citas) : IRequestHandler<GetCitasCommand, IActionResult>
    {
        public async Task<IActionResult> Handle(GetCitasCommand request, CancellationToken cancellationToken)
        {
            return citas.Get();
        }
    }


}
