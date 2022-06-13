namespace CookingApi.Infrastructure.Models.DTO.ViewModels
{
  public class Settings
  {
    public virtual string VideoLink { get; set; }
    public virtual string NewDossierText { get; set; }
    public virtual string DisproveDossierText { get; set; }
    public List<File>? Pictures { get; set; }
  }
}
