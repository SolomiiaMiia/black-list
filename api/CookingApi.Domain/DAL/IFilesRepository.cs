using CookingApi.Domain.DAL.Base;
using File = CookingApi.Domain.Entities.File;

namespace CookingApi.Domain.DAL
{
  public interface IFilesRepository : IRepository<File>
  {
  }
}
