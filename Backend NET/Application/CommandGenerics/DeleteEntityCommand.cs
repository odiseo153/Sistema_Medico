

using Core.Entities.Base;

namespace Libreria.Application.Handlers
{

    public class DeleteEntityCommand<TEntidad>: BaseEntity,IRequest<bool>
    {
        public DeleteEntityCommand(Guid id)
        {
            Id = id;
        }
    }

    
    public class DeleteEntityHandler<TEntidad> : IRequestHandler<DeleteEntityCommand<TEntidad>, bool> where TEntidad : class
    {
        private Repository<TEntidad> context;
        public DeleteEntityHandler(Repository<TEntidad> libreriaContext)
        {
            this.context = libreriaContext;
        }
        public async Task<bool> Handle(DeleteEntityCommand<TEntidad> request, CancellationToken cancellationToken)
        {
            return await context.Delete(request.Id);
        }
    }
}
