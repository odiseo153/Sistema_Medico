
using Application.Commands.Cita;
using Application.Medicos.Command;
using Application.Pacientes.Command;
using AutoMapper;


namespace Catalog.Application.Mappers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<CreateMedicoCommand,Medico>().ReverseMap();
            
            CreateMap<CreatePacienteCommand, Paciente>().ReverseMap();
            CreateMap<UpdatePacienteCommand, Paciente>().ReverseMap();
            
            CreateMap<CreateCitasCommand,Citas>().ReverseMap();
            CreateMap<UpdateCitasCommand, Citas>().ReverseMap();


        }
    }
}
