using CookingApi.Domain.Entities;

namespace CookingApi.Domain.DAL.Base
{
    public interface IRepository<T>
    where T : CoreEntity
    {
        Task<T> Get(Guid id);
        IQueryable<T> Query();
        Task<Guid> Add(T entity);
        Task Update(T entity);
  }
}
