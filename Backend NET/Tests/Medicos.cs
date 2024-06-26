using MediatR;
using Api.Controllers;
using Application.Query;
using Core.Entities;


namespace Tests
{
    [TestFixture]
    public class Tests
    {
        private IMediator mediator;

        public Tests(IMediator _mediator)
        {
            mediator = _mediator;
        }

        [SetUp]
        public void Setup()
        {

        }

        [Test]
        public  void DevuelvePacientes()
        {
            // Crea una instancia del controlador con el mediador inyectado
            var medicoController = mediator.Send(new GetDataQuery<Medico>());


            // Realiza la aserción
            Assert.IsNotNull(medicoController);
        }
    }
}








