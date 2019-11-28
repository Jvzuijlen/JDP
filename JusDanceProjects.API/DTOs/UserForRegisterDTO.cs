using System;
using System.ComponentModel.DataAnnotations;

namespace JusDanceProjects.API.DTOs
{
    public class UserForRegisterDTO
    {
        [Required]
        [EmailAddress(ErrorMessage = "The entered text is not a valid email address")]
        public string Email { get; set; }
        [Required]
        [StringLength(16, MinimumLength = 6, ErrorMessage = "You must specify password between 6 and 16 characters")]
        public string Password { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        public DateTime DateOfBirth { get; set; }

        [Required]
        public string Address { get; set; }

        [Required]
        public string PhoneNumber { get; set; }
    }
}