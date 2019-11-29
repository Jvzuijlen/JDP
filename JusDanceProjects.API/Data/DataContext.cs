using JusDanceProjects.API.Models;
using Microsoft.EntityFrameworkCore;

namespace JusDanceProjects.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Value> Values { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<Photo> Photos { get; set; }

        public DbSet<DanceCourseType> DanceCourseTypes { get; set;}
        public DbSet<DanceCourse> DanceCourses { get; set; }
    }
}