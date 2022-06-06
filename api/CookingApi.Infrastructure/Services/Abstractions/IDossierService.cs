using CookingApi.Infrastructure.Models.DTO.Dossier;

namespace CookingApi.Infrastructure.Services.Abstractions
{
  public interface IDossierService
  {
    Task Create(DossierCreateDto dto, string webRootPath);
  }
}
