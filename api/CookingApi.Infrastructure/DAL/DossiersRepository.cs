using CookingApi.Domain.DAL;
using CookingApi.Domain.Entities;
using CookingApi.Infrastructure.DAL.Base;
using NHibernate;

namespace CookingApi.Infrastructure.DAL
{
  public class DossiersRepository : BaseRepository<Dossier>, IDossiersRepository
  {
    public DossiersRepository(ISession session) : base(session)
    {
    }
  }
}
