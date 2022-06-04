using CookingApi.Domain.DAL.Base;
using CookingApi.Domain.Entities;
using CookingApi.Infrastructure.Extensions;
using CookingApi.Infrastructure.Models.DTO.Course;
using CookingApi.Infrastructure.Models.ViewModels.Course;
using CookingApi.Infrastructure.Services.Abstractions;
using NHibernate.Linq;

namespace CookingApi.Infrastructure.Services.Implementations
{
    public class CourseService : ICourseService
    {
        private readonly IUnitOfWork _unitOfWork;

        public CourseService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<CourseListItemViewModel>> SearchCourses(CourseSearchParametersDto dto)
        {
            var courses = await _unitOfWork.CourseRepository.Query()
                .OrderByDescending(x => x.CreationDate)
                .GetPageItems(dto)
                .ToListAsync();

            return courses.Select(x => new CourseListItemViewModel
            {
                Id = x.Id,
                Title = x.Title
            });
        }

        public async Task<Guid> CreateCourse(CreateCourseDto dto)
        {
            var course = new Course
            {
                Description = dto.Description,
                Price = dto.Price,
                ShortDescription = dto.ShortDescription,
                Title = dto.Title
            };

            var courseId = await _unitOfWork.CourseRepository.Add(course);

            await _unitOfWork.CommitAsync();

            return courseId;
        }
    }
}
