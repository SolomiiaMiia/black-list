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

    public List<IFormFile> Attachtments { get; set; }
    public List<IFormFile> SignAttachtments { get; set; }

    public void Validate()
    {
      if (string.IsNullOrWhiteSpace(Text) || string.IsNullOrWhiteSpace(Author))
        throw new CookingException(HttpStatusCode.UnprocessableEntity, "Не валідні дані");
    }
  }
}
