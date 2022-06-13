using CookingApi.Domain.DAL.Base;
using CookingApi.Domain.Entities;
using CookingApi.Infrastructure.Extensions;
using CookingApi.Infrastructure.Models.DTO.Setting;
using CookingApi.Infrastructure.Models.DTO.ViewModels;
using CookingApi.Infrastructure.Services.Abstractions;
using Microsoft.AspNetCore.Http;
using MimeTypes;
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

    public async Task<Settings> GetSetting()
    {
      var setting = await _unitOfWork.SettingsRepository.Query().FirstOrDefaultAsync();
      if (setting != null)
      {
        var appBaseUrl = MyHttpContext.AppBaseUrl;
        return new Settings()
        {
          VideoLink = setting.VideoLink,
          DisproveDossierText = setting.DisproveDossierText,
          NewDossierText = setting.NewDossierText,
          Pictures = await _unitOfWork.FilesRepository.Query().Where(c => !c.DossierId.HasValue && !c.DossierDisproveId.HasValue)
            .Select(c => new Models.DTO.ViewModels.File()
            {
              Name = c.Name,
              Url = $"{appBaseUrl}/api/dossier/files/{c.Id}"
            }).ToListAsync()

        };

      }
      return null;
    }

    public async Task<Settings> UpdateSetting(SettingCreateDto dto, string webRootPath)
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

        if (dto.Attachtments is not null)
        {
          // remove old files
          var files = await _unitOfWork.FilesRepository.Query().Where(c => !c.DossierId.HasValue && !c.DossierDisproveId.HasValue).ToListAsync();
          foreach (var file in files)
          {
            if (System.IO.File.Exists(file.Path)) System.IO.File.Delete(file.Path);
            await _unitOfWork.FilesRepository.Delete(file);
          }

          //upload new files
          string pathToSave = Path.Combine(webRootPath, "Settings");
          foreach (var formFile in dto.Attachtments)
          {
            var file = await SaveFileAsync(pathToSave, formFile, Domain.Entities.File.FileType.Attachtment);
            await _unitOfWork.FilesRepository.Add(file);
          }
        }
      }

      var settings = await GetSetting();

      await _unitOfWork.CommitAsync();

      return settings;
    }

    private async Task<Domain.Entities.File> SaveFileAsync(string path, IFormFile file, Domain.Entities.File.FileType fileType)
    {
      if (!Directory.Exists(path)) Directory.CreateDirectory(path);

      string filePath = Path.Combine(path, file.FileName);
      using (Stream fileStream = new FileStream(filePath, FileMode.Create))
      {
        await file.CopyToAsync(fileStream);
      }

      return new Domain.Entities.File()
      {
        Name = file.FileName,
        Path = filePath,
        Type = fileType,
        MimeType = MimeTypeMap.GetMimeType(file.FileName)
      };
    }
  }
}
