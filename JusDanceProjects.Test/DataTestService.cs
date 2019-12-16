using System.Collections.Generic;
using JusDanceProjects.API.Models;

namespace JusDanceProjects.Test
{
    public class DataTestService
    {
        public static IEnumerable<DanceCourseType> GetTestCoursesList()
        {
            var sessions = new List<DanceCourseType>();
            sessions.Add(new DanceCourseType()
            {
                Id = 1,
                Title = "HipHop",
                Visible = true,
                Description = "HipHop for beginners"
            });
            sessions.Add(new DanceCourseType()
            {
                Id = 2,
                Title = "R&B",
                Visible = true,
                Description = "R&B for beginners"
            });
            return sessions;
        }

        public DataTestService()
        {
        }
    }
}