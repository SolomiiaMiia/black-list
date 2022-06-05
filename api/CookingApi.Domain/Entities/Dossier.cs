using NHibernate.Mapping.ByCode;
using NHibernate.Mapping.ByCode.Conformist;
using NHibernate.Type;

namespace CookingApi.Domain.Entities
{
  public class Dossier : CoreEntity
  {
    public enum DossierStatus { New, Disproved }
    public enum DossierType
    {
      All = 0,
      New = 1,
      Published = 2,
      Declined = 3,
      DisproveNew = 4,
      DisprovePublished = 5,
    }
    public virtual string LastName { get; set; }
    public virtual string FirstName { get; set; }
    public virtual string ThirdName { get; set; }
    public virtual string Position { get; set; }
    public virtual string PlaceOfWork { get; set; }
    public virtual string Address { get; set; }
    public virtual DateTime Date { get; set; }
    public virtual string Text { get; set; }
    public virtual bool IsAnonymous { get; set; }
    public virtual string Author { get; set; }
    public virtual string Phone { get; set; }
    public virtual string Email { get; set; }

    public virtual DossierStatus Status { get; set; }
    public virtual DossierType Type { get; set; }

    public virtual DossierDisprove? DossierDisprove { get; set; }
  }

  public class DossierMap : ClassMapping<Dossier>
  {
    public DossierMap()
    {
      Table("Dossier");
      Id(x => x.Id, map => map.Generator(Generators.Identity));
      Property(x => x.LastName);
      Property(x => x.FirstName);
      Property(x => x.ThirdName);
      Property(x => x.Position);
      Property(x => x.PlaceOfWork);
      Property(x => x.Address);
      Property(x => x.Date);
      Property(x => x.Text);
      Property(x => x.IsAnonymous);
      Property(x => x.Author);
      Property(x => x.Phone);
      Property(x => x.Email);
      Property(x => x.Status, attr => attr.Type<EnumStringType<Dossier.DossierStatus>>());
      Property(x => x.Type, attr => attr.Type<EnumStringType<Dossier.DossierType>>());
      OneToOne(x => x.DossierDisprove, d => d.ForeignKey("DisproveDossierId"));
    }
  }
}
