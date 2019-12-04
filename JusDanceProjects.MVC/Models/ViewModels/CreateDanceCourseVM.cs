using System.ComponentModel.DataAnnotations;
using JusDanceProjects.API.Models;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace JusDanceProjects.MVC.Models.ViewModels
{
    public class CreateDanceCourseVM
    {
        public DanceCourse DanceCourse { get; set; }

        [Display(Name = "Course Teacher")]
        [Required(ErrorMessage = "You need to select a teacher")]
        public SelectList TeacherSelectList { get; set;}

        [Display(Name = "Dance Course Type")]
        [Required(ErrorMessage = "You need to select a course type")]
        public SelectList DanceCourseTypeSelectList { get; set;}
    }
}