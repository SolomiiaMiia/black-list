namespace CookingApi.Domain.DAL.Base
{
    public interface IRepository<T>
    {
        Task<T> Get(Guid id);
        IQueryable<T> Query();
        Task<Guid> Add(T entity);
    }
}
