using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using three_t_backend.Models;
using System.Linq;
using System;
using three_t_backend.SignalRHubs;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace three_t_backend.Controllers
{
    [Route("api/moves")]
    public class MoveController : Controller
    {

        private readonly MoveContext _context;
        private readonly IHubContext<MoveHub> _hubContext;

        public MoveController(MoveContext context, IHubContext<MoveHub> hub)
        {
            _context = context;
            _hubContext = hub;
        }

        [HttpGet]
        public IEnumerable<Move> GetAll()
        {
            return _context.MoveItems.ToList();
        }

        [HttpGet("{id}", Name = "GetMove")]
        public IActionResult GetById(long id)
        {
            var item = _context.MoveItems.FirstOrDefault(t => t.Id == id);
            if (item == null)
            {
                return NotFound();
            }
            return new ObjectResult(item);
        }

        [HttpPost]
        public IActionResult Create([FromBody] Move move)
        {
            if (move == null)
            {
                return BadRequest();
            }

            _context.MoveItems.Add(move);
            _context.SaveChanges();


            if (this.calculateWin(move.GameId, move.UserId)) {
                _hubContext.Clients.All.InvokeAsync("Win", true);
            }
            else {
                getAIMove(move.GameId);                
            }

            return CreatedAtRoute("GetMove", new { id = move.Id }, move);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            var move = _context.MoveItems.FirstOrDefault(t => t.Id == id);
            if (move == null)
            {
                return NotFound();
            }

            _context.MoveItems.Remove(move);
            _context.SaveChanges();
            return new NoContentResult();
        }

        private void getAIMove(long gameId)
        {
            //generate move
            var aimove = new Move();
            aimove.UserId = 1;
            aimove.GameId = gameId;
            //get moves already made
            var moves = _context.MoveItems.Where(move => move.GameId == gameId).ToList();
            var indexes = new List<long>();
            moves.ForEach(move => indexes.Add(getIndex(move)));
            //generate a move for the computer
            var rnd = getRnd();
            var i = 1;
            while (indexes.Contains(rnd) && i < 9)
            {
                rnd = getRnd();
                i++;
            }
            if (indexes.Contains(rnd)) return;
            //map x and y for move
            if (rnd <= 3)
            {
                aimove.X = rnd;
                aimove.Y = 1;
            }
            else if (rnd > 3 && rnd <= 6)
            {
                aimove.X = rnd - 3;
                aimove.Y = 2;
            }
            else
            {
                aimove.X = rnd - 6;
                aimove.Y = 3;
            }

            _context.MoveItems.Add(aimove);
            _context.SaveChanges();
            _hubContext.Clients.All.InvokeAsync("Move", aimove);

            if (this.calculateWin(aimove.GameId, aimove.UserId)) {
                _hubContext.Clients.All.InvokeAsync("Win", false);
            }
        }

        private long getIndex(Move move)
        {
            return move.X + (3 * (move.Y - 1));
        }

        private long getRnd()
        {
            var rnd = new Random();
            return rnd.Next(1, 9);
        }

        private bool calculateWin(long gameId, long userId) {
            var moves = _context.MoveItems.Where(m => m.UserId == userId && m.GameId == gameId).ToList();
            var indexes = new List<long>();
            moves.ForEach(move => {
                indexes.Add(getIndex(move));
            });
            if (checkConditions(indexes)) return true;

            return false;
        }
        
        private bool checkConditions(List<long> indexes) {
            //cant win with less than three
            if (indexes.Count < 3) return false;

            //horizontal
            if (indexes.Contains(1) && indexes.Contains(2) && indexes.Contains(3)) return true;
            if (indexes.Contains(4) && indexes.Contains(5) && indexes.Contains(6)) return true;
            if (indexes.Contains(7) && indexes.Contains(8) && indexes.Contains(9)) return true;

            //vertical
            if (indexes.Contains(1) && indexes.Contains(4) && indexes.Contains(7)) return true;
            if (indexes.Contains(2) && indexes.Contains(5) && indexes.Contains(8)) return true;
            if (indexes.Contains(3) && indexes.Contains(6) && indexes.Contains(9)) return true;

            //diagonal
            if (indexes.Contains(1) && indexes.Contains(5) && indexes.Contains(9)) return true;
            if (indexes.Contains(3) && indexes.Contains(5) && indexes.Contains(7)) return true;
            
            //false through 
            return false;
        }
    }
}