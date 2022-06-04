using CookingApi.Domain.DAL;
using CookingApi.Domain.DAL.Base;
using NHibernate;

namespace CookingApi.Infrastructure.DAL.Base
{
  public class UnitOfWork : IUnitOfWork
  {
    private readonly ISession _nhSession;

    public UnitOfWork(ISession session)
    {
      _nhSession = session;
    }

    public ICourseRepository CourseRepository => new CourseRepository(_nhSession);
    public ISettingsRepository SettingsRepository => new SettingsRepository(_nhSession);

    public async Task CommitAsync()
    {
      await _nhSession.FlushAsync();
      _nhSession.Dispose();
    }
  }
}
