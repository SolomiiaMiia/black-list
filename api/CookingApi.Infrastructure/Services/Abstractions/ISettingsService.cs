using CookingApi.Domain.Entities;
using CookingApi.Infrastructure.Models.DTO.Setting;

namespace CookingApi.Infrastructure.Services.Abstractions
{
  public interface ISettingsService
  {
    Task<SettingDto> GetSetting();
    Task UpdateSetting(SettingDto dto);
  }
}
