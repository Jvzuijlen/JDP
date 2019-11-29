using System.Collections.Generic;
using JusDanceProjects.API.Models;

namespace JusDanceProjects.API.Data
{
    public interface IMiscRepository
    {
        void SavePhoto(Photo photo);
        void DeletePhoto(int id);

        IEnumerable<Photo> GetPhotos();
        Photo GetPhoto(int id);
    }
}