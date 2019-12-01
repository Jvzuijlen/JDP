using System.Collections.Generic;
using System.Threading.Tasks;
using JusDanceProjects.API.Models;

namespace JusDanceProjects.API.Data
{
    public interface IDanceRepository
    {
        void SaveDanceCourseType(DanceCourseType danceCourseType);
        void DeleteDanceCourseType(int id);
        List<DanceCourseType> FindDanceCourseType(string search);
        
        Task<IEnumerable<DanceCourseType>> GetDanceCourseTypes();
        DanceCourseType GetDanceCourseType(int id);
    }
}