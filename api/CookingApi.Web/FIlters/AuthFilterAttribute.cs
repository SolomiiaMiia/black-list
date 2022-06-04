using CookingApi.Infrastructure.Services.Abstractions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Primitives;

namespace CookingApi.Web.Filters
{
  public class AuthFilterAttribute : ActionFilterAttribute
  {
    private string[] _allowedRoles;

    public AuthFilterAttribute(params string[] allowedRoles)
    {
      _allowedRoles = allowedRoles;
    }


    public override void OnActionExecuting(ActionExecutingContext context)
    {
      if (_allowedRoles.Length > 0)
      {
        var token = context.HttpContext.Request.Headers["Security-Token"];

        if (token == StringValues.Empty) context.Result = new UnauthorizedResult();
        else
        {
          var authService = context.HttpContext.RequestServices.GetService<IAuthService>();
          var user = authService.GetUserByToken(token);
          if (user == null) context.Result = new UnauthorizedResult();
          else
          {
            if (!_allowedRoles.Contains(user.Role)) context.Result = new UnauthorizedResult();
          }
        }
      }

      base.OnActionExecuting(context);
    }
  }
}
