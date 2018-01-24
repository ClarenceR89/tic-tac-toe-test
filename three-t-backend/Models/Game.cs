using three_t_backend.Models;

namespace three_t_backend.Models
{
    public class Game
    {
        public long Id {get; set;}
        public string Name {get; set;}
        public User[] Players {get; set;}

        public Move[] moves {get; set;}
    }
}