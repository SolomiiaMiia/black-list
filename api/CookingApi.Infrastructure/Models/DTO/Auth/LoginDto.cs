using System.Net;
using CookingApi.Infrastructure.Exceptions;

namespace CookingApi.Infrastructure.Models.DTO.Auth
{
  public class LoginDto
  {
    public string Username { get; set; }
    public string Password { get; set; }

    public void Validate()
    {
      if (string.IsNullOrWhiteSpace(Username) || string.IsNullOrWhiteSpace(Password))
        throw new CookingException(HttpStatusCode.UnprocessableEntity, "Не валідні дані");
    }
  }
}
