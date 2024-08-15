using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeManagement.Controllers
{
    [ApiController]
    public class ErrorController : ControllerBase
    {
        [Route("/api/v1/error")]
        [HttpGet] 
        public IActionResult Error()
        {
            return Problem(
                title: "An unexpected error occurred",
                detail: "Please contact support if this problem persists.",
                statusCode: 500); // Status code
        }
    }
}
