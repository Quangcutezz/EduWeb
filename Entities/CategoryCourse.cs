namespace course_edu_api.Entities
{
    public class CategoryCourse
    {
        public CategoryCourse()
        {
            this.CategoryName = string.Empty;
        }
        public CategoryCourse(string typeName)
        {
            CategoryName = typeName;
        }
        
        public CategoryCourse(long id, string typeName)
        {
            this.Id = id;
            this.CategoryName = typeName;
        }

        public long Id { get; set; }
        public string CategoryName { get; set; }
    }
}

