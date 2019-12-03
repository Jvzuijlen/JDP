using System.Collections.Generic;
using System.Threading.Tasks;
using JusDanceProjects.API.Models;

namespace JusDanceProjects.API.Data
{
    public interface IDanceRepository
    {
        //DanceCourseType
        Task SaveDanceCourseType(DanceCourseType danceCourseType);
        Task DeleteDanceCourseType(int id);
        Task<List<DanceCourseType>> FindDanceCourseType(string search);
        Task<IEnumerable<DanceCourseType>> GetDanceCourseTypes();
        Task<DanceCourseType> GetDanceCourseType(int id);

        //DanceCourse
        Task SaveDanceCourse(DanceCourse danceCourse);
        Task DeleteDanceCourse(int id);
        Task<IEnumerable<DanceCourse>> GetDanceCourses();
        Task<DanceCourse> GetDanceCourse(int id);
    }
}