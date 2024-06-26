using Core.Entities.Base;
using Infraestructure.Context;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace Application.Authenticacion
{
    public class LoginCommand<Entidad>
        : IRequest<IActionResult> where Entidad : BaseEntity
    {
        public string Password { get; set; }
        public string Email { get; set; }
    }

    public class LoginHandler<Entidad>(SistemaMedicoContext context, PacienteRepository repositoryPaciente, MedicoRepository repositoryMedico) 
        : IRequestHandler<LoginCommand<Entidad>, IActionResult> where Entidad : BaseEntity
    {

        public async Task<IActionResult> Handle(LoginCommand<Entidad> request, CancellationToken cancellationToken)
        {
            var entidad = context.Set<Entidad>();


            if (typeof(Entidad)== new Paciente().GetType())
            {
                var paciente = context.Pacientes.FirstOrDefault(m => m.Email == request.Email && m.Password == request.Password) ?? null;

                if (paciente == null)
                {
                    return new JsonResult(new
                    {
                        Message = "No se encuentra Paciente con esas credenciales",
                        Code = StatusCodes.Status404NotFound
                    });
                }

                var responses = repositoryPaciente.Get(paciente.Id);
                return new JsonResult(responses);
            }

           
                var medico = context.Medicos.FirstOrDefault(m => m.Email == request.Email && m.Password == request.Password);

                if (medico == null) 
                {
                    return new JsonResult(new
                    {
                        Message = "No se encuentra Medico con esas credenciales",
                        Code = StatusCodes.Status404NotFound
                    });
                }

                var response = repositoryMedico.Get(medico.Id);
                return new JsonResult(response);
            


        }

    }
}
