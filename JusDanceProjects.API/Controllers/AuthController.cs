using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using JusDanceProjects.API.Data;
using JusDanceProjects.API.DTOs;
using JusDanceProjects.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace JusDanceProjects.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;

        public AuthController(IAuthRepository repo, IConfiguration config, IMapper mapper)
        {
            _repo = repo;
            _config = config;
            _mapper = mapper;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDTO userForRegisterDTO)
        {
            // validate request

            userForRegisterDTO.Email = userForRegisterDTO.Email.ToLower();

            if (await _repo.UserExists(userForRegisterDTO.Email))
                return BadRequest("Username already exists");

            var userToCreate = _mapper.Map<User>(userForRegisterDTO);

            var createdUser = await _repo.Register(userToCreate, userForRegisterDTO.Password);

            var userToReturn = _mapper.Map<UserForDetailDTO>(createdUser);

            return CreatedAtRoute("GetUser", new {controller = "Users", id = createdUser.Id }, userToReturn);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDTO userForLoginDTO)
        {
            var userFromRepo = await _repo.Login(userForLoginDTO.Email.ToLower(), userForLoginDTO.Password);

            if (userFromRepo == null)
                return Unauthorized();

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name, userFromRepo.FirstName)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(_config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return Ok(new
            {
                token = tokenHandler.WriteToken(token)
            });
        }
    }
}