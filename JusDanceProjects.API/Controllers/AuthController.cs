using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using JusDanceProjects.API.Data;
using JusDanceProjects.API.DTOs;
using JusDanceProjects.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace JusDanceProjects.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;

        public AuthController(IConfiguration config, IMapper mapper,
        UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _config = config;
            _mapper = mapper;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDTO userForRegisterDTO)
        {
            var userToCreate = _mapper.Map<User>(userForRegisterDTO);
            userToCreate.UserName = userToCreate.Email;

            var result = await _userManager.CreateAsync(userToCreate, userForRegisterDTO.Password);

            var userToReturn = _mapper.Map<UserForDetailDTO>(userToCreate);

            if (result.Succeeded)
            {
                return CreatedAtRoute("GetUser", new { controller = "Users", id = userToCreate.Id }, userToReturn);
            }

            return BadRequest(result.Errors);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDTO userForLoginDTO)
        {
            var user = await _userManager.FindByEmailAsync(userForLoginDTO.Email);

            var result = await _signInManager.CheckPasswordSignInAsync(user, userForLoginDTO.Password, false);

            if (result.Succeeded)
            {
                user.LastActive = DateTime.Now;
                await _userManager.UpdateAsync(user);

                var appUser = _mapper.Map<UserForDetailDTO>(user);

                return Ok(new
                {
                    token = GenerateJwtToken(user),
                    user = appUser
                });
            }
            return Unauthorized();
        }

        private string GenerateJwtToken(User user)
        {
            var claims = new[]
{
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.FirstName)
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

            return tokenHandler.WriteToken(token);
        }
    }
}