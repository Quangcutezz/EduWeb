using course_edu_api.Data;
using course_edu_api.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace course_edu_api.Controllers
{
    [Route("api/banner")]
    [ApiController]
    public class BannerController : ControllerBase
    {
        private readonly DataContext _context;
        
        public BannerController(DataContext context)
        {
            this._context = context;
        }
        
        [HttpGet]
        public async Task<ActionResult<List<Banner>>> GetCourses()
        {
            var banners = await _context.Banners.ToListAsync();
            return Ok(banners);
        }
        
        // GET: api/banner/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Banner>> GetBanner(int id)
        {
            var banner = await _context.Banners.FindAsync(id);

            if (banner == null)
            {
                return NotFound();
            }

            return Ok(banner);
        }

        // POST: api/banner
        [HttpPost]
        public async Task<ActionResult<Banner>> CreateBanner(Banner banner)
        {
            _context.Banners.Add(banner);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBanner), new { id = banner.Id }, banner);
        }

        // PUT: api/banner/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBanner(int id, Banner updatedBanner)
        {
            if (id != updatedBanner.Id)
            {
                return BadRequest();
            }

            _context.Entry(updatedBanner).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BannerExist(id))
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

        // DELETE: api/banenr/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBanner(int id)
        {
            var banner = await _context.Banners.FindAsync(id);

            if (banner == null)
            {
                return NotFound();
            }

            _context.Banners.Remove(banner);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BannerExist(int id)
        {
            return _context.Banners.Any(e => e.Id == id);
        }
    
    }
}

