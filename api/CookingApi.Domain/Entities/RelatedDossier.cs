using CookingApi.Domain.Helpers;
using NHibernate.Mapping.ByCode.Conformist;

namespace CookingApi.Domain.Entities
{
  public class RelatedDossier : CoreEntity
  {
    public virtual int DossierId { get; set; }
    //public virtual int RelatedDossierId { get; set; }
    public virtual Dossier RelatedDossierEntity { get; set; }

    public override bool Equals(object? other)
    {
      return ReferenceEquals(this, other)
                   || other is RelatedDossier toCompare
                   && this.DossierId.Equals(toCompare.DossierId)
                   && this.RelatedDossierEntity.Id.Equals(toCompare.RelatedDossierEntity.Id);
    }

    public override int GetHashCode()
    {
      return HashCodeHelper.GetJonSkeetHashCode(this.DossierId, this.RelatedDossierEntity.Id);
    }
  }

  public class RelatedDossierMap : ClassMapping<RelatedDossier>
  {
    public RelatedDossierMap()
    {
      Table("RelatedDossier");
      ComposedId(map =>
      {
        map.Property(p => p.DossierId);
       // map.Property(p => p.RelatedDossierId);

        map.ManyToOne(x => x.RelatedDossierEntity, m =>
        {
          m.Column("RelatedDossierId");
          m.NotNullable(true);
        });

        //ManyToOne(x => x.RelatedDossierEntity, map =>
        //{
        //  map.Column("RelatedDossierId");
        //  map.NotNullable(true);
        //});
      });

     

    }
  }
}
