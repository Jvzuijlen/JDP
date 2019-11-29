using System;
using System.Collections.Generic;
using System.Linq;
using JusDanceProjects.API.Models;

namespace JusDanceProjects.API.Data
{
    public class MiscRepository : IMiscRepository
    {
        private readonly DataContext _context;
        public MiscRepository(DataContext context)
        {
            _context = context;
        }

        public void DeletePhoto(int id)
        {
            _context.Photos.Remove(this.GetPhoto(id));
            _context.SaveChanges();
        }

        public Photo GetPhoto(int id)
        {
            return _context.Photos.Find(id);
        }

        public IEnumerable<Photo> GetPhotos()
        {
            return _context.Photos.ToList();
        }

        public void SavePhoto(Photo photo)
        {
            if (photo.Id == 0)
            {
                photo.DateAdded = DateTime.Now;
                _context.Photos.Add(photo);
            }
            else
            {
                _context.Photos.Update(photo);
            }

            _context.SaveChanges();
        }
    }
}