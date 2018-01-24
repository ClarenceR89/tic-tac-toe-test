using three_t_backend.Models;
using System.Collections.Generic;

namespace three_t_backend.Models
{
    public class Game
    {
        public long Id { get; set; }
        public long PlayerOneId { get; set; }
        public long PlayerTwoId { get; set; }
        public int Turn { get; set; }
        public virtual ICollection<Move> Moves { get; set; }
        public virtual User playerOne { get; set; }
        public virtual User playerTwo { get; set; }
    }
}