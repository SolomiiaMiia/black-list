using System.Net;
using CookingApi.Infrastructure.Exceptions;
using Microsoft.AspNetCore.Http;

namespace CookingApi.Infrastructure.Models.DTO.Dossier
{
  public class DossierCreateDto
  {
    public string LastName { get; set; }
    public string FirstName { get; set; }
    public string ThirdName { get; set; }
    public string? Position { get; set; }
    public string? PlaceOfWork { get; set; }
    public string Address { get; set; }
    public string Text { get; set; }
    public bool IsAnonymous { get; set; }
    public string? Author { get; set; }
    public string? Phone { get; set; }
    public string? Email { get; set; }

    public IFormFile? AuthorPhoto { get; set; }
    public List<IFormFile> Attachtments { get; set; }
    public List<IFormFile>? SignAttachtments { get; set; }

    public void Validate()
    {
      if (string.IsNullOrWhiteSpace(LastName) || string.IsNullOrWhiteSpace(FirstName) || string.IsNullOrWhiteSpace(ThirdName) || string.IsNullOrWhiteSpace(Address)
        || string.IsNullOrWhiteSpace(Text) || (IsAnonymous ? false : string.IsNullOrWhiteSpace(Author)))
        throw new CookingException(HttpStatusCode.UnprocessableEntity, "Не валідні дані");

      if (this.Attachtments != null && this.Attachtments.Any(c => c.Length > 1024 * 1024 * 10))
      {
        throw new CookingException(HttpStatusCode.RequestEntityTooLarge, "Максимальний розмір одного файлу - 10МB");
      }
    }
  }
}
