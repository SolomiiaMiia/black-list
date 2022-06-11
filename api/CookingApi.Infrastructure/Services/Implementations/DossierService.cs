using System.Linq.Expressions;
using System.Net;
using CookingApi.Domain.DAL.Base;
using CookingApi.Infrastructure.Exceptions;
using CookingApi.Infrastructure.Extensions;
using CookingApi.Infrastructure.Models.DTO.Dossier;
using CookingApi.Infrastructure.Models.DTO.DossierDisprove;
using CookingApi.Infrastructure.Models.DTO.ViewModels;
using CookingApi.Infrastructure.Services.Abstractions;
using Microsoft.AspNetCore.Http;
using MimeTypes;
using NHibernate;
using NHibernate.Linq;
using Dossier = CookingApi.Domain.Entities.Dossier;
using DossierDisprove = CookingApi.Domain.Entities.DossierDisprove;
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
        Author = "BlackList",
        Position = dto.Position,
        PlaceOfWork = dto.PlaceOfWork
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

      if (dossier.DossierDisprove is not null) throw new CookingException(HttpStatusCode.UnprocessableEntity, "Неможливо подати спростування досьє");

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
      dossier.Status = Dossier.DossierStatus.HasDisprove;
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
          if (dossier.Status != Dossier.DossierStatus.Disproved && dossier.Status != Dossier.DossierStatus.HasDisprove) throw new CookingException(HttpStatusCode.UnprocessableEntity, "Неможливо видалити спростування досьє");

          var files = await _unitOfWork.FilesRepository.Query().Where(c => c.DossierDisproveId == disproveDossier.Id).ToListAsync();
          foreach (var file in files)
          {
            await _unitOfWork.FilesRepository.Delete(file);
          }

          if (dossier.Type == Dossier.DossierType.DisprovePublished || dossier.Type == Dossier.DossierType.DisproveNew)
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
        DossierDisproveId = dossierDisproveId,
        MimeType = MimeTypeMap.GetMimeType(fileName)
      };
    }

    public async Task PublishDossierDisprove(int id)
    {
      var dossier = await _unitOfWork.DossiersRepository.Query().Fetch(c => c.DossierDisprove)
       .Where(c => c.Id == id).FirstOrDefaultAsync();
      if (dossier is not null)
      {
        if (dossier.DossierDisprove is null || dossier.Status == Dossier.DossierStatus.Disproved
         || dossier.Type == Dossier.DossierType.Declined || dossier.Type == Dossier.DossierType.DisprovePublished) throw new CookingException(HttpStatusCode.UnprocessableEntity, "Неможливо опублікувати спростування досьє");

        dossier.Status = Dossier.DossierStatus.Disproved;
        dossier.Type = Dossier.DossierType.DisprovePublished;
        dossier.DossierDisprove.Date = DateTime.Now;

        await _unitOfWork.DossiersRepository.Update(dossier);

        await _unitOfWork.CommitAsync();
      }
      else
      {
        throw new CookingException(HttpStatusCode.NotFound, "Досьє не знайдено");
      }
    }

    public async Task DenyDossierDisprove(int id)
    {
      var dossier = await _unitOfWork.DossiersRepository.Query().Fetch(c => c.DossierDisprove)
        .Where(c => c.Id == id).FirstOrDefaultAsync();
      if (dossier is not null)
      {
        if (dossier.DossierDisprove is null || dossier.Status == Dossier.DossierStatus.New ) throw new CookingException(HttpStatusCode.UnprocessableEntity, "Неможливо відхилити спростування досьє");

        dossier.Status = Dossier.DossierStatus.HasDisprove;
        dossier.Type = Dossier.DossierType.DisproveNew;

        await _unitOfWork.DossiersRepository.Update(dossier);

        await _unitOfWork.CommitAsync();
      }
      else
      {
        throw new CookingException(HttpStatusCode.NotFound, "Досьє не знайдено");
      }
    }

    private Expression<Func<Dossier, bool>> searchPredicate = c => c.Type == Dossier.DossierType.Published || c.Type == Dossier.DossierType.DisprovePublished
      || (c.Status == Dossier.DossierStatus.HasDisprove && c.Type != Dossier.DossierType.Declined);

    public async Task<List<LatestDossier>> GetLatestDossiers(int take = 5)
    {
      return await _unitOfWork.DossiersRepository.Query().Where(searchPredicate)
        .OrderByDescending(c => c.Date).Take(take)
        .Select(c => new LatestDossier() { Id = c.Id, FullName = c.LastName + " " + c.FirstName + " " + c.ThirdName, Date = c.Date }).ToListAsync();
    }

    public async Task<Models.DTO.ViewModels.Dossier> GetDossier(int id, bool skipCheck = false)
    {
      var dossier = await _unitOfWork.DossiersRepository.Query().Fetch(c => c.DossierDisprove)
       .Where(c => c.Id == id).FirstOrDefaultAsync();
      if (dossier is not null)
      {
        if (!skipCheck && (dossier.Status == Dossier.DossierStatus.New || dossier.Type == Dossier.DossierType.Declined)) throw new CookingException(HttpStatusCode.UnprocessableEntity, "Досьє не опубліковане");

        var dossierFiles = await _unitOfWork.FilesRepository.Query().Where(c => c.DossierId == id).ToListAsync();

        var appBaseUrl = MyHttpContext.AppBaseUrl;

        var dossierViewModel = new Models.DTO.ViewModels.Dossier()
        {
          Id = dossier.Id,
          Address = dossier.Address,
          Author = dossier.Author,
          Date = dossier.Date,
          Email = dossier.Email,
          FirstName = dossier.FirstName,
          LastName = dossier.LastName,
          ThirdName = dossier.ThirdName,
          IsAnonymous = dossier.IsAnonymous,
          Phone = dossier.Phone,
          PlaceOfWork = dossier.PlaceOfWork,
          Position = dossier.Position,
          Status = dossier.Status,
          Type = dossier.Type,
          Text = dossier.Text,
          DisproveDossier = dossier.DossierDisprove != null ? new Models.DTO.ViewModels.DossierDisprove()
          {
            Author = dossier.DossierDisprove.Author,
            Date = dossier.DossierDisprove.Date,
            Text = dossier.DossierDisprove.Text,
            Email = dossier.DossierDisprove.Email,
            Phone = dossier.DossierDisprove.Phone,
            DossierFiles = await _unitOfWork.FilesRepository.Query().Where(c => c.DossierDisproveId == dossier.DossierDisprove.Id)
            .Select(c => new Models.DTO.ViewModels.File()
            {
              Name = c.Name,
              Url = $"{appBaseUrl}/api/dossier/files/{c.Id}"
            }).ToListAsync()
          } : null,
          Photo = dossierFiles.Where(c => c.Type == File.FileType.AuthorPhoto).Select(c => new Models.DTO.ViewModels.File()
          {
            Name = c.Name,
            Url = $"{appBaseUrl}/api/dossier/files/{c.Id}"
          }).FirstOrDefault(),
          DossierFiles = dossierFiles.Where(c => c.Type == File.FileType.Attachtment).Select(c => new Models.DTO.ViewModels.File()
          {
            Name = c.Name,
            Url = $"{appBaseUrl}/api/dossier/files/{c.Id}"
          }).ToList()
        };

        return dossierViewModel;
      }
      else
      {
        throw new CookingException(HttpStatusCode.NotFound, "Досьє не знайдено");
      }
    }

    public async Task EditDossier(int id, DossierEditDto dto, string action)
    {
      var dossier = await _unitOfWork.DossiersRepository.Get(id);
      if (dossier is not null)
      {
        dossier.FirstName = dto.FirstName;
        dossier.LastName = dto.LastName;
        dossier.ThirdName = dto.ThirdName;
        dossier.Address = dto.Address;
        dossier.Position = dto.Position;
        dossier.PlaceOfWork = dto.PlaceOfWork;

        switch (action)
        {
          case "save":
            break;
          case "publish":
            dossier.Type = Dossier.DossierType.Published;
            break;
          case "decline":
            dossier.Type = Dossier.DossierType.Declined;
            break;
          default:
            throw new CookingException(HttpStatusCode.UnprocessableEntity, "Не валідні дані");
        }

        await _unitOfWork.DossiersRepository.Update(dossier);

        if (dto.AuthorPhoto is not null)
        {
          string pathToSave = Path.Combine(_webRootPath, "Dossiers");

          var oldPhoto = await _unitOfWork.FilesRepository.Query().Where(c => c.DossierId == id && c.Type == File.FileType.AuthorPhoto).FirstOrDefaultAsync();

          if (oldPhoto is not null)
          {
            if (System.IO.File.Exists(oldPhoto.Path)) System.IO.File.Delete(oldPhoto.Path);
            await _unitOfWork.FilesRepository.Delete(oldPhoto);
          }

          var file = await SaveFileAsync(pathToSave, dto.AuthorPhoto, File.FileType.AuthorPhoto, id, null);
          await _unitOfWork.FilesRepository.Add(file);
        }
        await _unitOfWork.CommitAsync();
      }
      else
      {
        throw new CookingException(HttpStatusCode.NotFound, "Досьє не знайдено");
      }
    }

    public async Task<List<Models.DTO.ViewModels.Dossier>> GetFeed(int skip)
    {
      var nextDossierId = await _unitOfWork.DossiersRepository.Query().Where(searchPredicate)
        .OrderByDescending(c => c.Date).Select(c => c.Id).Skip(skip).Take(1).FirstOrDefaultAsync();
      if (nextDossierId != 0) return new List<Models.DTO.ViewModels.Dossier>() { await this.GetDossier(nextDossierId, true) };
      else return new List<Models.DTO.ViewModels.Dossier>();
    }

    public async Task<(string, string)> GetFilePath(int id, bool skipCheck = false)
    {
      var file = await _unitOfWork.FilesRepository.Query().Where(c => c.Id == id).FirstOrDefaultAsync();
      if (file is not null)
      {
        if (!skipCheck)
        {
          var dossier = file.DossierId.HasValue ? await _unitOfWork.DossiersRepository.Get(file.DossierId.Value) : await _unitOfWork.DossiersRepository.Query().Fetch(c => c.DossierDisprove)
              .Where(c => c.DossierDisprove != null && c.DossierDisprove.Id == file.DossierDisproveId.Value).FirstOrDefaultAsync();
          if (dossier.Type == Dossier.DossierType.Declined || dossier.Type == Dossier.DossierType.New) throw new CookingException(HttpStatusCode.UnprocessableEntity, "Досьє не опубліковане");

        }

        return (file.Path, file.MimeType);
      }
      else
      {
        throw new CookingException(HttpStatusCode.NotFound, "Файл не знайдено");
      }
    }

    public async Task<List<DossierSearch>> SearchDossier(string searchText, Dossier.DossierType type, bool skipCheck = false)
    {
      var dossierQuery = _unitOfWork.DossiersRepository.Query();

      switch (type, skipCheck)
      {
        case (Dossier.DossierType.New, true):
          dossierQuery = dossierQuery.Where(c => c.Type == Dossier.DossierType.New || c.Type == Dossier.DossierType.DisproveNew);
          break;
        case (Dossier.DossierType.Published, true):
        case (Dossier.DossierType.Published, false):
          dossierQuery = dossierQuery.Where(c => c.Type == Dossier.DossierType.Published || c.Type == Dossier.DossierType.DisprovePublished);
          break;
        case (Dossier.DossierType.Declined, true):
          dossierQuery = dossierQuery.Where(c => c.Type == Dossier.DossierType.Declined);
          break;
        default:
          throw new CookingException(HttpStatusCode.Unauthorized, "Недостатньо прав для здійснення операції");
      }

      var appBaseUrl = MyHttpContext.AppBaseUrl;

      var dossiers = await dossierQuery.Where(c => c.LastName.Contains(searchText) || c.FirstName.Contains(searchText)
     || c.ThirdName.Contains(searchText) || c.Address.Contains(searchText)).OrderByDescending(c => c.Date).Select(c => new DossierSearch()
     {
       Address = c.Address,
       Date = c.Date,
       Id = c.Id,
       FullName = c.LastName + " " + c.FirstName + " " + c.ThirdName,
       PlaceOfWork = c.PlaceOfWork,
       Position = c.Position,
       Status = c.Status,
       Type = c.Type
     }).ToListAsync();

      var ids = dossiers.Select(c => c.Id).ToList();

      var files = await _unitOfWork.FilesRepository.Query().Where(c => c.DossierId != null && ids.Contains(c.DossierId.Value) && c.Type == File.FileType.AuthorPhoto)
         .Select(c => new
         {
           Id = c.DossierId.Value,
           Name = c.Name,
           Url = $"{appBaseUrl}/api/dossier/files/{c.Id}"
         }).ToListAsync();


      dossiers.ForEach(c =>
      {
        var file = files.FirstOrDefault(d => d.Id == c.Id);
        if (file != null)
        {
          c.Photo = new Models.DTO.ViewModels.File()
          {
            Name = file.Name,
            Url = file.Url,
          };
        }

      });

      return dossiers;
    }
  }
}
