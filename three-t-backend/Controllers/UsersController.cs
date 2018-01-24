using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using three_t_backend.Models;
using System.Linq;

namespace three_t_backend.Controllers
{
    [Route("api/users")]
    public class UserController : Controller
    {

        private readonly UserContext _context;

        public UserController(UserContext context)
        {
            _context = context;

            if (_context.UserItems.Count() == 0) {
                _context.UserItems.Add(new User() {
                    Alias= "AI",
                    Name= "Computer"
                });
                _context.SaveChanges();
            }
        }

        [HttpGet]
        public IEnumerable<User> GetAll()
        {
            return _context.UserItems.ToList();
        }

        [HttpGet("{id}", Name = "GetUser")]
        public IActionResult GetById(long id)
        {
            var item = _context.UserItems.FirstOrDefault(t => t.Id == id);
            if (item == null)
            {
                return NotFound();
            }
            return new ObjectResult(item);
        }

        [HttpPost]
        public IActionResult Create([FromBody] User user)
        {
            if (user == null)
            {
                return BadRequest();
            }

            _context.UserItems.Add(user);
            _context.SaveChanges();

            return CreatedAtRoute("GetUser", new { id = user.Id }, user);
        }

        [HttpPut("{id}")]
        public IActionResult Update(long id, [FromBody] User user)
        {
            if (user == null || user.Id != id)
            {
                return BadRequest();
            }

            var changeUser = _context.UserItems.FirstOrDefault(t => t.Id == id);
            if (changeUser == null)
            {
                return NotFound();
            }

            changeUser.Alias = user.Alias;
            changeUser.Name = user.Name;

            _context.UserItems.Update(changeUser);
            _context.SaveChanges();
            return new NoContentResult();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            var user = _context.UserItems.FirstOrDefault(t => t.Id == id);
            if (user == null)
            {
                return NotFound();
            }

            _context.UserItems.Remove(user);
            _context.SaveChanges();
            return new NoContentResult();
        }
    }
}