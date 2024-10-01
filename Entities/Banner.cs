namespace course_edu_api.Entities
{
    public class Banner
    {
        public Banner()
        {
        }

        public Banner(string title, string subtitle, string thumbnails, string linkAction, string btnTitle, string startColor, string endColor)
        {
            Title = title;
            Subtitle = subtitle;
            Thumbnails = thumbnails;
            ActionLink = linkAction;
            BtnTitle = btnTitle;
            StartColor = startColor;
            EndColor = endColor;
        }
  
        public long Id { get; set; }
        public string Title { get; set; }
        public string Subtitle { get; set; }
        public string Thumbnails { get; set; }
        public string ActionLink { get; set; }
        public string BtnTitle { get; set; }
        public string StartColor { get; set; }
        public string EndColor { get; set; }
        
        //
        public List<Banner> GetExampleData()
        {
            var banners = new List<Banner>();

            banners.Add(new Banner(
                "New Skill with Course EDU",
                "Miễn phí tài nguyên, dễ dàng đăng ký và tự học",
                "https://firebasestorage.googleapis.com/v0/b/appmapdemo-b2a39.appspot.com/o/Green%20Modern%20Course%20Banner.png?alt=media&token=15e469bf-ec6b-4594-972a-cb207e3e9cac",
                "/",
                "Học ngay",
                "#fe6ba4",
                "#8b65dc"
            ));
            
            banners.Add(new Banner(
                "Course EDU đăng ký ngay",
                "Course EDU với nhiều khóa học miễn phí, bao gồm tài liệu, bài làm và video ,...",
                "https://firebasestorage.googleapis.com/v0/b/appmapdemo-b2a39.appspot.com/o/Green%20Modern%20Course%20Banner%20(2).png?alt=media&token=c5a1f91c-af19-48e2-b8c6-581726a7af21",
                "/",
                "Tham gia ngay",
                "#fe6ba4",
                "#8b65dc"
            ));

            return banners;
        }
    }
}
