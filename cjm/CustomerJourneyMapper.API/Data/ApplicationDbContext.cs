using CustomerJourneyMapper.API.Models;
using Microsoft.EntityFrameworkCore;

namespace CustomerJourneyMapper.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Journey> Journeys { get; set; }
        public DbSet<Stage> Stages { get; set; }
        public DbSet<Touchpoint> Touchpoints { get; set; }
        public DbSet<PainPoint> PainPoints { get; set; }
        public DbSet<Opportunity> Opportunities { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Journey>()
                .HasMany(j => j.Stages)
                .WithOne(s => s.Journey)
                .HasForeignKey(s => s.JourneyId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Stage>()
                .HasMany(s => s.Touchpoints)
                .WithOne(t => t.Stage)
                .HasForeignKey(t => t.StageId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Touchpoint>()
                .HasMany(t => t.PainPoints)
                .WithOne(p => p.Touchpoint)
                .HasForeignKey(p => p.TouchpointId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Touchpoint>()
                .HasMany(t => t.Opportunities)
                .WithOne(o => o.Touchpoint)
                .HasForeignKey(o => o.TouchpointId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
} 