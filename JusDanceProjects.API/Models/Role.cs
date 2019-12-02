using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace JusDanceProjects.API.Models
{
    public class Role : IdentityRole<int>
    {
        public virtual ICollection<UserRole> UserRoles { get; set; }
    }
}