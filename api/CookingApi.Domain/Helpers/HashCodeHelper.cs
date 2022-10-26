namespace CookingApi.Domain.Helpers
{
  public static class HashCodeHelper
  {
    // <summary>
    /// Gets a hash code for given fields
    /// See http:// stackoverflow.com/questions/263400/what-is-the-best-algorithm-for-an-overridden-system-object-gethashcode
    /// </summary>
    /// <param name="fields">The fields to create hash code for</param>
    /// <returns>An integer hash code</returns>
    public static int GetJonSkeetHashCode(params object[] fields)
    {
      return fields.Aggregate(17, (hashSoFar, field) => (23 * hashSoFar) + (field ?? 0).GetHashCode());
    }
  }
}
