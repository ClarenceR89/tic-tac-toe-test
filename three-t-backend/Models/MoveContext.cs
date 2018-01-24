using Microsoft.EntityFrameworkCore;

namespace three_t_backend.Models
{
    public class MoveContext : DbContext
    {
        public MoveContext(DbContextOptions<MoveContext> options)
            : base(options)
        {
        }

        public DbSet<Move> MoveItems { get; set; }

    }
}