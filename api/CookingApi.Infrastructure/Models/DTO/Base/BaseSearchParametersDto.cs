namespace CookingApi.Infrastructure.Models.DTO.Base
{
    public class BaseSearchParametersDto
    {
        public int Page { get; set; } = 1;
        public int Take { get; set; } = 10;
    }
}
