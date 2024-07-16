//using Microsoft.EntityFrameworkCore;

using MediatR;
using System.Reflection;
using Core.Entities;
using Infraestructure;
using Infraestructure.Context;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Application;
using Api.Seed;
using FluentValidation.AspNetCore;
using Application.Medicos.Command;
using Application.Pacientes.Validation;
using Application.Cita.Validation;
using Application.Cita.Recordatorio;
using Application.Historial.Query;
using Infraestructure.Repository;


namespace Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }


        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers()
               .AddFluentValidation(fv => {
                   fv.RegisterValidatorsFromAssemblyContaining<CreateMedicoCommand>();
                   fv.RegisterValidatorsFromAssemblyContaining<CreatedPacienteValidation>();
                   fv.RegisterValidatorsFromAssemblyContaining<CitaValidation>();
               });

            services.AddAuthentication();
            services.AddAuthorization();
            services.AddTransient<GlobalHandlerException>();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(op => op.TokenValidationParameters = new TokenValidationParameters()
            {
                ValidateIssuer = false,
                ValidateAudience = false,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(TokenGenerador.Key)),
                ValidateIssuerSigningKey = true
            });

            services.AddSistemaMedicoContext(Configuration);
            services.AddApplicationServices(Configuration);

            services.AddIdentity<IdentityUser, IdentityRole>()
                .AddEntityFrameworkStores<SistemaMedicoContext>()
                .AddDefaultTokenProviders();

            services.AddScoped<HistorialRepository>(); 

            services.AddMediatR(cfg => {
                cfg.RegisterServicesFromAssemblies(typeof(RecordarCitaCommandHandler).Assembly);
                cfg.RegisterServicesFromAssemblies(typeof(GetHistorialHandler).Assembly);
                cfg.RegisterServicesFromAssemblies(Assembly.GetExecutingAssembly());
            });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Mi Api de Libreria", Version = "v1" });
            });

            services.AddMediatR(cfg => { cfg.RegisterServicesFromAssemblies(Assembly.GetExecutingAssembly()); });
        }
         
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();

            app.UseAuthorization();

           // app.UseMiddleware<GlobalHandlerException>();

            app.UseSwagger();
            
            app.UseSwaggerUI(c => { c.SwaggerEndpoint("/swagger/v1/swagger.json", "Mi API medica v1"); });

            app.UseCors(x => x.AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin());

            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }
    }
}