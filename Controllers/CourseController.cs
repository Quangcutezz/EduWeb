using course_edu_api.Data;
using course_edu_api.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace course_edu_api.Controllers
{
    [Route("api/course")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private readonly DataContext _context;
        
        public CourseController(DataContext context)
        {
            this._context = context;
        }
        
        [HttpGet]
        public async Task<ActionResult> GetCourses()
        {
            var groupedCourses = await _context.Courses
                .Include(course => course.CategoryCourse)
                .GroupBy(course => course.CategoryCourse.CategoryName)
                .ToListAsync();

            var coursesGroupedByType = groupedCourses
                .SelectMany(group => group.Take(3))
                .ToList();


            return Ok(coursesGroupedByType);
        }
        
        // GET: api/course/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Course>> GetCourse(int id)
        {
            var course = await _context.Courses.FindAsync(id);

            if (course == null)
            {
                return NotFound();
            }

            return Ok(course);
        }

        // POST: api/course
        [HttpPost]
        public async Task<ActionResult<Course>> CreateCourse(Course course)
        {
            _context.Courses.Add(course);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCourse), new { id = course.Id }, course);
        }

        // PUT: api/course/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCourse(int id, Course updatedCourse)
        {
            if (id != updatedCourse.Id)
            {
                return BadRequest();
            }

            _context.Entry(updatedCourse).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CourseExists(id))
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
        public async Task<IActionResult> DeleteCourse(int id)
        {
            var course = await _context.Courses.FindAsync(id);

            if (course == null)
            {
                return NotFound();
            }

            _context.Courses.Remove(course);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CourseExists(int id)
        {
            return _context.Courses.Any(e => e.Id == id);
        }
        
    
    }
}

