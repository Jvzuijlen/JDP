using System;
using System.ComponentModel.DataAnnotations;
using JusDanceProjects.API.Models;

namespace JusDanceProjects.MVC.Models.ViewModels
{
    public class DanceCourseTypeVM
    {
        public DanceCourseTypeVM()
        {

        }

        public int Id { get; set; }
        
        [Required]
        public string Title { get; set; }
        [Required]
        public string Description { get; set; }
        public bool Visible { get; set; }
        
        //Photo
        public string PhotoUrl { get; set; }
    }
}