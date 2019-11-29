using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JusDanceProjects.API.Models
{
    public class DanceCourse
    {
        [Key]
        public int Id { get; set; }
        public string Location { get; set; }
        public virtual User Teacher { get; set; }
        public int DanceCourseTypeId { get; set; }
        [ForeignKey("DanceCourseTypeId")]
        public virtual DanceCourseType DanceCourseType { get; set; }
    }
}