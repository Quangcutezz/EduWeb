namespace course_edu_api.Entities;

public class Answer
{
    public Answer(int index, string content)
    {
        this.Content = content;
        this.Index = index;
    }
    
    private long Id { get; set; }
    private int Index { get; set; }
    private string Content { get; set; }
}