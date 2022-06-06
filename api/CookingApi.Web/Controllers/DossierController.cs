using CookingApi.Infrastructure.Models.DTO.Dossier;
using CookingApi.Infrastructure.Services.Abstractions;
using CookingApi.Web.Filters;
using Microsoft.AspNetCore.Mvc;

namespace CookingApi.Web.Controllers
{
  [Route("api/dossier")]
  [ApiController]
  public class DossierController : ControllerBase
  {
    private readonly IDossierService _dossierService;
    public DossierController(IDossierService dossierService)
    {
      _dossierService = dossierService;
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromForm] DossierCreateDto dto, [FromServices] IWebHostEnvironment hostingEnvironment)
    {
      dto.Validate();

      await _dossierService.Create(dto, hostingEnvironment.WebRootPath);
      return Ok();
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
