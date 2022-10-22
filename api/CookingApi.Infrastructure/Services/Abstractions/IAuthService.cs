using CookingApi.Infrastructure.Models.DTO.Auth;

namespace CookingApi.Infrastructure.Services.Abstractions
{
  public interface IAuthService
  {
    bool isAuthorized(string? accessToken = null);
    bool isAuthorizedInRole(string role);
    object Login(LoginDto dto);
    User? GetUserByToken(string token);
  }
}
