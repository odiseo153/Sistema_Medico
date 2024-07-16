
using Application.Email.Servicio_Email;
using Core.Entities;
using Core.Settings;
using Infraestructure.Context;
using Infraestructure.Repository;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infraestructure
{
    public static class ServiceRegistration
    {
        public static void AddSistemaMedicoContext(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<SistemaMedicoContext>(options =>
            {
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));
            });

            services.AddScoped<PacienteRepository>();
            services.AddScoped<MedicoRepository>();
            services.AddScoped<CitasRepository>();

            services.AddScoped<Repository<Citas>>();
            services.AddScoped<Repository<Medico>>();
            services.AddScoped<Repository<HistorialMedico>>();
            services.AddScoped<Repository<Paciente>>();

            services.AddTransient( typeof(Repository<>));

            services.Configure<MailSettings>(configuration.GetSection("MailSettings"));
            services.AddScoped<IEmailService, EmailService>();
            services.AddScoped<EmailService>();
        }
    }
}