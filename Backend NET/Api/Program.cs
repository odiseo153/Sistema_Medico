using Api.Seed;
using Core.Entities;
using Infraestructure.Context;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Api;

public class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        var startup = new Startup(builder.Configuration);

        // Add services to the container.
        startup.ConfigureServices(builder.Services);

        var app = builder.Build();

        using (var service = app.Services.CreateScope())
        {
            var servicio = service.ServiceProvider;
            var db = servicio.GetRequiredService<SistemaMedicoContext>();
            //db.Database.Migrate();

            //db.Database.EnsureDeleted();
           // db.Database.EnsureCreated();

            // db.Seed_Pacientes();
            //db.Seed_Medico();
            //db.Seed_Citas();

        }


        // Configure the HTTP request pipeline.
        startup.Configure(app, app.Environment);

        app.Run();
    }
}