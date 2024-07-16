using Application.Cita.Query;
using Application.Cita.Recordatorio;
using Application.Commands.Cita;
using Core.Entities;
using Libreria.Application.Handlers;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

public class CitasController : Controller
{
    public IMediator mediator;
    public CitasController(IMediator _mediator)
    {
        mediator = _mediator;
    }
    // GET
    [HttpGet("Citas")]
    public async Task<IActionResult> Index()
    {
        return await mediator.Send(new GetCitasCommand());
    }

    [HttpPost("Citas")]
    public async Task<IActionResult> Create([FromBody]CreateCitasCommand cita)
    {
        return await mediator.Send(cita);
    }

    [HttpDelete("Citas/{id}")]
    public async Task<bool> Delete(Guid Id)
    {
        return await mediator.Send(new DeleteEntityCommand<Citas>(Id));
    }
    
    [HttpPut("Citas")]
    public async Task<IActionResult> Update([FromBody]UpdateCitasCommand cita)
    {
        return await mediator.Send(cita);
    }

    [HttpGet("RecordatorioCitas")]
    public async Task<IActionResult> SendRecordatorio()
    {
        return await mediator.Send(new RecordarCitaCommand());
    }

}






