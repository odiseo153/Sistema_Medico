using Application.Historial.command;
using FluentValidation;

namespace Application.Historial.Validation
{
    public class HistorialValidation : AbstractValidator<CreateHistorialCommand>
    {
        public HistorialValidation()
        {
            RuleFor(x => x.HistorialMedico.Paciente.Id)
                .NotEmpty()
                .NotNull();

            RuleFor(x => x.HistorialMedico.Diagnosticos)
                .MinimumLength(3)
                .NotEmpty()
                .NotNull();

            RuleFor(x => x.HistorialMedico.Tratamientos)
                .MinimumLength(3)
                .NotEmpty()
                .NotNull();

            RuleFor(x => x.HistorialMedico.Recetas)
                .MinimumLength(3)
                .NotEmpty()
                .NotNull();

            RuleFor(x => x.HistorialMedico.Resultados)
                .MinimumLength(3)
                .NotEmpty()
                .NotNull();
        }
    }
}
