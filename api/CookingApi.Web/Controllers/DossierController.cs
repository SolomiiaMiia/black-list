using System.Net;
using CookingApi.Infrastructure.Exceptions;
using CookingApi.Infrastructure.Models.DTO.Dossier;
using CookingApi.Infrastructure.Models.DTO.DossierDisprove;
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
    public DossierController(IDossierService dossierService, IWebHostEnvironment hostingEnvironment)
    {
      _dossierService = dossierService;
      _dossierService.SetWebRootPath(hostingEnvironment.WebRootPath);
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromForm] DossierCreateDto dto)
    {
      dto.Validate();

      await _dossierService.CreateDossier(dto);
      return Ok();
    }

    [HttpPost]
    [Route("{id}/disprove")]
    public async Task<IActionResult> PostDisprove(int id, [FromForm] DossierDisproveCreateDto dto)
    {
      dto.Validate();

      await _dossierService.CreateDossierDisprove(id, dto);
      return Ok();
    }

    [AuthFilter("admin", "superAdmin")]
    [HttpPut]
    [Route("{id}/disprove/publish")]
    public async Task<IActionResult> ManageDisprovePublish(int id)
    {
      await _dossierService.PublishDossierDisprove(id);
      return Ok();
    }

    [AuthFilter("admin", "superAdmin")]
    [HttpPut]
    [Route("{id}/disprove/deny")]
    public async Task<IActionResult> ManageDisproveDeny(int id)
    {
      await _dossierService.DenyDossierDisprove(id);
      return Ok();
    }

    [AuthFilter("superAdmin")]
    [HttpDelete]
    [Route("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
      await _dossierService.DeleteDossier(id);
      return Ok();
    }

    [AuthFilter("superAdmin")]
    [HttpDelete]
    [Route("{id}/disprove")]
    public async Task<IActionResult> DeleteDisprove(int id)
    {
      await _dossierService.DeleteDossierDisprove(id);
      return Ok();
    }

    [HttpGet]
    [Route("latest")]
    public async Task<IActionResult> GetLatestDossiers()
    {
      var latestDossiers = await _dossierService.GetLatestDossiers();
      return new OkObjectResult(latestDossiers);
    }
  }
}
