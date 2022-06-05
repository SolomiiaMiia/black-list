using CookingApi.Domain.DAL;
using CookingApi.Domain.Entities;
using CookingApi.Infrastructure.DAL.Base;
using NHibernate;

namespace CookingApi.Infrastructure.DAL
{
  public class DossierDisproveRepository : BaseRepository<DossierDisprove>, IDossierDisproveRepository
  {
    public DossierDisproveRepository(ISession session) : base(session)
    {
    }
  }
}
