using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using three_t_backend.Models;
using System.Linq;

namespace three_t_backend.Controllers
{
    [Route("api/games")]
    public class GameController : Controller
    {

        private readonly GameContext _context;

        public GameController(GameContext context)
        {
            _context = context;
        }

        [HttpGet("{id}", Name = "GetGames")]
        public IActionResult GetById(long id)
        {
            var item = _context.GameItems.FirstOrDefault(t => t.Id == id);
            if (item == null)
            {
                return NotFound();
            }
            return new ObjectResult(item);
        }

        [HttpGet("user/{userId}", Name = "GetGamesByUserId")]
        public IEnumerable<Game> GetByUserId(long userId)
        {
            return _context.GameItems.Where(game => 
                game.PlayerOneId == userId
                || game.PlayerTwoId == userId
            ).ToList();
        }

        [HttpPost]
        public IActionResult Create([FromBody] Game game)
        {
            if (game == null)
            {
                return BadRequest();
            }

            game.Turn = 0;
            //TODO: signal-r to start gamed

            _context.GameItems.Add(game);
            _context.SaveChanges();

            return CreatedAtRoute("GetGames", new { id = game.Id }, game);
        }
    }
}