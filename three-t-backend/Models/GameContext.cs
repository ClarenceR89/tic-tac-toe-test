using Microsoft.EntityFrameworkCore;

namespace three_t_backend.Models
{
    public class GameContext : DbContext
    {
        public GameContext(DbContextOptions<GameContext> options)
            : base(options)
        {
        }

        public DbSet<Game> GameItems { get; set; }

    }
}