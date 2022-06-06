using CookingApi.Infrastructure.Models.DTO.Dossier;
using CookingApi.Infrastructure.Models.DTO.DossierDisprove;
using CookingApi.Infrastructure.Models.DTO.ViewModels;

namespace CookingApi.Infrastructure.Services.Abstractions
{
  public interface IDossierService
  {
    Task CreateDossier(DossierCreateDto dto);
    Task DeleteDossier(int id);
    void SetWebRootPath(string webRootPath);
    Task CreateDossierDisprove(int id, DossierDisproveCreateDto dto);
    Task DeleteDossierDisprove(int id);
    Task PublishDossierDisprove(int id);
    Task DenyDossierDisprove(int id);
    Task<List<LatestDossier>> GetLatestDossiers(int take = 5);
  }
}
