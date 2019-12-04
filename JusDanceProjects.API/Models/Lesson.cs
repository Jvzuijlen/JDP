using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JusDanceProjects.API.Models
{
    public class Lesson
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [DataType(DataType.DateTime)]
        [Display(Name = "Lesson Start Time")]
        public DateTime StartTime {get; set;}

        [Required]
        [DataType(DataType.DateTime)]
        [Display(Name = "Lesson End Time")]
        public DateTime EndTime { get; set; }

        [Required]
        public int DanceCourseId { get; set; }
        [ForeignKey("DanceCourseId")]
        public virtual DanceCourse DanceCourse { get; set; }
        
        public virtual ICollection<User> AttendingUsers { get; set; }
        public virtual ICollection<User> AttendedUsers { get; set; }
    }
}