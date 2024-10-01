namespace course_edu_api.Entities;

public class NoteLesson
{
    public NoteLesson(string content, long timeSecond)
    {
        Content = content;
        TimeSecond = timeSecond;
    }

    public NoteLesson(string content, long timeSecond, long lessonId, long userId)
    {
        Content = content;
        TimeSecond = timeSecond;
        LessonId = lessonId;
        UserId = userId;
    }

    public long Id { get; set; }
    public string Content { get; set; }
    public long TimeSecond { get; set; }
    public long LessonId { get; set; }
    public long UserId { get; set; }
}