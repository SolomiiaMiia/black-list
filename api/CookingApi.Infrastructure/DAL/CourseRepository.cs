using CookingApi.Domain.DAL;
using CookingApi.Domain.Entities;
using CookingApi.Infrastructure.DAL.Base;
using NHibernate;

namespace CookingApi.Infrastructure.DAL
{
    public class CourseRepository : BaseRepository<Course>, ICourseRepository
    {
        public CourseRepository(ISession session) : base(session)
        {
        }
    }
}
