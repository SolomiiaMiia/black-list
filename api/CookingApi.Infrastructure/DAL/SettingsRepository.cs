using CookingApi.Domain.DAL;
using CookingApi.Domain.Entities;
using CookingApi.Infrastructure.DAL.Base;
using NHibernate;

namespace CookingApi.Infrastructure.DAL
{
    public class SettingsRepository : BaseRepository<Setting>, ISettingsRepository
  {
        public SettingsRepository(ISession session) : base(session)
        {
        }
    }
}
