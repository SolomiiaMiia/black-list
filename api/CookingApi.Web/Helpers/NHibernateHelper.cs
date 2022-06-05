using CookingApi.Domain.Entities;
using CookingApi.Infrastructure.DAL.NhListeners;
using NHibernate.Dialect;
using NHibernate.Driver;
using NHibernate.Mapping.ByCode;

namespace CookingApi.Web.Helpers
{
  public static class NHibernateHelper
  {
    public static void Initialize(string dbConnectionName, WebApplicationBuilder builder)
    {
      var nhConfig = new NHibernate.Cfg.Configuration();

      nhConfig.DataBaseIntegration((x) =>
      {
        x.ConnectionString = builder.Configuration.GetConnectionString(dbConnectionName);
        x.Driver<SqlClientDriver>();
        x.Dialect<MsSql2012Dialect>();
      });

      // nhConfig.EventListeners.PreInsertEventListeners = new[] { new SetCreationDateEventListener() };

      var mapper = new ModelMapper();
      mapper.AddMapping(typeof(SettingMap));
      mapper.AddMapping(typeof(FileMap));
      mapper.AddMapping(typeof(DossierMap));
      mapper.AddMapping(typeof(DossierDisproveMap));

      var mappings = mapper.CompileMappingForAllExplicitlyAddedEntities();
      nhConfig.AddMapping(mappings);

      var sessionFactory = nhConfig.BuildSessionFactory();

      if (sessionFactory is null)
        throw new Exception("session_factory_build_failed");

      builder.Services.AddSingleton(sessionFactory);
      builder.Services.AddScoped(x => sessionFactory.OpenSession());
    }
  }
}
