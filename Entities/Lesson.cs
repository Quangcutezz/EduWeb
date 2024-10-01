using System.Collections;
using course_edu_api.Entities.Enum;

namespace course_edu_api.Entities;

public class Lesson
{
    public Lesson (VideoLesson video, PostLesson post)
    {
        Video = video;
        Post = post;
    }

    public Lesson(TypeLesson type, string title, string description, QuizzLesson quizz, VideoLesson video, PostLesson post)
    {
        Type = type;
        Title = title;
        Description = description;
        Quizz = quizz;
        Video = video;
        Post = post;
    }


    public Lesson(TypeLesson type, string title, string description, PostLesson post, VideoLesson video)
    {
        Type = type;
        Title = title;
        Description = description;
        Post = post;
        Video = video;
    }

    public Lesson(TypeLesson type, string title, string description, VideoLesson video, PostLesson post)
    {
        Type = type;
        Title = title;
        Description = description;
        Video = video;
        Post = post;
    }

    public long Id { get; set; }
    public TypeLesson Type { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public QuizzLesson Quizz { get; set; }
    public VideoLesson Video { get; set; }
    public PostLesson Post { get; set; }
}


