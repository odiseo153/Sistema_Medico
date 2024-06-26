using Application.Pacientes.Command;
using Application.Pacientes.Query;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

public class PacientesController : Controller
{
    private IMediator mediator;
    public PacientesController(IMediator _mediator)
    {
        mediator = _mediator;
    }

    // GET
    [HttpGet("Pacientes")]
    public async Task<IActionResult> Index()
    {
        return await mediator.Send(new GetPacientesCommand());
    }

    [HttpGet("Paciente/{Id}")]
    public async Task<IActionResult> GetById(Guid Id)
    {
        return await mediator.Send(new GetPacienteByIdQuery(Id));
    }

    [HttpPost("Pacientes")]
    public async Task<IActionResult> Create([FromBody] CreatePacienteCommand paciente)
    {
        return await mediator.Send(paciente);
    }

    /*
    [HttpGet("Pacientes/{id}")]
    public async Task<IActionResult> GetCitas(Guid Id)
    {
        return await mediator.Send(new GetDataByIdQuery<Paciente>(Id));
    }
    */

    [HttpPut("Pacientes")]
    public async Task<IActionResult> UpdatePacientes([FromBody]UpdatePacienteCommand paciente)
    {
        return await mediator.Send(paciente);
    }

}






