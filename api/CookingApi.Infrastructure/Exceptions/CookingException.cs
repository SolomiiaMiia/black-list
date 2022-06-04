using System.Net;

namespace CookingApi.Infrastructure.Exceptions
{
    public class CookingException : Exception
    {
        public CookingException(HttpStatusCode statusCode, string message) : base(message)
        {
            StatusCode = statusCode;
        }

        public HttpStatusCode StatusCode { get; private set; }
    }
}
