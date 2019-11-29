using System;
using JusDanceProjects.API.Models;

namespace JusDanceProjects.MVC.Models.ViewModels
{
    public class DanceCourseTypeVM
    {
        public DanceCourseTypeVM()
        {

        }

        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool Visible { get; set; }
        
        //Photo
        public int? PhotoId { get; set; }
        public string PhotoUrl { get; set; }
        public string PhotoDescription { get; set; }
        public DateTime? PhotoDateAdded { get; set; }
    }
}