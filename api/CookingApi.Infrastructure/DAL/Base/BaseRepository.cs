using CookingApi.Domain.DAL.Base;
using CookingApi.Domain.Entities;
using NHibernate;

namespace CookingApi.Infrastructure.DAL.Base
{
  public class BaseRepository<T> : IRepository<T> where T : CoreEntity
  {
    private readonly ISession _nhSession;

    protected BaseRepository(ISession session)
    {
      _nhSession = session;
    }

    public async Task<int> Add(T entity) => (int)await _nhSession.SaveAsync(entity);

    public Task Delete(T entity)=> _nhSession.DeleteAsync(entity);

    public Task<T> Get(int id) => _nhSession.GetAsync<T>(id);

    public IQueryable<T> Query() => _nhSession.Query<T>();
    public IQueryOver<T> QueryOver() => _nhSession.QueryOver<T>();

    public Task Update(T entity) => _nhSession.UpdateAsync(entity);

  }
}
