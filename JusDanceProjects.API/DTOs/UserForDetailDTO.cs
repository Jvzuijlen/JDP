using System;

namespace JusDanceProjects.API.DTOs
{
    public class UserForDetailDTO
    {
        public int Id { get; set; }

        public string Email { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public DateTime DateOfBirth { get; set; }

        public string Address { get; set; }

        public string PhoneNumber { get; set; }

        public DateTime Created { get; set; }

        public DateTime LastActive { get; set; }

        public string ProfilePictureUrl { get; set; }
    }
}