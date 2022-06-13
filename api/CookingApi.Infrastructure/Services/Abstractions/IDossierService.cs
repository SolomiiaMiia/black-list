using CookingApi.Infrastructure.Models.DTO.Dossier;
using CookingApi.Infrastructure.Models.DTO.DossierDisprove;
using CookingApi.Infrastructure.Models.DTO.ViewModels;
using static CookingApi.Domain.Entities.Dossier;

namespace CookingApi.Infrastructure.Services.Abstractions
{
  public interface IDossierService
  {
    Task<int> CreateDossier(DossierCreateDto dto);
    Task DeleteDossier(int id);
    void SetWebRootPath(string webRootPath);
    Task<int> CreateDossierDisprove(int id, DossierDisproveCreateDto dto);
    Task DeleteDossierDisprove(int id);
    Task PublishDossierDisprove(int id);
    Task DenyDossierDisprove(int id);
    Task<List<LatestDossier>> GetLatestDossiers(int take = 5);
    Task<Dossier> GetDossier(int id, bool skipCheck = false);
    Task EditDossier(int id, DossierEditDto dto, string action);
    Task<List<Dossier>> GetFeed(int skip);
    Task<(string path, string mime)> GetFilePath(int id, bool skipCheck = false);
    Task<List<DossierSearch>> SearchDossier(string searchText, DossierType type, bool skipCheck = false);
  }
}
