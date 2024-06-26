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

        
    }
}
