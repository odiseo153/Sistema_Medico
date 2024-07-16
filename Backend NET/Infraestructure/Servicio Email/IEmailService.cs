using Core.Email;

namespace Application.Email.Servicio_Email
{
    public interface IEmailService
    {
        Task SendAsync(EmailRequest request);
    }
}
