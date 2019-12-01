using System.Threading.Tasks;
using JusDanceProjects.API.Data;
using Microsoft.AspNetCore.Mvc;

namespace JusDanceProjects.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DanceController : ControllerBase
    {
        private readonly IDanceRepository _repo;

        public DanceController(IDanceRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var dancetypes = await _repo.GetDanceCourseTypes();

            // var usersToReturn = _mapper.Map<IEnumerable<UserForListDTO>>(users);

            return Ok(dancetypes);
        }
    }
}