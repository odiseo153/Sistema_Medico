using Core.Entities.Base;
using Infraestructure.Context;


namespace Infraestructure.Repository;

public class Repository<T>(SistemaMedicoContext context) : IRepository<T> where T : class
{
    public async Task<BaseEntity> Update(BaseEntity entidad)
    {

        var entida =await context.Set<T>().FindAsync(entidad.Id);

        foreach (var propiedad in entidad.GetType().GetProperties())
        {
            var valorEntidad = propiedad.GetValue(entidad);
            var valorFinal = valorEntidad ?? propiedad.GetValue(entida);

            propiedad.SetValue(entida, valorFinal);
        }

        await context.SaveChangesAsync();

        return entidad;
    }

    public async Task<bool> Delete(Guid Id)
    {
        try
        {
            var entidad =await context.Set<T>().FindAsync(Id);

            context.Remove(entidad);
            await context.SaveChangesAsync();

            return true;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return false;
        }
        
    }


    
    

}