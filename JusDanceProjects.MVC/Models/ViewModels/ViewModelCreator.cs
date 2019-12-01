using JusDanceProjects.API.Models;

namespace JusDanceProjects.MVC.Models.ViewModels
{
    public static class ViewModelCreator
    {
        public static DanceCourseTypeVM IndexAnimalCatVm(DanceCourseType course)
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
    }
}