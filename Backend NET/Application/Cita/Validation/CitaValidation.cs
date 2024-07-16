using Application.Commands.Cita;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Cita.Validation
{
    public class CitaValidation :AbstractValidator<CreateCitasCommand>
    {
        public CitaValidation()
        {
            RuleFor(x => x.Estado)
                .MinimumLength(3)
                .NotEmpty()
                .NotNull();

            RuleFor(x => x.Comentarios)
                .MinimumLength(3)
                .NotEmpty()
                .NotNull();



        }
    }
}
