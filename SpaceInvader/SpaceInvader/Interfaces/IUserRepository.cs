using System.Threading.Tasks;
using SpaceInvader.DTO;
using SpaceInvader.Models;

namespace SpaceInvader.Interfaces
{
    public interface IUserRepository
    {
        public User Add(User newUser);
        public User Get(LoginDto userLogin);
        public List<User> GetAllUsers();
        public User GetUserByUsername(string username);
    }
}