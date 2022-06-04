using CookingApi.Infrastructure.Services.Abstractions;
using CookingApi.Web.Filters;
using Microsoft.AspNetCore.Mvc;

namespace CookingApi.Web.Controllers
{
  [Route("api/dossier")]
  [ApiController]
  public class DossierController : ControllerBase
  {
    private readonly IAuthService authService;
    public DossierController(IAuthService _authService)
    {
      authService = _authService;
    }

    [AuthFilter("superAdmin")]
    [HttpDelete]
    [Route("{id}")]
    public IActionResult Delete(int id)
    {
      return Ok();
    }
  }
}
