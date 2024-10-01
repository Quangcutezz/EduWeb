namespace course_edu_api.Entities;

public class QuizzLesson
{
    public QuizzLesson(string question, List<Answer> answers, int correctAnswerIndex, string explain)
    {
        Question = question;
        Answers = answers;
        CorrectAnswerIndex = correctAnswerIndex;
        Explain = explain;
    }
    
    public long Id { get; set; }
    public string Question { get; set; }
    public List<Answer> Answers { get; set; }
    public int CorrectAnswerIndex { get; set; }
    public string Explain { get; set; }
    
}

