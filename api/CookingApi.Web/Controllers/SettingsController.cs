using CookingApi.Domain.Entities;
using CookingApi.Infrastructure.Models.DTO.Setting;
using CookingApi.Infrastructure.Services.Abstractions;
using CookingApi.Web.Filters;
using Microsoft.AspNetCore.Mvc;

namespace CookingApi.Web.Controllers
{
  [Route("api/settings")]
  [ApiController]
  [AuthFilter("admin", "superAdmin")]
  public class SettingsController : ControllerBase
  {
    private readonly ISettingsService _settingsService;
    public SettingsController(ISettingsService settingsService)
    {
      _settingsService = settingsService;
    }

    [HttpGet]
    public async Task<SettingDto> Get()
    {
      return await _settingsService.GetSetting();
    }

    [HttpPut]
    public async Task<IActionResult> Save([FromBody] SettingDto dto)
    {
      dto.Validate();

      await _settingsService.UpdateSetting(dto);

      return Ok();
    }

  }
}
