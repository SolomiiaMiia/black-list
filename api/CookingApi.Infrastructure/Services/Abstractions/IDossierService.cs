using CookingApi.Infrastructure.Models.DTO.Dossier;
using CookingApi.Infrastructure.Models.DTO.DossierDisprove;

namespace CookingApi.Infrastructure.Services.Abstractions
{
  public interface IDossierService
  {
    Task CreateDossier(DossierCreateDto dto);
    Task Delete(int id);
    void SetWebRootPath(string webRootPath);
    Task CreateDossierDisprove(int id, DossierDisproveCreateDto dto);
  }
}
