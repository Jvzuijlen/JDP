using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JusDanceProjects.API.Models;
using Microsoft.EntityFrameworkCore;

namespace JusDanceProjects.API.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;

        public UserRepository(DataContext context)
        {
            _context = context;
        }

        public async Task DeleteUser(int id)
        {
            var user = await this.GetUser(id);

            // Check if Phot isnt null
            if (user.ProfilePicture != null)
            {
                // Delete Photo aswell
                _context.Photos.Remove(user.ProfilePicture);
            }

            _context.Users.Remove(user);
            _context.SaveChanges();
        }

        public void SaveUser(User user)
        {
            if (user.Id == 0)
            {
                _context.Users.Add(user);
            }
            else
            {
                _context.Users.Update(user);
            }

            _context.SaveChanges();
        }

        public List<User> FindUser(string search)
        {
            var users = from d in _context.Users.Include(p => p.ProfilePicture) select d;

            if (!String.IsNullOrEmpty(search))
            {
                users = users.Include(p => p.ProfilePicture).Where(type => type.Email.Contains(search));
            }

            return users.Include(p => p.ProfilePicture).ToList();
        }

        public async Task<User> GetUser(int id)
        {
            var user = await _context.Users.Include(p => p.ProfilePicture).FirstOrDefaultAsync(c => c.Id == id);
            return user;
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            var users = await _context.Users.Include(p => p.ProfilePicture).ToListAsync();
            return users;
        }
    }
}