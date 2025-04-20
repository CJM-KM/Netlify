using CustomerJourneyMapper.API.Data;
using CustomerJourneyMapper.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CustomerJourneyMapper.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JourneyController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public JourneyController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Journey
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Journey>>> GetJourneys()
        {
            return await _context.Journeys
                .Include(j => j.Stages)
                    .ThenInclude(s => s.Touchpoints)
                        .ThenInclude(t => t.PainPoints)
                .Include(j => j.Stages)
                    .ThenInclude(s => s.Touchpoints)
                        .ThenInclude(t => t.Opportunities)
                .ToListAsync();
        }

        // GET: api/Journey/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Journey>> GetJourney(int id)
        {
            var journey = await _context.Journeys
                .Include(j => j.Stages)
                    .ThenInclude(s => s.Touchpoints)
                        .ThenInclude(t => t.PainPoints)
                .Include(j => j.Stages)
                    .ThenInclude(s => s.Touchpoints)
                        .ThenInclude(t => t.Opportunities)
                .FirstOrDefaultAsync(j => j.Id == id);

            if (journey == null)
            {
                return NotFound();
            }

            return journey;
        }

        // POST: api/Journey
        [HttpPost]
        public async Task<ActionResult<Journey>> PostJourney(Journey journey)
        {
            journey.CreatedAt = DateTime.UtcNow;
            journey.UpdatedAt = DateTime.UtcNow;

            _context.Journeys.Add(journey);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetJourney", new { id = journey.Id }, journey);
        }

        // PUT: api/Journey/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutJourney(int id, Journey journey)
        {
            if (id != journey.Id)
            {
                return BadRequest();
            }

            journey.UpdatedAt = DateTime.UtcNow;
            _context.Entry(journey).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!JourneyExists(id))
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

        // DELETE: api/Journey/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJourney(int id)
        {
            var journey = await _context.Journeys.FindAsync(id);
            if (journey == null)
            {
                return NotFound();
            }

            _context.Journeys.Remove(journey);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool JourneyExists(int id)
        {
            return _context.Journeys.Any(e => e.Id == id);
        }
    }
} 