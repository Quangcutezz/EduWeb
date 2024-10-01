namespace course_edu_api.Entities
{
    public class TypeCourse
    {
        public TypeCourse()
        {
            this.TypeName = string.Empty;
        }
        public TypeCourse(string typeName)
        {
            TypeName = typeName;
        }
        
        public TypeCourse(int id, string typeName)
        {
            this.Id = id;
            this.TypeName = typeName;
        }

        public int Id { get; set; }
        public string TypeName { get; set; }
    }
}

