using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SpaceInvader.Models;
using SpaceInvader.Interfaces;

namespace SpaceInvader.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository userRepository;

        public UserController(IUserRepository _userRepository)
        {
            userRepository = _userRepository;
        }


        [HttpPost]
        [Route("register")]
        public IActionResult Register([FromBody] User newUser)
        {
            var user = userRepository.Add(newUser);
            return Ok(user);
        }

        [HttpGet]
        [Route("{username}", Name = nameof(GetUserByUsername))]
        public IActionResult GetUserByUsername(string username)
        {
            var existingUser = userRepository.GetUserByUsername(username);

            if (existingUser == null) return NotFound();

            return Ok(existingUser);
        }
    }
}