using System.IO.Compression;
using CookingApi.Domain.Entities;
using CookingApi.Infrastructure.Models.DTO.Dossier;
using CookingApi.Infrastructure.Models.DTO.DossierDisprove;
using CookingApi.Infrastructure.Services.Abstractions;
using CookingApi.Web.Filters;
using Microsoft.AspNetCore.Mvc;
using static System.Net.Mime.MediaTypeNames;

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

      var id = await _dossierService.CreateDossier(dto);
      return new OkObjectResult(id);
    }

    [HttpPost]
    [Route("{id}/disprove")]
    public async Task<IActionResult> PostDisprove(int id, [FromForm] DossierDisproveCreateDto dto)
    {
      dto.Validate();

      var disproveId = await _dossierService.CreateDossierDisprove(id, dto);
      return new OkObjectResult(disproveId);
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

    [HttpGet]
    [Route("{id}")]
    public async Task<IActionResult> Get(int id, [FromServices] IAuthService authService)
    {
      var dossier = await _dossierService.GetDossier(id, authService.isAuthorized());
      return new OkObjectResult(dossier);
    }

    [AuthFilter("admin", "superAdmin")]
    [HttpPut]
    [Route("{id}")]
    public async Task<IActionResult> ManageDenyPublishDossier(int id, [FromQuery] string action, [FromForm] DossierEditDto dto, [FromServices] IAuthService authService)
    {
      dto.Validate();

      bool isSuperAdmin = authService.isAuthorizedInRole("superAdmin");

      await _dossierService.EditDossier(id, dto, action, isSuperAdmin);
      return Ok();
    }

    [HttpGet]
    [Route("feed")]
    public async Task<IActionResult> GetFeed([FromQuery] int skip, [FromServices] IAuthService authService)
    {
      var dossier = await _dossierService.GetFeed(skip, authService.isAuthorized());
      return new OkObjectResult(dossier);
    }

    [HttpGet("files/{id}")]
    public async Task<IActionResult> GetFile(int id, [FromServices] IAuthService authService, [FromQuery] string? accessToken)
    {
      var (filePath, mime) = await _dossierService.GetFilePath(id, authService.isAuthorized(accessToken));
      var bytes = await System.IO.File.ReadAllBytesAsync(filePath);
      return File(bytes, mime, Path.GetFileName(filePath));
    }

    [HttpGet("{id}/files")]
    public async Task<IActionResult> GetFiles(int id, bool isDisprove)
    {
      var files = await _dossierService.GetDossierFiles(id, isDisprove);

      var tempArchive = Path.Combine(_dossierService.GetWebRootPath(), "temp", $"archive-{Guid.NewGuid()}.zip");

      using (var archive = ZipFile.Open(tempArchive, ZipArchiveMode.Create))
      {

        foreach (var file in files)
        {
          archive.CreateEntryFromFile(
              file.Path,
             file.Name,
              CompressionLevel.SmallestSize
          );
        }
      }

      var bytes = await System.IO.File.ReadAllBytesAsync(tempArchive);

      System.IO.File.Delete(tempArchive);

      return File(bytes, Application.Zip, "archive.zip");
    }

    [HttpGet]
    [Route("search")]
    public async Task<IActionResult> Search([FromQuery] Dossier.DossierType type, [FromServices] IAuthService authService, [FromQuery] string? searchText)
    {
      var isAuthorized = authService.isAuthorized();
      var searchResults = await _dossierService.SearchDossier(string.IsNullOrEmpty(searchText) ? "" : searchText, type, isAuthorized);
      return new OkObjectResult(searchResults);
    }

    [HttpGet]
    [Route("corruptors")]
    public async Task<IActionResult> Get([FromQuery] string? searchText)
    {
      var searchResults = await _dossierService.SearchCorruptors(string.IsNullOrEmpty(searchText) ? "" : searchText);
      return new OkObjectResult(searchResults);
    }
  }
}
