using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SpaceInvader.DTO;
using SpaceInvader.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace SpaceInvader.Controllers
{
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration configuration;
        private readonly IUserRepository userRepository;

        public AuthController(IConfiguration _configuration, IUserRepository _userRepository)
        {
            configuration = _configuration;
            userRepository = _userRepository;
        }

        [Route("login")]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginDto user)
        {
            try
            {
                if (!string.IsNullOrEmpty(user.Username) && !string.IsNullOrEmpty(user.Password))
                {
                    // Récupération de l'utilisateur
                    var loggedInUser = await Task.Run(() => userRepository.Get(user));

                    if (loggedInUser is null)
                        return NotFound("User not found");

                    var theClaims = new[]
                    {
                        new Claim(ClaimTypes.NameIdentifier, Guid.NewGuid().ToString()),
                        new Claim(ClaimTypes.Name, loggedInUser.Username),
                        new Claim(ClaimTypes.Email, loggedInUser.Email),
                        new Claim(ClaimTypes.Role, loggedInUser.Role)
                    };

                    var token = new JwtSecurityToken
                        (
                            issuer: configuration["Jwt:Issuer"],
                            audience: configuration["Jwt:Audience"],
                            claims: theClaims,
                            expires: DateTime.UtcNow.AddMinutes(60),
                            notBefore: DateTime.UtcNow,
                            signingCredentials: new SigningCredentials
                            (
                                new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"])),
                                SecurityAlgorithms.HmacSha256
                            )
                        );
                    var tokenString = new JwtSecurityTokenHandler().WriteToken(token);
                    return Ok(tokenString);
                }
                return BadRequest("Données utilisateurs incorrects");
            }
            catch (ArgumentException ex)
            {

                return StatusCode((int)System.Net.HttpStatusCode.InternalServerError, ex.Message);

            }
        }
    }
}
