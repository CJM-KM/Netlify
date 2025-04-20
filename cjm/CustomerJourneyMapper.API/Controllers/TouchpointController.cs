using CustomerJourneyMapper.API.Data;
using CustomerJourneyMapper.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CustomerJourneyMapper.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TouchpointController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TouchpointController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Touchpoint
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Touchpoint>>> GetTouchpoints()
        {
            return await _context.Touchpoints
                .Include(t => t.PainPoints)
                .Include(t => t.Opportunities)
                .ToListAsync();
        }

        // GET: api/Touchpoint/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Touchpoint>> GetTouchpoint(int id)
        {
            var touchpoint = await _context.Touchpoints
                .Include(t => t.PainPoints)
                .Include(t => t.Opportunities)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (touchpoint == null)
            {
                return NotFound();
            }

            return touchpoint;
        }

        // POST: api/Touchpoint
        [HttpPost]
        public async Task<ActionResult<Touchpoint>> PostTouchpoint(Touchpoint touchpoint)
        {
            _context.Touchpoints.Add(touchpoint);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTouchpoint", new { id = touchpoint.Id }, touchpoint);
        }

        // PUT: api/Touchpoint/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTouchpoint(int id, Touchpoint touchpoint)
        {
            if (id != touchpoint.Id)
            {
                return BadRequest();
            }

            _context.Entry(touchpoint).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TouchpointExists(id))
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

        // DELETE: api/Touchpoint/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTouchpoint(int id)
        {
            var touchpoint = await _context.Touchpoints.FindAsync(id);
            if (touchpoint == null)
            {
                return NotFound();
            }

            _context.Touchpoints.Remove(touchpoint);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TouchpointExists(int id)
        {
            return _context.Touchpoints.Any(e => e.Id == id);
        }
    }
} 