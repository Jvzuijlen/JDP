using System.Collections.Generic;
using System.Threading.Tasks;
using JusDanceProjects.API.Models;

namespace JusDanceProjects.API.Data
{
    public interface IUserRepository
    {
        void SaveUser(User user);
        Task DeleteUser(int id);
        List<User> FindUser(string search);

        Task<IEnumerable<User>> GetUsers();
        Task<User> GetUser(int id);
    }
}