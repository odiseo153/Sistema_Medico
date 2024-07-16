using Application.Medicos.Command;
using Application.Medicos.Query;
using Core.Entities;
using Libreria.Application.Handlers;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

public class MedicoController : Controller
{
    private IMediator mediator;

    public MedicoController(IMediator Mediator)
    {
        mediator = Mediator;
    }
    
    
    [HttpGet("Medicos")]
    public async Task<IActionResult> Get()
    {
        return await mediator.Send(new GetMedicoCommand());
    }

    [HttpGet("Medico/{Id}")]
    public async Task<IActionResult> Get(Guid Id)
    {
        return await mediator.Send(new GetMedicoByIdQuery(Id));
    }

    [HttpPost("Medico")]
    public async Task<IActionResult> Index([FromBody]CreateMedicoCommand medico)
    {
        if (!ModelState.IsValid)
        {
            return new JsonResult(ModelState);
        }

        return await mediator.Send(medico);
    }

    [HttpDelete("Medico/{id}")]
    public async Task<bool> Delete(Guid Id)
    {
        return await mediator.Send(new DeleteEntityCommand<Medico>(Id));
    }

    /*
    [HttpGet("Medico/{id}")]
    public async Task<IActionResult> GetCitas(Guid Id)
    {
        return await mediator.Send(new GetDataByIdQuery<Medico>(Id));
    }
    */

    [HttpPut("Medico")]
    public async Task<IActionResult> UpdateMedico([FromBody] UpdateMedicoCommand medico)
    {
        return await mediator.Send(medico);
    }




}






