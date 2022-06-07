using System.Net;
using CookingApi.Infrastructure.Exceptions;

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
  
    public void Validate()
    {
      if (string.IsNullOrWhiteSpace(LastName) || string.IsNullOrWhiteSpace(FirstName) || string.IsNullOrWhiteSpace(ThirdName) || string.IsNullOrWhiteSpace(Address))
        throw new CookingException(HttpStatusCode.UnprocessableEntity, "Не валідні дані");
    }
  }
}
