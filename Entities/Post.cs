
namespace course_edu_api.Entities
{
    public class Post
    {
        public Post()
        {
            IsPin = false;
        }

        public Post(string? title, string? tags, string? thumbnails, User? user)
        {
            Title = title;
            Thumbnails = thumbnails;
            User = user;
            Tags = tags;
            IsPin = false;
        }

        public long Id { get; set; }
        public string? Title { get; set; }
        public string? Tags { get; set; }
        public string? StatePost { get; set; }
        public string? Thumbnails { get; set; }
        public Boolean IsPin { get; set; }
        public User? User { get; set; }
        
        public List<SubItemPost>? Items { get; set; }
        
    }
}
