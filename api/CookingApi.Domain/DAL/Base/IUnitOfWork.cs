namespace CookingApi.Domain.DAL.Base
{
  public interface IUnitOfWork
  {
    ICourseRepository CourseRepository { get; }
    ISettingsRepository SettingsRepository { get; }
    Task CommitAsync();
  }
}
