using NHibernate.Mapping.ByCode;
using NHibernate.Mapping.ByCode.Conformist;

namespace CookingApi.Domain.Entities
{
  public class Setting : CoreEntity
  {

    public virtual string VideoLink { get; set; }
    public virtual string NewDossierText { get; set; }
    public virtual string DisproveDossierText { get; set; }
  }

  public class SettingMap : ClassMapping<Setting>
  {
    public SettingMap()
    {
      Table("Settings");
      Id(x => x.Id, m => m.Generator(Generators.GuidComb));
      Property(x => x.VideoLink);
      Property(x => x.NewDossierText);
      Property(x => x.DisproveDossierText);
      Property(x => x.CreationDate);
    }
  }
}
