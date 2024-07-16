using Application.Authenticacion;
using Application.Cita.Query;
using Application.Cita.Recordatorio;
using Application.Commands.Cita;
using Application.Email.Servicio_Email;
using Application.Medicos.Command;
using Application.Medicos.Query;
using Application.Pacientes.Command;
using Application.Pacientes.Query;
using Core.Settings;
using Libreria.Application.Handlers;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Configuration;



namespace Application
{
    public static class ServiceRegistration
    {
        public static void AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
        {

            services.AddScoped<IRequestHandler<GetPacientesCommand, IActionResult>, GetPacienteHandler>();
            services.AddScoped<IRequestHandler<GetPacienteByIdQuery, IActionResult>, GetPacienteByIdHandler>();
            services.AddScoped<IRequestHandler<GetMedicoByIdQuery, IActionResult>, GetMedicoByIdHandler>();


            services.AddScoped<IRequestHandler<GetMedicoCommand, IActionResult>, GetMedicoHandler>();
            services.AddScoped<IRequestHandler<GetCitasCommand, IActionResult>, GetCitasHandler>();

            services.AddScoped<IRequestHandler<LoginCommand<Medico>, IActionResult>, LoginHandler<Medico>>();
            services.AddScoped<IRequestHandler<LoginCommand<Paciente>, IActionResult>, LoginHandler<Paciente>>();

            services.AddScoped<IRequestHandler<UpdateCitasCommand, IActionResult>, UpdateCitasHandler>();
            services.AddScoped<IRequestHandler<UpdatePacienteCommand, IActionResult>, UpdatePacienteHandler>();


            services.AddScoped<IRequestHandler<CreateMedicoCommand, IActionResult>, CreateMedicoHandler>();
            services.AddScoped<IRequestHandler<CreatePacienteCommand, IActionResult>, CreatePacienteHandler>();
            services.AddScoped<IRequestHandler<CreateCitasCommand, IActionResult>, CreateCitasHandler>();


            services.AddScoped<IRequestHandler<DeleteEntityCommand<Citas>, bool>, DeleteEntityHandler<Citas>>();
            services.AddScoped<IRequestHandler<DeleteEntityCommand<HistorialMedico>, bool>, DeleteEntityHandler<HistorialMedico>>();
            services.AddScoped<IRequestHandler<DeleteEntityCommand<Medico>, bool>, DeleteEntityHandler<Medico>>();
            services.AddScoped<IRequestHandler<DeleteEntityCommand<Paciente>, bool>, DeleteEntityHandler<Paciente>>();
            services.AddScoped<IRequestHandler<RecordarCitaCommand, IActionResult>, RecordarCitaCommandHandler>();
           // services.AddTransient(typeof(IRequestHandler<,>), typeof(DeleteEntityHandler<>));


            services.AddScoped<UserManager<IdentityUser>>();
            services.AddScoped< SignInManager < IdentityUser >> ();

            services.Configure<MailSettings>(configuration.GetSection("MailSettings"));
            services.AddTransient<IEmailService, EmailService>();

        }



    }
}
