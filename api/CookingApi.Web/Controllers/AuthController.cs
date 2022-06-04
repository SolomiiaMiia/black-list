using CookingApi.Infrastructure.Models.DTO.Auth;
using CookingApi.Infrastructure.Services.Abstractions;
using Microsoft.AspNetCore.Mvc;

namespace CookingApi.Web.Controllers
{
  [Route("api/auth")]
  [ApiController]
  public class AuthController : ControllerBase
  {
    private readonly IAuthService authService;
    public AuthController(IAuthService _authService)
    {
      authService = _authService;
    }


    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginDto dto)
    {
      dto.Validate();

      return new OkObjectResult(authService.Login(dto));
    }
  }
}
