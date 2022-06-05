using CookingApi.Domain.DAL;
using CookingApi.Infrastructure.DAL.Base;
using NHibernate;
using File = CookingApi.Domain.Entities.File;

namespace CookingApi.Infrastructure.DAL
{
  public class FilesRepository : BaseRepository<File>, IFilesRepository
  {
        public FilesRepository(ISession session) : base(session)
        {
        }
    }
}
