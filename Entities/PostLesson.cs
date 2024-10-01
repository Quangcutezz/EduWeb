namespace course_edu_api.Entities;

public class PostLesson
{
    public PostLesson(Post post)
    {
        Post = post;
    }

    public long Id { get; set; }
    public Post Post { get; set; } 
}