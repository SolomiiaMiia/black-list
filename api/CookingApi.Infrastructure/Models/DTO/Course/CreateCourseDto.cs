using System.Net;
using CookingApi.Infrastructure.Exceptions;

namespace CookingApi.Infrastructure.Models.DTO.Course
{
    public class CreateCourseDto
    {
        public string? Title { get; set; }
        public string? ShortDescription { get; set; }
        public string? Description { get; set; }
        public decimal Price { get; set; }

        public void Validate()
        {
            if (string.IsNullOrWhiteSpace(Title) || string.IsNullOrWhiteSpace(ShortDescription) || string.IsNullOrWhiteSpace(Description) || Price <= 0)
                throw new CookingException(HttpStatusCode.UnprocessableEntity, "validation_error");
        }
    }
}
