using CookingApi.Domain.DAL.Base;
using CookingApi.Domain.Entities;
using CookingApi.Infrastructure.Models.DTO.Dossier;
using CookingApi.Infrastructure.Services.Abstractions;
using Microsoft.AspNetCore.Http;
using File = CookingApi.Domain.Entities.File;

namespace CookingApi.Infrastructure.Services.Implementations
{
  public class DossierService : IDossierService
  {
    private readonly IUnitOfWork _unitOfWork;

    public DossierService(IUnitOfWork unitOfWork)
    {
      _unitOfWork = unitOfWork;
    }

    public async Task Create(DossierCreateDto dto, string webRootPath)
    {
      var dossier = new Dossier()
      {
        Address = dto.Address,
        Date = DateTime.Now,
        FirstName = dto.FirstName,
        LastName = dto.LastName,
        ThirdName = dto.ThirdName,
        IsAnonymous = dto.IsAnonymous,
        Text = dto.Text,
        Status = Dossier.DossierStatus.New,
        Type = Dossier.DossierType.New,
        Author = "BlackList"
      };

      if (!dossier.IsAnonymous)
      {
        dossier.Author = dto.Author;
        dossier.Phone = dto.Phone;
        dossier.Email = dto.Email;
      }

      var id = await _unitOfWork.DossiersRepository.Add(dossier);

      string pathToSave = Path.Combine(webRootPath, "Dossiers");
      if(dto.AuthorPhoto is not null)
      {
        var file = await SaveFileAsync(pathToSave, dto.AuthorPhoto, File.FileType.AuthorPhoto, id, null);
        await _unitOfWork.FilesRepository.Add(file);
      }

      foreach(var formFile in dto.Attachtments)
      {
        var file = await SaveFileAsync(pathToSave, formFile, File.FileType.Attachtment, id, null);
        await _unitOfWork.FilesRepository.Add(file);
      }

      await _unitOfWork.CommitAsync();
    }

    private async Task<File> SaveFileAsync(string path, IFormFile file, File.FileType fileType, int? dossierId, int? dossierDisproveId)
    {
      var dossierPath = Path.Combine(path, dossierId.ToString());
      if (!Directory.Exists(dossierPath))  Directory.CreateDirectory(dossierPath);

      string fileName = fileType == File.FileType.AuthorPhoto ? "фото" + Path.GetExtension(file.FileName) : file.FileName;
      string filePath = Path.Combine(dossierPath, fileName);
      using (Stream fileStream = new FileStream(filePath, FileMode.Create))
      {
        await file.CopyToAsync(fileStream);
      }

      return new File()
      {
        Name = fileName,
        Path = filePath,
        Type = fileType,
        DossierId = dossierId,
        DossierDisproveId = dossierDisproveId
      };
    }

  }
}
