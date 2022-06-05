namespace CookingApi.Domain.DAL.Base
{
  public interface IUnitOfWork
  {
    IFilesRepository FilesRepository { get; }
    IDossiersRepository DossiersRepository { get; }
    IDossierDisproveRepository DossierDisproveRepository { get; }
    ISettingsRepository SettingsRepository { get; }
    Task CommitAsync();
  }
}
