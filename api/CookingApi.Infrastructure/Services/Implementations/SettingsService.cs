using CookingApi.Domain.DAL.Base;
using CookingApi.Domain.Entities;
using CookingApi.Infrastructure.Models.DTO.Setting;
using CookingApi.Infrastructure.Services.Abstractions;
using NHibernate.Linq;

namespace CookingApi.Infrastructure.Services.Implementations
{
  public class SettingsService : ISettingsService
  {
    private readonly IUnitOfWork _unitOfWork;

    public SettingsService(IUnitOfWork unitOfWork)
    {
      _unitOfWork = unitOfWork;
    }

    public async Task<SettingDto> GetSetting()
    {
      var setting = await _unitOfWork.SettingsRepository.Query().FirstOrDefaultAsync();
      if (setting != null) return new SettingDto()
      {
        VideoLink = setting.VideoLink,
        DisproveDossierText = setting.DisproveDossierText,
        NewDossierText = setting.NewDossierText,
      };
      return null;
    }

    public async Task UpdateSetting(SettingDto dto)
    {
      var setting = await _unitOfWork.SettingsRepository.Query().FirstOrDefaultAsync();

      if (setting == null)
      {
        var newSetting = new Setting()
        {
          VideoLink = dto.VideoLink,
          DisproveDossierText = dto.DisproveDossierText,
          NewDossierText = dto.NewDossierText,
        };

        await _unitOfWork.SettingsRepository.Add(newSetting);

      }
      else
      {

        setting.VideoLink = dto.VideoLink;
        setting.DisproveDossierText = dto.DisproveDossierText;
        setting.NewDossierText = dto.NewDossierText;

        await _unitOfWork.SettingsRepository.Update(setting);
      }

      await _unitOfWork.CommitAsync();

    }
  }
}
