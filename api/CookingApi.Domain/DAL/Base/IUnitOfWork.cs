namespace CookingApi.Domain.DAL.Base
{
    public interface IUnitOfWork
    {
        ICourseRepository CourseRepository { get; }
        Task CommitAsync();
    }
}
