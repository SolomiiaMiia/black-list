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

        public async Task<Guid> Add(T entity) => (Guid)await _nhSession.SaveAsync(entity);

        public Task<T> Get(Guid id) => _nhSession.GetAsync<T>(id);

        public IQueryable<T> Query() => _nhSession.Query<T>();
    }
}
