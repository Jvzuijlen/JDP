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

        public async Task DeleteDanceCourseType(int id)
        {
            var course = await this.GetDanceCourseType(id);

            // Check if Phot isnt null
            if (course.Photo != null)
            {
                // Delete Photo aswell
                _context.Photos.Remove(course.Photo);
            }
            
            _context.DanceCourseTypes.Remove(course);
            _context.SaveChanges();
        }

        public async Task SaveDanceCourseType(DanceCourseType danceCourseType)
        {
            if (danceCourseType.Id == 0)
            {
                _context.DanceCourseTypes.Add(danceCourseType);
            }
            else
            {
                _context.DanceCourseTypes.Update(danceCourseType);
            }

            await _context.SaveChangesAsync();
        }

        public async Task<List<DanceCourseType>> FindDanceCourseType(string search)
        {
            var danceCourseTypes = from d in _context.DanceCourseTypes.Include(p => p.Photo) select d;

            if (!String.IsNullOrEmpty(search))
            {
                danceCourseTypes = danceCourseTypes.Include(p => p.Photo).Where(type => type.Title.Contains(search));
            }

            return await danceCourseTypes.Include(p => p.Photo).ToListAsync();
        }

        public async Task<DanceCourseType> GetDanceCourseType(int id)
        {
            var danceCourseType = await _context.DanceCourseTypes.Include(p => p.Photo).FirstOrDefaultAsync(c => c.Id == id);
            return danceCourseType;
        }

        public async Task<IEnumerable<DanceCourseType>> GetDanceCourseTypes()
        {
            var danceCourseTypes = await _context.DanceCourseTypes.Include(p => p.Photo).ToListAsync();
            return danceCourseTypes;
        }

        public async Task DeleteDanceCourse(int id)
        {
            var course = await this.GetDanceCourse(id);

            _context.DanceCourses.Remove(course);
            _context.SaveChanges();
        }

        public async Task SaveDanceCourse(DanceCourse danceCourse)
        {
            if (danceCourse.Id == 0)
            {
                _context.DanceCourses.Add(danceCourse);
            }
            else
            {
                _context.DanceCourses.Update(danceCourse);
            }

            await _context.SaveChangesAsync();
        }

        public async Task<DanceCourse> GetDanceCourse(int id)
        {
            var danceCourse = await _context.DanceCourses.Include(type => type.DanceCourseType).FirstOrDefaultAsync(c => c.Id == id);
            return danceCourse;
        }

        public async Task<IEnumerable<DanceCourse>> GetDanceCourses()
        {
            var danceCourses = await _context.DanceCourses.Include(type => type.DanceCourseType).ToListAsync();
            return danceCourses;
        }
    }
}