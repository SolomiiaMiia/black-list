namespace CookingApi.Infrastructure.Models.DTO.ViewModels
{
  public class DossierDisprove
  {
    public string Text { get; set; }
    public string Author { get; set; }
    public string? Phone { get; set; }
    public string? Email { get; set; }
    public DateTime Date { get; set; }

    public List<File>? DossierFiles { get; set; }

  }
}
