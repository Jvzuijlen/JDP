using System;

namespace JusDanceProjects.API.DTOs
{
    public class UserForListDTO
    {
        public int Id { get; set; } 

        public string Email { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public int Age { get; set; }

        public DateTime Created { get; set; }

        public DateTime LastActive { get; set; }

        public string ProfilePictureUrl { get; set; }
    }
}