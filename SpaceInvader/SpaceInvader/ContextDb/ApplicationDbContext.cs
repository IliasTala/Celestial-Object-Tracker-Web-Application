using Microsoft.EntityFrameworkCore;
using SpaceInvader.Models;


namespace SpaceInvader.ContextDb
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<CelestialObject> CelestialObjects { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Observation> Observations { get; set; }
    }
}
