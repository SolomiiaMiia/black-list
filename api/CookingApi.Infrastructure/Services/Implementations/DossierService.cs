using System.Net;
using CookingApi.Domain.DAL.Base;
using CookingApi.Domain.Entities;
using CookingApi.Infrastructure.Exceptions;
using CookingApi.Infrastructure.Models.DTO.Dossier;
using CookingApi.Infrastructure.Models.DTO.DossierDisprove;
using CookingApi.Infrastructure.Services.Abstractions;
using Microsoft.AspNetCore.Http;
using NHibernate;
using NHibernate.Linq;
using File = CookingApi.Domain.Entities.File;

namespace CookingApi.Infrastructure.Services.Implementations
{
  public class DossierService : IDossierService
  {
    private readonly IUnitOfWork _unitOfWork;
    private string _webRootPath;

    public DossierService(IUnitOfWork unitOfWork)
    {
      _unitOfWork = unitOfWork;
    }

    public void SetWebRootPath(string webRootPath) => _webRootPath = webRootPath;

    public async Task CreateDossier(DossierCreateDto dto)
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

      string pathToSave = Path.Combine(_webRootPath, "Dossiers");
      if (dto.AuthorPhoto is not null)
      {
        var file = await SaveFileAsync(pathToSave, dto.AuthorPhoto, File.FileType.AuthorPhoto, id, null);
        await _unitOfWork.FilesRepository.Add(file);
      }

      foreach (var formFile in dto.Attachtments)
      {
        var file = await SaveFileAsync(pathToSave, formFile, File.FileType.Attachtment, id, null);
        await _unitOfWork.FilesRepository.Add(file);
      }

      await _unitOfWork.CommitAsync();
    }

    public async Task CreateDossierDisprove(int id, DossierDisproveCreateDto dto)
    {
      var dossier = await _unitOfWork.DossiersRepository.Query().Where(c => c.Id == id).Fetch(c => c.DossierDisprove).FirstOrDefaultAsync();

      if (dossier is null) throw new CookingException(HttpStatusCode.NotFound, "Досьє не знайдено");

      if (dossier.DossierDisprove is not null || dossier.Status == Dossier.DossierStatus.Disproved
        || dossier.Type == Dossier.DossierType.Declined) throw new CookingException(HttpStatusCode.UnprocessableEntity, "Неможливо подати спростування досьє");

      var dossierDisprove = new DossierDisprove()
      {
        Author = dto.Author,
        Phone = dto.Phone,
        Email = dto.Email,
        Date = DateTime.Now,
        Text = dto.Text
      };

      var dossierDisproveId = await _unitOfWork.DossierDisproveRepository.Add(dossierDisprove);

      dossier.Type = Dossier.DossierType.DisproveNew;
      dossier.DossierDisprove = dossierDisprove;

      await _unitOfWork.DossiersRepository.Update(dossier);

      string pathToSave = Path.Combine(_webRootPath, "Dossiers");
      foreach (var formFile in dto.Attachtments)
      {
        var file = await SaveFileAsync(pathToSave, formFile, File.FileType.Attachtment, id, dossierDisproveId);
        await _unitOfWork.FilesRepository.Add(file);
      }

      await _unitOfWork.CommitAsync();

    }

    public async Task DeleteDossier(int id)
    {
      var dossier = await _unitOfWork.DossiersRepository.Query().Fetch(c => c.DossierDisprove).Where(c => c.Id == id).FirstOrDefaultAsync();
      if (dossier is not null)
      {

        var disproveDossier = dossier.DossierDisprove;

        var files = await _unitOfWork.FilesRepository.Query().Where(c => c.DossierId == id).ToListAsync();
        foreach (var file in files)
        {
          await _unitOfWork.FilesRepository.Delete(file);
        }

        if (disproveDossier is not null)
        {
          files = await _unitOfWork.FilesRepository.Query().Where(c => c.DossierDisproveId == disproveDossier.Id).ToListAsync();
          foreach (var file in files)
          {
            await _unitOfWork.FilesRepository.Delete(file);
          }
          await _unitOfWork.DossierDisproveRepository.Delete(disproveDossier);
        }

        var dossierPath = Path.Combine(_webRootPath, "Dossiers", id.ToString());

        if (Directory.Exists(dossierPath)) Directory.Delete(dossierPath, true);

        await _unitOfWork.DossiersRepository.Delete(dossier);

        await _unitOfWork.CommitAsync();
      }
      else
      {
        throw new CookingException(HttpStatusCode.NotFound, "Досьє не знайдено");
      }
    }

    public async Task DeleteDossierDisprove(int id)
    {
      var dossier = await _unitOfWork.DossiersRepository.Query().Fetch(c => c.DossierDisprove)
        .Where(c => c.Id == id).FirstOrDefaultAsync();
      if (dossier is not null)
      {

        var disproveDossier = dossier.DossierDisprove;


        if (disproveDossier is not null)
        {
          var files = await _unitOfWork.FilesRepository.Query().Where(c => c.DossierDisproveId == disproveDossier.Id).ToListAsync();
          foreach (var file in files)
          {
            await _unitOfWork.FilesRepository.Delete(file);
          }

          if(dossier.Type == Dossier.DossierType.DisprovePublished || dossier.Type == Dossier.DossierType.DisproveNew)
          {
            dossier.Type = Dossier.DossierType.Published;
          }

          dossier.Status = Dossier.DossierStatus.New;
          dossier.DossierDisprove = null;
          await _unitOfWork.DossiersRepository.Update(dossier);

          await _unitOfWork.DossierDisproveRepository.Delete(disproveDossier);

          var dossierDisprovePath = Path.Combine(_webRootPath, "Dossiers", id.ToString(), "Disprove");

          if (Directory.Exists(dossierDisprovePath)) Directory.Delete(dossierDisprovePath, true);

          await _unitOfWork.CommitAsync();
        }
        else
        {
          throw new CookingException(HttpStatusCode.NotFound, "Спростування досьє не знайдено");
        }

      }
      else
      {
        throw new CookingException(HttpStatusCode.NotFound, "Спростування досьє не знайдено");
      }
    }

    private async Task<File> SaveFileAsync(string path, IFormFile file, File.FileType fileType, int? dossierId, int? dossierDisproveId)
    {
      var dossierPath = Path.Combine(path, dossierId.ToString());
      if (!Directory.Exists(dossierPath)) Directory.CreateDirectory(dossierPath);

      if (dossierDisproveId is not null)
      {
        var dossierDisprovePath = Path.Combine(dossierPath, "Disprove");
        if (!Directory.Exists(dossierDisprovePath)) Directory.CreateDirectory(dossierDisprovePath);
        dossierPath = dossierDisprovePath;
        dossierId = null;
      }

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
