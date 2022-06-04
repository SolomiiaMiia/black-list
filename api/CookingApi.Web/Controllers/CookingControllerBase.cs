using Microsoft.AspNetCore.Mvc;

namespace CookingApi.Web.Controllers
{
    public class CookingControllerBase : ControllerBase
    {
        private class CookingResponse<T>
        {
            public T? ResponseData { get; set; }
        }

        protected IActionResult GenerateResponse<T>(T data) => Ok(new CookingResponse<T> { ResponseData = data });
    }
}
