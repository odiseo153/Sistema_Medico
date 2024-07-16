using Application.Email.Servicio_Email;
using Core.Entities;
using System;
using System.Threading.Tasks;

namespace Application.Email.Recordatorio
{
    public class Recordatorio
    {
        private readonly IEmailService _emailService;
        private readonly CitasRepository _citasRepository;

        public Recordatorio(IEmailService emailService, CitasRepository citasRepository)
        {
            _emailService = emailService;
            _citasRepository = citasRepository;
        }

        public async Task<bool> RecordarCita()
        {
            var listCitas = await _citasRepository.GetAll();

            await EnviarCorreo("odiseorincon@gmail.com");

            foreach (var cita in listCitas)
            {
                if (cita.FechaHora < DateTime.UtcNow.AddDays(-3))
                {
                    await EnviarCorreo(cita.Paciente.Email);
                }
                else if (cita.FechaHora < DateTime.UtcNow.AddDays(-1))
                {
                    await EnviarCorreo(cita.Paciente.Email);
                }
                else if (cita.FechaHora < DateTime.UtcNow.AddHours(-20))
                {
                    await EnviarCorreo(cita.Paciente.Email);
                }
                else
                {
                    return false;
                }
            }
            return true;
        }

        private async Task EnviarCorreo(string email)
        {
            await _emailService.SendAsync(new Core.Email.EmailRequest
            {
                To = email,
                Body = "Querido paciente, recordar que tiene una cita en el médico pendiente.",
                Subject = "Recordatorio de cita"
            });
        }
    }
}