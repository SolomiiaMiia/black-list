using CookingApi.Infrastructure.Models.DTO.Auth;

namespace CookingApi.Infrastructure.Services.Abstractions
{
  public interface IAuthService
  {
    object Login(LoginDto dto);
    User? GetUserByToken(string token);
  }
}
