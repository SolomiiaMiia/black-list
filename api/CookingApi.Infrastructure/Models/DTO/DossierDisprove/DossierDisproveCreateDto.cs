using System.Net;
using CookingApi.Infrastructure.Exceptions;
using Microsoft.AspNetCore.Http;

namespace CookingApi.Infrastructure.Models.DTO.DossierDisprove
{
  public class DossierDisproveCreateDto
  {
    public string Text { get; set; }
    public string Author { get; set; }
    public string? Phone { get; set; }
    public string? Email { get; set; }

    public List<IFormFile>? Attachtments { get; set; }
    public List<IFormFile> SignAttachtments { get; set; }

    public void Validate()
    {
      if (string.IsNullOrWhiteSpace(Text) || string.IsNullOrWhiteSpace(Author))
        throw new CookingException(HttpStatusCode.UnprocessableEntity, "Не валідні дані");

      if (this.Attachtments != null && this.Attachtments.Any(c => c.Length > 1024 * 1024 * 50))
      {
        throw new CookingException(HttpStatusCode.RequestEntityTooLarge, "Максимальний розмір одного файлу - 50МB");
      }
    }
  }
}
