using course_edu_api.Data;
using course_edu_api.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace course_edu_api.Controllers
{
    [Route("api/lesson/note")]
    [ApiController]
    public class NoteLessonController : ControllerBase
    {
        private readonly DataContext _context;

        public NoteLessonController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> GetNoteByLessonIdAndUserId(long userId, long lessonId)
        {
            var noteLesson = await _context.NoteLessons
                .Where(n => n.UserId == userId && n.LessonId == lessonId)
                .ToListAsync();
            return Ok(noteLesson);
        }


        [HttpPost]
        public async Task<ActionResult> CreateNoteLesson(NoteLesson noteLesson)
        {
            _context.NoteLessons.Add(noteLesson);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetNoteByLessonIdAndUserId), new { userId = noteLesson.UserId, lessonId = noteLesson.LessonId }, noteLesson);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateNoteLesson(int id, NoteLesson updatedNoteLesson)
        {
            if (id != updatedNoteLesson.Id)
            {
                return BadRequest();
            }

            _context.Entry(updatedNoteLesson).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                return Ok("Updated successfully!");
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NoteLessonExist(id))
                {
                    return NotFound();
                }
                else
                {
                    return BadRequest();
                }
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNoteLesson(int id)
        {
            var noteLesson = await _context.NoteLessons.FindAsync(id);

            if (noteLesson == null)
            {
                return NotFound();
            }

            _context.NoteLessons.Remove(noteLesson);
            await _context.SaveChangesAsync();

            return Ok("Delete successfully!");
        }

        private bool NoteLessonExist(int id)
        {
            return _context.NoteLessons.Any(e => e.Id == id);
        }
    }
}
