using NHibernate.Mapping.ByCode;
using NHibernate.Mapping.ByCode.Conformist;
using NHibernate.Type;

namespace CookingApi.Domain.Entities
{
  public class File : CoreEntity
  {
    public enum FileType { AuthorPhoto, Attachtment, SignAttachtment }
    public virtual string Name { get; set; }
    public virtual string Path { get; set; }
    public virtual FileType Type { get; set; }
    public virtual int? DossierId { get; set; }
    public virtual int? DossierDisproveId { get; set; }
    public virtual string MimeType { get; set; }
  }

  public class FileMap : ClassMapping<File>
  {
    public FileMap()
    {
      Table("dbo.[File]");
      Id(x => x.Id, map => map.Generator(Generators.Identity));
      Property(x => x.Name);
      Property(x => x.Path);
      Property(x => x.Type, attr => attr.Type<EnumStringType<File.FileType>>());
      Property(x => x.DossierId);
      Property(x => x.MimeType);
      Property(x => x.DossierDisproveId);
    }
  }
}
