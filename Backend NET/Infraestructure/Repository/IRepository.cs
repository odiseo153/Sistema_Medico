

using Core.Entities.Base;

namespace Infraestructure.Repository;

public interface IRepository<T>
{
    public Task<BaseEntity> Update(BaseEntity entity);
    
    public Task<bool> Delete(Guid Id);
    
}

