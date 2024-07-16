using Microsoft.AspNetCore.Mvc;

namespace Application.Historial.command
{
    public class UpdateHistorialCommand : IRequest<IActionResult>
    {
        public HistorialMedico HistorialMedico { get; set; }
    }

    public class UpdateHistorialHandler(CitasRepository repository) : IRequestHandler<UpdateHistorialCommand, IActionResult>
    {

        public async Task<IActionResult> Handle(UpdateHistorialCommand request, CancellationToken cancellationToken)
        {
            var nuevaCita = MapperControl.mapper.Map<Citas>(request);
            var response = await repository.Update(nuevaCita);

            return new JsonResult(response);
        }
    }
}
