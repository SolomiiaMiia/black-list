using CookingApi.Infrastructure.Models.DTO.Setting;
using CookingApi.Infrastructure.Models.DTO.ViewModels;
using CookingApi.Infrastructure.Services.Abstractions;
using CookingApi.Web.Filters;
using Microsoft.AspNetCore.Mvc;

namespace CookingApi.Web.Controllers
{
  [Route("api/settings")]
  [ApiController]
  public class SettingsController : ControllerBase
  {
    private readonly ISettingsService _settingsService;
    public SettingsController(ISettingsService settingsService)
    {
      _settingsService = settingsService;
    }

    [HttpGet]
    public async Task<Settings> Get()
    {
      //var d = Infrastructure.Extensions.MyHttpContext.AppBaseUrl;
      return await _settingsService.GetSetting();
    }

    [HttpPut]
    [AuthFilter("admin", "superAdmin")]
    public async Task<Settings> Save([FromForm] SettingCreateDto dto, [FromServices] IWebHostEnvironment hostingEnvironment)
    {
      dto.Validate();

      return await _settingsService.UpdateSetting(dto, hostingEnvironment.WebRootPath);
    }

  }
}
