namespace three_t_backend.Models
{
    public class Move
    {
        public long Id {get;set;}
        public long X {get; set;}
        public long Y {get; set;}

        public long playerId {get; set;}
        public long gameId {get; set;}
    }
}