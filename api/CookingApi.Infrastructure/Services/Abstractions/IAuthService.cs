using CookingApi.Infrastructure.Models.DTO.Auth;

namespace CookingApi.Infrastructure.Services.Abstractions
{
  public interface IAuthService
  {
    bool isAuthorized();
    object Login(LoginDto dto);
    User? GetUserByToken(string token);
  }
}
