using CookingApi.Infrastructure.Models.DTO.Setting;
using CookingApi.Infrastructure.Models.DTO.ViewModels;

namespace CookingApi.Infrastructure.Services.Abstractions
{
  public interface ISettingsService
  {
    Task<Settings> GetSetting();
    Task<Settings> UpdateSetting(SettingCreateDto dto, string webRootPath);
  }
}
