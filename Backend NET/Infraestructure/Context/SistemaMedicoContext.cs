using Core.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Infraestructure.Context;

public class SistemaMedicoContext : IdentityDbContext<IdentityUser>
{
    
        public SistemaMedicoContext(DbContextOptions<SistemaMedicoContext> options) : base(options)
        {
            
        }

 
        public virtual DbSet<Citas> Citas { set; get; }
        public virtual DbSet<HistorialMedico> HistorialMedico { get; set; }
        public virtual DbSet<Paciente> Pacientes { set; get; }
        public virtual DbSet<Medico> Medicos { set; get; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        modelBuilder.HasDefaultSchema("Identity");
            #region Citas
                modelBuilder.Entity<Citas>(en =>
                {
                    en.HasKey(x => x.Id);
                    en.Property(x => x.Comentarios);
                    en.Property(x => x.Estado);
                    en.Property(x => x.FechaHora).HasDefaultValue(new DateTime());
                    en.Property(x => x.Completada).HasDefaultValue(false);

                    en.HasOne(x => x.Paciente)
                        .WithMany(x => x.CitasProgramadas)
                        .OnDelete(DeleteBehavior.NoAction); 

                    en.HasOne(x => x.Medico)
                        .WithMany(x => x.CitasProgramadas)
                        .OnDelete(DeleteBehavior.NoAction); 

                });
             #endregion
             
            #region Historial
                modelBuilder.Entity<HistorialMedico>(entity =>
                {
                    entity.HasKey(x => x.Id);
                    entity.Property(x => x.Diagnosticos);
                    entity.Property(x => x.Recetas);
                    entity.Property(x => x.Resultados);
                    entity.Property(x => x.Tratamientos);
                 


                    entity.HasOne(x => x.Paciente)
                        .WithMany(x => x.Historial);

                });
        #endregion



        modelBuilder.Entity<Paciente>(entity =>
        {
            //entity.HasKey(x => x.Id);
            entity.ToTable("Paciente");

            entity.HasMany(x => x.CitasProgramadas)
            .WithOne(x => x.Paciente)
            .HasForeignKey(x => x.PacienteId)
            .OnDelete(DeleteBehavior.NoAction);
        });

        modelBuilder.Entity<Medico>(entity =>
        {
            //entity.HasKey(x => x.Id);
            entity.ToTable("Medico");

            entity.HasMany(x => x.CitasProgramadas)
            .WithOne(x => x.Medico)
            .HasForeignKey(x => x.MedicoId)
            .OnDelete(DeleteBehavior.Cascade);
        });


        base.OnModelCreating(modelBuilder);

    }
}








