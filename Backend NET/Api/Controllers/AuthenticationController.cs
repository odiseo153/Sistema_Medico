using Application.Authenticacion;
using Core.Entities;
using MediatR;
using Microsoft.AspNetCore.Mvc;



namespace Api.Controllers
{
    public class AuthenticationController : Controller
    {
        private IMediator mediator;
        public AuthenticationController(IMediator _mediator)
        {
            mediator = _mediator;
        }

        [HttpPost("LoginMedico")]
        public async Task<IActionResult> Authentication([FromBody]LoginCommand<Medico> login) 
        {
            return await mediator.Send(login);
        
        }

        [HttpPost("LoginPaciente")]
        public async Task<IActionResult> Authentication([FromBody] LoginCommand<Paciente> login)
        {
            return await mediator.Send(login);

        }


    }
}





