using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JusDanceProjects.API.Models;
using Microsoft.EntityFrameworkCore;

namespace JusDanceProjects.API.Data
{
    public class DanceRepository : IDanceRepository
    {
        private readonly DataContext _context;
        
        public DanceRepository(DataContext context)
        {
            _context = context;
        }

        public void DeleteDanceCourseType(int id)
        {
            var course = this.GetDanceCourseType(id);
            _context.Photos.Remove(course.Photo);
            _context.DanceCourseTypes.Remove(course);
            _context.SaveChanges();
        }

        public void SaveDanceCourseType(DanceCourseType danceCourseType)
        {
            if (danceCourseType.Id == 0)
            {
                _context.DanceCourseTypes.Add(danceCourseType);
            }
            else
            {
                _context.DanceCourseTypes.Update(danceCourseType);
            }

            _context.SaveChanges();
        }

        public List<DanceCourseType> FindDanceCourseType(string search)
        {
            var danceCourseTypes = from d in _context.DanceCourseTypes.Include(p => p.Photo) select d;

            if (!String.IsNullOrEmpty(search))
            {
                danceCourseTypes = danceCourseTypes.Include(p => p.Photo).Where(type => type.Title.Contains(search));
            }

            return danceCourseTypes.Include(p => p.Photo).ToList();
        }

        public DanceCourseType GetDanceCourseType(int id)
        {
            var danceCourseType = _context.DanceCourseTypes.Include(p => p.Photo).FirstOrDefault(c => c.Id == id);
            return danceCourseType;
        }

        public IEnumerable<DanceCourseType> GetDanceCourseTypes()
        {
            var danceCourseTypes = _context.DanceCourseTypes.Include(p => p.Photo).ToList();
            return danceCourseTypes;
        }
    }
}