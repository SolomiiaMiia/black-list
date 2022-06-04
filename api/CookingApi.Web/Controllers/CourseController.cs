using CookingApi.Infrastructure.Models.DTO.Course;
using CookingApi.Infrastructure.Services.Abstractions;
using Microsoft.AspNetCore.Mvc;

namespace CookingApi.Web.Controllers
{
    [Route("api/course")]
    [ApiController]
    public class CourseController : CookingControllerBase
    {
        private readonly ICourseService _courseService;

        public CourseController(ICourseService courseService)
        {
            _courseService = courseService;
        }

        [HttpGet("search")]
        public async Task<IActionResult> Search([FromQuery] CourseSearchParametersDto dto)
        {
            var result = await _courseService.SearchCourses(dto);

            return GenerateResponse(result);
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateCourse([FromBody] CreateCourseDto dto)
        {
            dto.Validate();

            return GenerateResponse(await _courseService.CreateCourse(dto));
        }
    }
}
