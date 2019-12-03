using JusDanceProjects.API.Models;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace JusDanceProjects.MVC.Models.ViewModels
{
    public class CreateDanceCourseVM
    {
        public DanceCourse DanceCourse { get; set; }
        public SelectList TeacherSelectList { get; set;}
        public SelectList DanceCourseTypeSelectList { get; set;}
    }
}