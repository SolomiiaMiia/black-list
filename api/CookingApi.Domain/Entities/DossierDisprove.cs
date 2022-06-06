using NHibernate.Mapping.ByCode;
using NHibernate.Mapping.ByCode.Conformist;

namespace CookingApi.Domain.Entities
{
  public class DossierDisprove : CoreEntity
  {
    public virtual DateTime Date { get; set; }
    public virtual string Text { get; set; }  
    public virtual string Author { get; set; }
    public virtual string? Phone { get; set; }
    public virtual string? Email { get; set; }
  }

  public class DossierDisproveMap : ClassMapping<DossierDisprove>
  {
    public DossierDisproveMap()
    {
      Table("DossierDisprove"); 
      Id(x => x.Id, map => map.Generator(Generators.Identity));
      Property(x => x.Date);
      Property(x => x.Text);
      Property(x => x.Author);
      Property(x => x.Phone);
      Property(x => x.Email);
    }
  }
}
