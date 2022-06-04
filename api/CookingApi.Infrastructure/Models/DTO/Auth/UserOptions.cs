namespace CookingApi.Infrastructure.Models.DTO.Auth
{
  public class UserOptions
  {
    public User[] allowed { get; set; }
  }

  public class User
  {
    public string Name { get; set; }
    public string Password { get; set; }
    public string Token { get; set; }
    public string Role { get; set; }
  }
}
