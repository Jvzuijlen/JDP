using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JusDanceProjects.API.Models
{
    public class Lesson
    {
        public Lesson()
        {
            this.AttendedUsers = new HashSet<User>();
            this.AttendingUsers = new HashSet<User>();
        }

        [Key]
        public int Id { get; set; }
        public DateTime StartTime {get; set;}
        public DateTime EndTime { get; set; }
        public int DanceCourseId { get; set; }
        [ForeignKey("DanceCourseId")]
        public virtual DanceCourse DanceCourse { get; set; }
        public virtual ICollection<User> AttendingUsers { get; set; }
        public virtual ICollection<User> AttendedUsers { get; set; }
    }
}