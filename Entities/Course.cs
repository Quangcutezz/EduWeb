namespace course_edu_api.Entities
{
    public class Course
    {
        public Course(string title, string description, double price, string thumbnails, string adviseVideo)
        {
            Title = title;
            Description = description;
            Price = price;
            Thumbnails = thumbnails;
            AdviseVideo = adviseVideo;
        }

        public Course()
        {
            this.Title = string.Empty;
            this.Description = string.Empty;
            this.Price = 0;
            this.AdviseVideo = "";
            this.Thumbnails = "";
        }

        public Course(string title, string description, double price, string thumbnails, string adviseVideo, CategoryCourse categoryCourse)
        {
            Title = title;
            Description = description;
            Price = price;
            Thumbnails = thumbnails;
            AdviseVideo = adviseVideo;
            CategoryCourse = categoryCourse;
        }

        public Course(string title, string description, double price, string subTitle, string target, string requireSkill, string thumbnails, string adviseVideo, CategoryCourse categoryCourse)
        {
            Title = title;
            Description = description;
            Price = price;
            SubTitle = subTitle;
            Target = target;
            RequireSkill = requireSkill;
            Thumbnails = thumbnails;
            AdviseVideo = adviseVideo;
            CategoryCourse = categoryCourse;
        }
        public long Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public string SubTitle { get; set; } =  string.Empty;
        public string Target { get; set; } = string.Empty;
        public string RequireSkill { get; set; } =  string.Empty;
        public string Thumbnails { get; set; }
        public string AdviseVideo { get; set; }
        
        public CategoryCourse CategoryCourse { get; set; }
    }
}
