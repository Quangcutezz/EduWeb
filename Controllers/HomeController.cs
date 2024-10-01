using course_edu_api.Data;
using course_edu_api.Data.ResponseModels;
using course_edu_api.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace course_edu_api.Controllers
{
    [Route("api/home")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly DataContext _context;
        
        public HomeController(DataContext context)
        {
            this._context = context;
        }
        
        [HttpGet]
        public async Task<ActionResult> GetHome()
        {
            var size = 10;
            var typeCourses = await _context.CategoriesCourse.ToListAsync();
            var homeResponse = new HomeResponse();
            var courseResList = new List<CourseResponse>();

            foreach (var type in typeCourses)
            {
                var courseRes = new CourseResponse();
                var courses = await GetCourseByType(type, size); 
                courseRes.CategoryCourse = type;
                courseRes.Courses = courses;
                courseResList.Add(courseRes);
            }

            var banners = _context.Banners.ToListAsync();

            homeResponse.CourseRes = courseResList;
            homeResponse.CategoriesCourse = typeCourses;
            homeResponse.Banners = banners.Result;
    
            return Ok(homeResponse);
        }

        private async Task<Course[]> GetCourseByType(CategoryCourse categoryCourse, int size)
        {
            var courses = await _context.Courses
                .Include(course => course.CategoryCourse)
                .Where(course => course.CategoryCourse.CategoryName == categoryCourse.CategoryName)
                .Take(size) 
                .ToArrayAsync();

            return courses;
        }

        
    }
}

