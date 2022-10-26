using CookingApi.Domain.DAL;
using CookingApi.Domain.Entities;
using CookingApi.Infrastructure.DAL.Base;
using NHibernate;

namespace CookingApi.Infrastructure.DAL
{
  public class RelatedDossiersRepository : BaseRepository<RelatedDossier>, IRelatedDossiersRepository
  {
    public RelatedDossiersRepository(ISession session) : base(session)
    {
    }
  }
}
