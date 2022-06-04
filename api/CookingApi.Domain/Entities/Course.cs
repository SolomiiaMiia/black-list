using NHibernate.Mapping.ByCode;
using NHibernate.Mapping.ByCode.Conformist;

namespace CookingApi.Domain.Entities
{
    public class Course : CoreEntity
    {
        public virtual string? Title { get; set; }
        public virtual string? ShortDescription { get; set; }
        public virtual string? Description { get; set; }
        public virtual decimal Price { get; set; }
        public virtual DateTime? Date { get; set; }
        public virtual bool IsDeleted { get; set; }
    }

    public class CourseMap : ClassMapping<Course>
    {
        public CourseMap()
        {
            Table("Courses");
            Id(x => x.Id, m => m.Generator(Generators.GuidComb));
            Property(x => x.CreationDate);
            Property(x => x.Title);
            Property(x => x.ShortDescription);
            Property(x => x.Description);
            Property(x => x.Price);
            Property(x => x.Date);
            Property(x => x.IsDeleted);
        }
    }
}
