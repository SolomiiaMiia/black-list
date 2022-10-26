using CookingApi.Domain.Entities;
using NHibernate;

namespace CookingApi.Domain.DAL.Base
{
  public interface IRepository<T>
  where T : CoreEntity
  {
    Task<T> Get(int id);
    IQueryable<T> Query();
    IQueryOver<T> QueryOver();
    Task<int> Add(T entity);
    Task<object> AddCompositeEntity(T entity);
    Task Update(T entity);
    Task Delete(T entity);
  }
}
