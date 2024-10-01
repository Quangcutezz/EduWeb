namespace course_edu_api.Entities
{
    public class User
    {
        public User(string email, string password)
        {
            Email = email;
            Password = password;
        }

        public User(string email, string password, Role role)
        {
            Email = email;
            Password = password;
            this.Role = role;
        }
        public User()
        {
        }

        public long Id { get; set; }

        public string Email{ get; set; } = string.Empty;
        public string Password { get; set; } =  string.Empty;
        public Role Role { get; set; } =  Role.User;
        public string FirstName { get; set; } =  string.Empty;
        public string LastName { get; set; } =  string.Empty;
        public string Avatar { get; set; } =  string.Empty;
    }
}
