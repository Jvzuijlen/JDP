using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace JusDanceProjects.API.Models
{
    public class DanceCourseType
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public virtual Photo Photo { get; set; }
        public virtual ICollection<DanceCourse> Courses { get; set; }
        public bool Visible { get; set; }
    }
}