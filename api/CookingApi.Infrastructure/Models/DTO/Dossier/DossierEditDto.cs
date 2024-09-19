using System.Net;
using CookingApi.Infrastructure.Exceptions;
using Microsoft.AspNetCore.Http;

namespace CookingApi.Infrastructure.Models.DTO.Dossier
{
  public class DossierEditDto
  {
    public string LastName { get; set; }
    public string FirstName { get; set; }
    public string ThirdName { get; set; }
    public string? Position { get; set; }
    public string? PlaceOfWork { get; set; }
    public string Address { get; set; }
    public string Region { get; set; }
    public string Locality { get; set; }
    public IFormFile? AuthorPhoto { get; set; }
    public string? Tags { get; set; }
    public List<int>? RelatedDossiers { get; set; }

    public void Validate()
    {
      if (string.IsNullOrWhiteSpace(LastName) || string.IsNullOrWhiteSpace(FirstName) || string.IsNullOrWhiteSpace(ThirdName) || string.IsNullOrWhiteSpace(Address))
        throw new CookingException(HttpStatusCode.UnprocessableEntity, "Не валідні дані");
    }
  }
}
