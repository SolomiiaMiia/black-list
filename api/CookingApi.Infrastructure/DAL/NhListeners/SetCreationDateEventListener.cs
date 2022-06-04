using CookingApi.Domain.Entities;
using NHibernate.Event;
using NHibernate.Persister.Entity;

namespace CookingApi.Infrastructure.DAL.NhListeners
{
    public class SetCreationDateEventListener : IPreInsertEventListener
    {
        public bool OnPreInsert(PreInsertEvent @event)
        {
            throw new NotImplementedException();
        }

        public Task<bool> OnPreInsertAsync(PreInsertEvent @event, CancellationToken cancellationToken)
        {
            var entity = @event.Entity as CoreEntity;

            if (entity is null)
                return Task.FromResult(false);

            entity.CreationDate = DateTime.UtcNow;

            Set(@event.Persister, @event.State, nameof(CoreEntity.CreationDate), entity.CreationDate);

            return Task.FromResult(false);
        }

        private void Set(IEntityPersister persister, object[] state, string propertyName, object value)
        {
            var index = Array.IndexOf(persister.PropertyNames, propertyName);
            
            if (index == -1)
                return;

            state[index] = value;
        }
    }
}
