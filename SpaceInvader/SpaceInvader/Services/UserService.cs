using Microsoft.EntityFrameworkCore;
using SpaceInvader.DTO;
using SpaceInvader.ContextDb;
using SpaceInvader.Interfaces;
using SpaceInvader.Models;

namespace SpaceInvader.Services
{
    public class UserService : IUserRepository
    {
        private readonly ApplicationDbContext context;

        public UserService(ApplicationDbContext _context)
        {
            context = _context;
        }
        public User Add(User user)
        {
            var newUser = new User
            {
                Username = user.Username,
                Password = user.Password,
                Email = user.Email,
                Role = user.Role,
            };

            context.Users.Add(newUser);
            context.SaveChanges();

            return newUser;
        }

        public List<User> GetAllUsers()
        {
            return context.Users.ToList();
        }

        public User GetUserByUsername(string username)
        {
            return context.Users.FirstOrDefault(user => user.Username.Equals(username));
        }

        public User Get(LoginDto userLogin)
        {
            return context.Users
                .FirstOrDefault(user => user.Username.Equals(userLogin.Username) && user.Password.Equals(userLogin.Password));
        }

    }
}