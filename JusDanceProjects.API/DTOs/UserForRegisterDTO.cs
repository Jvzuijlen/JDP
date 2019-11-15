using System.ComponentModel.DataAnnotations;

namespace JusDanceProjects.API.DTOs
{
    public class UserForRegisterDTO
    {
        [Required]
        public string Username { get; set; }
        [Required]
        [StringLength(16, MinimumLength = 6, ErrorMessage = "You must specify password between 6 and 16 characters")]
        public string Password { get; set; }
    }
}