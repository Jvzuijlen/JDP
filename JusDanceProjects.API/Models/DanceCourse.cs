using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JusDanceProjects.API.Models
{
    public class DanceCourse
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [Display(Name = "Course Visible on website")]
        public bool Visible { get; set; }

        [Required]
        [Display(Name = "Maximum amount of Attendees")]
        public int MaxAttendees { get; set; }

        [Required]
        [DataType(DataType.Date)]
        [Display(Name = "Course Start Date")]
        public DateTime StartDate {get; set;}

        [Required]
        [DataType(DataType.Date)]
        [Display(Name = "Course End Date")]
        public DateTime EndDate { get; set; }

        [Display(Name = "Dance Location")]
        [Required(ErrorMessage = "You need to give a address")]
        public string Location { get; set; }

        [Display(Name = "Course Teacher")]
        [Required(ErrorMessage = "You need to select a teacher")]
        public int TeacherId { get; set; }
        [ForeignKey("TeacherId")]
        public virtual User Teacher { get; set; }

        [Display(Name = "Dance Course Type")]
        [Required(ErrorMessage = "You need to select a course type")]
        public int DanceCourseTypeId { get; set; }
        [ForeignKey("DanceCourseTypeId")]
        public virtual DanceCourseType DanceCourseType { get; set; }

        public virtual ICollection<Lesson> Lessons { get; set; }
    }
}