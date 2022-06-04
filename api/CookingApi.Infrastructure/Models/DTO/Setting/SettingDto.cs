using System.Net;
using CookingApi.Infrastructure.Exceptions;

namespace CookingApi.Infrastructure.Models.DTO.Setting
{
  public class SettingDto
  {
    public virtual string VideoLink { get; set; }
    public virtual string NewDossierText { get; set; }
    public virtual string DisproveDossierText { get; set; }

    public void Validate()
    {
      if (string.IsNullOrWhiteSpace(VideoLink) || string.IsNullOrWhiteSpace(NewDossierText) || string.IsNullOrWhiteSpace(DisproveDossierText))
        throw new CookingException(HttpStatusCode.UnprocessableEntity, "Не валідні дані");
    }
  }
}
