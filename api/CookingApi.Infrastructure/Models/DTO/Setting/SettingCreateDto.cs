using System.Net;
using CookingApi.Infrastructure.Exceptions;
using Microsoft.AspNetCore.Http;

namespace CookingApi.Infrastructure.Models.DTO.Setting
{
  public class SettingCreateDto
  {
    public virtual string VideoLink { get; set; }
    public virtual string NewDossierText { get; set; }
    public virtual string DisproveDossierText { get; set; }

    public List<IFormFile>? Attachtments { get; set; }

    public void Validate()
    {
      if (string.IsNullOrWhiteSpace(VideoLink) || string.IsNullOrWhiteSpace(NewDossierText) || string.IsNullOrWhiteSpace(DisproveDossierText))
        throw new CookingException(HttpStatusCode.UnprocessableEntity, "Не валідні дані");
    }
  }
}
