using CookingApi.Infrastructure.Models.ViewModels;
using static CookingApi.Domain.Entities.Dossier;

namespace CookingApi.Infrastructure.Models.DTO.ViewModels
{
  public class Dossier
  {
    public int Id { get; set; }
    public string LastName { get; set; }
    public string FirstName { get; set; }
    public string ThirdName { get; set; }
    public string? Position { get; set; }
    public string? PlaceOfWork { get; set; }
    public string Address { get; set; }
    public string Region { get; set; }
    public string Locality { get; set; }
    public string Text { get; set; }
    public bool IsAnonymous { get; set; }
    public string? Author { get; set; }
    public string? Phone { get; set; }
    public string? Email { get; set; }
    public DateTime Date { get; set; }
    public DossierStatus Status { get; set; }
    public DossierType Type { get; set; }

    public File? Photo { get; set; }
    public List<File>? DossierFiles { get; set; }

    public DossierDisprove? DisproveDossier { get; set; }
    public string[]? Tags { get; set; }
    public List<RelatedDossierModel>? RelatedDossiers { get; set; }
  }
}
