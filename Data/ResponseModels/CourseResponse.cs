using course_edu_api.Entities;

namespace course_edu_api.Data.ResponseModels;

public class CourseResponse
{
    public CourseResponse()
    {
    }

    public CourseResponse(CategoryCourse categoryCourse, Course[] courses)
    {
        CategoryCourse = categoryCourse;
        Courses = courses;
    }

    public CourseResponse(CategoryCourse categoryCourse, Course[] courses, int size, int page)
    {
        CategoryCourse = categoryCourse;
        Courses = courses;
        Size = size;
        Page = page;
    }

    public CategoryCourse CategoryCourse { get; set; }
    public Course[] Courses { get; set; }
    public int Size { get; set; }
    public int Page { get; set; }
}