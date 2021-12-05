using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Cinemamagic.Data;
using Cinemamagic.Models;

namespace Cinemamagic.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HallsController : ControllerBase
    {
        private readonly CinemamagicContext _context;

        public HallsController(CinemamagicContext context)
        {
            _context = context;
        }

        // GET: api/Halls
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Hall>>> GetHall()
        {
            return await _context.Hall.Include(h => h.Rows).ToListAsync();
        }

        // GET: api/Halls/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Hall>> GetHall(int id)
        {
            var hall = await _context.Hall.FindAsync(id);

            if (hall == null)
            {
                return NotFound();
            }

            var imdb = new IMDbApiLib.ApiLib("k_sv6fiem3");

            var titles = await imdb.TitleAsync("tt2382320", Posters: true);

            var link = titles.Posters.Posters[0].Link;

            return hall;
        }

        // PUT: api/Halls/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHall(int id, Hall hall)
        {
            if (id != hall.Id)
            {
                return BadRequest();
            }

            _context.Entry(hall).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HallExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Halls
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Hall>> PostHall(Hall hall)
        {
            _context.Hall.Add(hall);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetHall", new { id = hall.Id }, hall);
        }

        // DELETE: api/Halls/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHall(int id)
        {
            var hall = await _context.Hall.FindAsync(id);
            if (hall == null)
            {
                return NotFound();
            }

            _context.Hall.Remove(hall);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool HallExists(int id)
        {
            return _context.Hall.Any(e => e.Id == id);
        }
    }
}
