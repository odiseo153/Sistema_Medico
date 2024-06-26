using Application.Pacientes.Command;
using FluentValidation;


namespace Application.Pacientes.Validation
{
    public class CreatedPacienteValidation : AbstractValidator<CreatePacienteCommand>
    {
        public CreatedPacienteValidation() 
        {


            RuleFor(x => x.Email)
               .Matches("\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b")
               .MinimumLength(3)
               .NotEmpty()
               .NotNull()
               .WithMessage("El correo no es valido");

            RuleFor(x => x.UserName)
               .MinimumLength(3)
               .NotEmpty()
               .NotNull();

            RuleFor(x => x.Password)
              .MinimumLength(3)
              .NotEmpty()
              .NotNull();
        
        }
    }
}

