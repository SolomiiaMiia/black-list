using System.Net;
using CookingApi.Infrastructure.Exceptions;
using CookingApi.Infrastructure.Extensions;
using CookingApi.Infrastructure.Models.DTO.Auth;
using CookingApi.Infrastructure.Services.Abstractions;
using Microsoft.Extensions.Options;

namespace CookingApi.Infrastructure.Services.Implementations
{
  public class AuthService : IAuthService
  {
    private readonly UserOptions _userOptions;
    public AuthService(IOptions<UserOptions> userOptions)
    {
      _userOptions = userOptions.Value;
    }
    public User? GetUserByToken(string token)
    {
      return _userOptions.allowed.SingleOrDefault(c => c.Token == token);
    }

    public object Login(LoginDto dto)
    {
      var user = _userOptions.allowed.SingleOrDefault(c => c.Name == dto.Username && c.Password == dto.Password);

      if (user == null) throw new CookingException(HttpStatusCode.BadRequest, "Неправильний логін або пароль");
      else return new { role = user.Role, token = user.Token };
    }

    public bool isAuthorized(string? accessToken = null)
    {
      var token = string.IsNullOrEmpty(accessToken)? MyHttpContext.Current.Request.Headers["Security-Token"].ToString(): accessToken;
      if (string.IsNullOrEmpty(token)) return false;
      else
      {
        return this.GetUserByToken(token) != null;
      }
    }

    public bool isAuthorizedInRole(string role)
    {
      var token = MyHttpContext.Current.Request.Headers["Security-Token"].ToString();
      if (string.IsNullOrEmpty(token)) return false;
      else
      {
        return this.GetUserByToken(token)?.Role == role;
      }
    }
  }
}
