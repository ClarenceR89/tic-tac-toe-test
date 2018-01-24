using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using three_t_backend.Models;
using System.Linq;

namespace three_t_backend.Controllers
{
    [Route("api/moves")]
    public class MoveController : Controller
    {

        private readonly MoveContext _context;

        public MoveController(MoveContext context)
        {
            _context = context;
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
    }
}