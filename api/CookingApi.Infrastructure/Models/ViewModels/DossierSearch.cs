using Newtonsoft.Json;
using static CookingApi.Domain.Entities.Dossier;
using JsonIgnoreAttribute = Newtonsoft.Json.JsonIgnoreAttribute;

namespace CookingApi.Infrastructure.Models.DTO.ViewModels
{
  public class DossierSearch
  {
    public int Id { get; set; }
    public string FullName { get; set; }
    public string? Position { get; set; }
    public string? PlaceOfWork { get; set; }
    public string Address { get; set; }
    public DateTime Date { get; set; }
    public DossierStatus Status { get; set; }
    public DossierType Type { get; set; }
    public File? Photo { get; set; }
    public string[]? Tags { get; set; }

    //[JsonProperty("taglist")]
    [JsonIgnore]
    public string? tags { get; set; }
  }
}
