using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Cinemamagic.Data;
using Cinemamagic.Models;

namespace Cinemamagic.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingsController : ControllerBase
    {
        private readonly CinemamagicContext _context;

        public BookingsController(CinemamagicContext context)
        {
            _context = context;
        }

        // GET: api/Bookings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Booking>>> GetBooking()
        {
            return await _context.Booking.ToListAsync();
        }

        // GET: api/Bookings
        [HttpGet("user/{id}")]
        public async Task<ActionResult<IEnumerable<Booking>>> GetBookingUser(Guid id)
        {
            return await _context.Booking.Where(b => id.Equals(b.User.Id) && !b.IsCancelled)
                .Include(b => b.Tickets)
                .Include(b => b.Session)
                .ThenInclude(b => b.Movie)
                .Include(b => b.Session)
                .ThenInclude(b => b.Hall)
                .ToListAsync();
        }

        // GET: api/Bookings
        [HttpGet("session/{id}")]
        public async Task<ActionResult<IEnumerable<Booking>>> GetBookingSession(Guid id)
        {
            return await _context.Booking.Where(b => id.Equals(b.Session.Id) && !b.IsCancelled).Include(b => b.Tickets).ToListAsync();
        }

        // GET: api/Bookings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Booking>> GetBooking(Guid id)
        {
            var booking = await _context.Booking.FindAsync(id);

            if (booking == null)
            {
                return NotFound();
            }

            return booking;
        }

        // PUT: api/Bookings/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBooking(Guid id, Booking booking)
        {
            if (id != booking.Id)
            {
                return BadRequest();
            }

            _context.Entry(booking).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookingExists(id))
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

        // POST: api/Bookings
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Booking>> PostBooking(AddBooking addBooking)
        {
            var session = await _context.Session.FindAsync(addBooking.SessionId);
            var user = await _context.User.FindAsync(addBooking.UserId);

            if (session == null || user == null)
            {
                return BadRequest();
            }

            var booking = new Booking
            {
                Session = session,
                User = user,
                Time = DateTime.Now,
                IsCancelled = false,
                Tickets = addBooking.Tickets
            };

            _context.Booking.Add(booking);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBooking", new { id = booking.Id }, booking);
        }

        // DELETE: api/Bookings/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBooking(Guid id)
        {
            var booking = await _context.Booking.FindAsync(id);
            if (booking == null)
            {
                return NotFound();
            }

            booking.IsCancelled = true;

            _context.Booking.Update(booking);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BookingExists(Guid id)
        {
            return _context.Booking.Any(e => e.Id == id);
        }
    }
}
