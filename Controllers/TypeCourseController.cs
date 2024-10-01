using course_edu_api.Data;
using course_edu_api.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace course_edu_api.Controllers
{
    [Route("api/type-course")]
    [ApiController]
    public class TypeCourseController : ControllerBase
    {
        private readonly DataContext _context;
        
        public TypeCourseController(DataContext context)
        {
            this._context = context;
        }
        
        [HttpGet]
        public async Task<ActionResult<List<TypeCourse>>> GetCourses()
        {
            var typeCourses = await _context.TypeCourses.ToListAsync();
            return Ok(typeCourses);
        }
        
        // GET: api/type-course/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<TypeCourse>> GetCourse(int id)
        {
            var course = await _context.TypeCourses.FindAsync(id);

            if (course == null)
            {
                return NotFound();
            }

            return Ok(course);
        }

        // POST: api/course
        [HttpPost]
        public async Task<ActionResult<TypeCourse>> CreateTypeCourse(TypeCourse typeCourse)
        {
            _context.TypeCourses.Add(typeCourse);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCourse), new { id = typeCourse.Id }, typeCourse);
        }

        // PUT: api/type-course/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCourse(int id, TypeCourse updatedTypeCourse)
        {
            if (id != updatedTypeCourse.Id)
            {
                return BadRequest();
            }

            _context.Entry(updatedTypeCourse).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TypeCourseExists(id))
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

        // DELETE: api/course/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTypeCourse(int id)
        {
            var typeCourse = await _context.TypeCourses.FindAsync(id);

            if (typeCourse == null)
            {
                return NotFound();
            }

            _context.TypeCourses.Remove(typeCourse);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TypeCourseExists(int id)
        {
            return _context.TypeCourses.Any(e => e.Id == id);
        }
    
    }
}

