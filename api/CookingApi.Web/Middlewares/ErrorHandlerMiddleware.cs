using System.Net;
using System.Text.Json;
using CookingApi.Infrastructure.Exceptions;

namespace CookingApi.Web.Middlewares
{
    public class ErrorHandlerMiddleware
    {
        private readonly RequestDelegate _next;

        public ErrorHandlerMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (CookingException ourException)
            {
                var errorId = await HandleError(context, ourException.StatusCode, ourException.Message);

                // TODO: Log error with ID
            }
            catch (Exception exception)
            {
                var errorId = await HandleError(context, HttpStatusCode.InternalServerError, "internal_server_error");

                // TODO: Log error with ID
            }
        }

        private class ErrorResponse
        {
            public string? Message { get; set; }
            public Guid ErrorId { get; set; }
        }

        private async Task<Guid> HandleError(HttpContext context, HttpStatusCode statusCode, string message)
        {
            var response = context.Response;
            var errorId = Guid.NewGuid();

            response.StatusCode = (int)statusCode;

            var result = JsonSerializer.Serialize(new ErrorResponse
            {
                Message = message,
                ErrorId = errorId
            });

            await response.WriteAsync(result);

            return errorId;
        }
    }
}
