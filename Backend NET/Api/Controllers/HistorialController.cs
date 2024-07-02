using Application.Historial.command;
using Application.Historial.Query;
using Core.Entities;
using Libreria.Application.Handlers;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    public class HistorialController : Controller
    {
        private IMediator mediator;

        public HistorialController(IMediator Mediator)
        {
            mediator = Mediator;
        }

        // GET
        [HttpGet("HistorialMedico")]
        public async Task<IActionResult> Index()
        {
            return await mediator.Send(new GetHistorialCommand());
        }

        [HttpPost("HistorialMedico")]
        public async Task<IActionResult> Create([FromBody] CreateHistorialCommand historial)
        {
            return await mediator.Send(historial);
        }

        [HttpDelete("HistorialMedico/{id}")]
        public async Task<bool> Delete(Guid Id)
        {
            return await mediator.Send(new DeleteEntityCommand<HistorialMedico>(Id));
        }

        [HttpPut("HistorialMedico")]
        public async Task<IActionResult> Update([FromBody] UpdateHistorialCommand historial)
        {
            return await mediator.Send(historial);
        }
    }
}
