using Application.Commands.Cita;
using Application.Email.Servicio_Email;
using Microsoft.AspNetCore.Mvc;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Cita.Recordatorio
{
    public class RecordarCitaCommand : IRequest<IActionResult>
    {

    }

    public class RecordarCitaCommandHandler : IRequestHandler<RecordarCitaCommand, IActionResult>
    {
        private readonly IEmailService _emailService;
        private readonly CitasRepository _citasRepository;

        public RecordarCitaCommandHandler(IEmailService emailService, CitasRepository citasRepository)
        {
            _emailService = emailService;
            _citasRepository = citasRepository;
        }
        public async Task<IActionResult> Handle(RecordarCitaCommand request, CancellationToken cancellationToken)
        {
            var recordatorio = new Email.Recordatorio.Recordatorio(_emailService, _citasRepository);
            bool result = await recordatorio.RecordarCita();

            if (result)
            {
                return new OkResult();
            }
            else
            {
                return new BadRequestResult();
            }
        }
    }
}