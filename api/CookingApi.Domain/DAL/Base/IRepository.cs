using CookingApi.Domain.Entities;

namespace CookingApi.Domain.DAL.Base
{
    public interface IRepository<T>
    where T : CoreEntity
    {
        Task<T> Get(int id);
        IQueryable<T> Query();
        Task<int> Add(T entity);
        Task Update(T entity);
  }
}
