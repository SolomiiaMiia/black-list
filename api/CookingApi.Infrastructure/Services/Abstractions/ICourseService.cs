using CookingApi.Infrastructure.Models.DTO.Course;
using CookingApi.Infrastructure.Models.ViewModels.Course;

namespace CookingApi.Infrastructure.Services.Abstractions
{
    public interface ICourseService
    {
        Task<IEnumerable<CourseListItemViewModel>> SearchCourses(CourseSearchParametersDto dto);
        Task<Guid> CreateCourse(CreateCourseDto dto);
    }
}
