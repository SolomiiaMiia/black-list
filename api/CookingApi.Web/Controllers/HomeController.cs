using System.Net;
using CookingApi.Domain.DAL.Base;
using CookingApi.Infrastructure.Exceptions;
using Microsoft.AspNetCore.Mvc;

namespace CookingApi.Web.Controllers
{
    [Route("api/home")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        public HomeController(IUnitOfWork unitOfWork)
        {

        }

        [HttpGet, Route("get-something")]
        public IActionResult GetSomething()
        {
            throw new ApplicationException("test_message");
        }
    }
}
