using System.Threading.Tasks;
using JusDanceProjects.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace JusDanceProjects.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class DanceController : ControllerBase
    {
        private readonly IDanceRepository _repo;

        public DanceController(IDanceRepository repo)
        {
            _repo = repo;
        }

        [HttpGet("coursetypes")]
        public async Task<IActionResult> GetDanceCourseTypes()
        {
            var dancetypes = await _repo.GetDanceCourseTypes();

            return Ok(dancetypes);
        }
    }
}