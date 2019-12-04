using System.Collections.Generic;
using System.Threading.Tasks;
using JusDanceProjects.API.Data;
using JusDanceProjects.API.Models;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace JusDanceProjects.MVC.Models.ViewModels
{
    public static class ViewModelCreator
    {
        public static DanceCourseTypeVM IndexDanceCourseTypeVM(DanceCourseType course)
        {
            return new DanceCourseTypeVM()
            {
                Id = course.Id,
                Title = course.Title,
                Description = course.Description,
                Visible = course.Visible,
                PhotoUrl = course?.Photo?.Url,
            };
        }

        public static CreateDanceCourseVM CreateDanceCourseVM(IDanceRepository danceRepository, IUserRepository userRepository)
        {
            return new CreateDanceCourseVM()
            {
                DanceCourse = new DanceCourse(),
                TeacherSelectList = new SelectList(Task.Run<IEnumerable<User>>(async () => await userRepository.GetUsers()).Result, "Id", "FirstName"),
                DanceCourseTypeSelectList = new SelectList(Task.Run<IEnumerable<DanceCourseType>>(async () => await danceRepository.GetDanceCourseTypes()).Result, "Id", "Title")
            };
        }
    }
}