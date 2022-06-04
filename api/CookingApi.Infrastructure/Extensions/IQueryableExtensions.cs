using CookingApi.Domain.Entities;
using CookingApi.Infrastructure.Models.DTO.Base;

namespace CookingApi.Infrastructure.Extensions
{
    public static class IQueryableExtensions
    {
        public static IQueryable<T> GetPageItems<T>(this IQueryable<T> query, BaseSearchParametersDto searchDto) where T : CoreEntity =>
            query.Skip((searchDto.Page - 1) * searchDto.Take).Take(searchDto.Take);
    }
}
