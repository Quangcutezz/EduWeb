
using course_edu_api.Entities;
using Microsoft.EntityFrameworkCore;

namespace course_edu_api.Data
{
    public class DataContext: DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
            InitDataCategoryCourse();
            InitData();
            InitBanner();
        }

        public void InitBanner()
        {
            if (Banners.Any()) return;
            Banners.AddRange(new Banner().GetExampleData());
            SaveChanges();
        }

        private void InitDataCategoryCourse()
        {
            if (CategoriesCourse.Any()) return;
            var categoriesCourse = new CategoryCourse[]
            {
                new CategoryCourse( "Khóa học về SEO website"),
                new CategoryCourse( "Khóa học về Python"),
                new CategoryCourse( "Khóa học về NextJs"),
                new CategoryCourse( "Khóa học về SEO website"),
                new CategoryCourse( "Khóa học về Python"),
                new CategoryCourse( "Khóa học về Marketing")
            };
            CategoriesCourse.AddRange(categoriesCourse);
            SaveChanges();
        }

        private void InitData()
        {
            // Check if there are any existing courses
            if (Courses.Any() || !CategoriesCourse.Any()) return;

            var typeCourses =  CategoriesCourse.ToListAsync();
            
            var courses = new Course[]
            {
                new Course("Course 1", "Description 1", 109.99,"F8 duqc nhåc tdi d moi ndi, d dåu c6 cd håi viéc låm cho\nghé IT vå c6 nhüng con ngudi yéu thich lap trinh F8 sé d", "Cåc kién thüc cd bån, nen m6ng cüa ngånh IT, Cåc m6 hinh, kién trüc cd bån khi trién khai üng\ndung, Cåc khåi niém, thuat nga c6t löi khi trién khai (fng\ndung, Hiéu hdn ve cåch intemet vå måy vi tinh hoat döng", "Hoån thånh kh6a hoc Javascript cd bån tai F8 hoäc dä nåm chåc Javascript cd bån", "https://files.fullstack.edu.vn/f8-prod/courses/21/63e1bcbaed1dd.png", "video1.mp4", typeCourses.Result[0]),
                new Course("Course 6", "Description 6", 690.99,"F8 duqc nhåc tdi d moi ndi, d dåu c6 cd håi viéc låm cho\nghé IT vå c6 nhüng con ngudi yéu thich lap trinh F8 sé d", "Cåc kién thüc cd bån, nen m6ng cüa ngånh IT, Cåc m6 hinh, kién trüc cd bån khi trién khai üng\ndung, Cåc khåi niém, thuat nga c6t löi khi trién khai (fng\ndung, Hiéu hdn ve cåch intemet vå måy vi tinh hoat döng", "Hoån thånh kh6a hoc Javascript cd bån tai F8 hoäc dä nåm chåc Javascript cd bån","https://files.fullstack.edu.vn/f8-prod/courses/3.png", "video6.mp4", typeCourses.Result[1]),
                new Course("Course 8", "Description 8", 890.99,"F8 duqc nhåc tdi d moi ndi, d dåu c6 cd håi viéc låm cho\nghé IT vå c6 nhüng con ngudi yéu thich lap trinh F8 sé d", "Cåc kién thüc cd bån, nen m6ng cüa ngånh IT, Cåc m6 hinh, kién trüc cd bån khi trién khai üng\ndung, Cåc khåi niém, thuat nga c6t löi khi trién khai (fng\ndung, Hiéu hdn ve cåch intemet vå måy vi tinh hoat döng", "Hoån thånh kh6a hoc Javascript cd bån tai F8 hoäc dä nåm chåc Javascript cd bån", "https://files.fullstack.edu.vn/f8-prod/courses/7.png", "video8.mp4", typeCourses.Result[2]),
                new Course(
                   "Các chiến lược SEO hiệu quả",
                "Học cách áp dụng các chiến lược SEO hiệu quả để tăng lưu lượng truy cập và xếp hạng của trang web.",
                390.99,
                "F8 duqc nhåc tdi d moi ndi, d dåu c6 cd håi viéc låm cho\nghé IT vå c6 nhüng con ngudi yéu thich lap trinh F8 sé d", "Cåc kién thüc cd bån, nen m6ng cüa ngånh IT, Cåc m6 hinh, kién trüc cd bån khi trién khai üng\ndung, Cåc khåi niém, thuat nga c6t löi khi trién khai (fng\ndung, Hiéu hdn ve cåch intemet vå måy vi tinh hoat döng", "Hoån thånh kh6a hoc Javascript cd bån tai F8 hoäc dä nåm chåc Javascript cd bån",
                 "https://firebasestorage.googleapis.com/v0/b/appmapdemo-b2a39.appspot.com/o/course1.png?alt=media&token=0c9a050e-b9e4-4536-b535-52bcfc7875d2",
                "demo.mp5"
                    , typeCourses.Result[3]),
                
                new Course(
                    "Tối ưu hóa nội dung cho SEO",
                    "Học cách tối ưu hóa nội dung trang web để thu hút người đọc và cải thiện xếp hạng trên công cụ tìm kiếm.",
                    490.99,
                    "F8 duqc nhåc tdi d moi ndi, d dåu c6 cd håi viéc låm cho\nghé IT vå c6 nhüng con ngudi yéu thich lap trinh F8 sé d", "Cåc kién thüc cd bån, nen m6ng cüa ngånh IT, Cåc m6 hinh, kién trüc cd bån khi trién khai üng\ndung, Cåc khåi niém, thuat nga c6t löi khi trién khai (fng\ndung, Hiéu hdn ve cåch intemet vå måy vi tinh hoat döng", "Hoån thånh kh6a hoc Javascript cd bån tai F8 hoäc dä nåm chåc Javascript cd bån",
                    "https://firebasestorage.googleapis.com/v0/b/appmapdemo-b2a39.appspot.com/o/course2.png?alt=media&token=cf4935c1-3f16-433e-8a22-11623eca6242",
                    "demo.mp5"
                    , typeCourses.Result[3]),
                
                new Course(
                    "Xây dựng liên kết cho SEO",
                    "Học cách xây dựng và quản lý liên kết chất lượng để tăng cường sự uy tín và hiệu suất SEO của trang web.",
                    590.99,
                    "F8 duqc nhåc tdi d moi ndi, d dåu c6 cd håi viéc låm cho\nghé IT vå c6 nhüng con ngudi yéu thich lap trinh F8 sé d", "Cåc kién thüc cd bån, nen m6ng cüa ngånh IT, Cåc m6 hinh, kién trüc cd bån khi trién khai üng\ndung, Cåc khåi niém, thuat nga c6t löi khi trién khai (fng\ndung, Hiéu hdn ve cåch intemet vå måy vi tinh hoat döng", "Hoån thånh kh6a hoc Javascript cd bån tai F8 hoäc dä nåm chåc Javascript cd bån",
                    "https://firebasestorage.googleapis.com/v0/b/appmapdemo-b2a39.appspot.com/o/course3.png?alt=media&token=81cf5da0-dc7f-416a-ae26-abc2634280c4",
                    "demo.mp5"
                    , typeCourses.Result[3]),
                
                new Course(
                    "Phân tích và đánh giá hiệu suất SEO",
                    "Học cách phân tích và đánh giá hiệu suất của chiến lược SEO để điều chỉnh và cải thiện kết quả.",
                    540.99,
                    "F8 duqc nhåc tdi d moi ndi, d dåu c6 cd håi viéc låm cho\nghé IT vå c6 nhüng con ngudi yéu thich lap trinh F8 sé d", "Cåc kién thüc cd bån, nen m6ng cüa ngånh IT, Cåc m6 hinh, kién trüc cd bån khi trién khai üng\ndung, Cåc khåi niém, thuat nga c6t löi khi trién khai (fng\ndung, Hiéu hdn ve cåch intemet vå måy vi tinh hoat döng", "Hoån thånh kh6a hoc Javascript cd bån tai F8 hoäc dä nåm chåc Javascript cd bån",
                    "https://firebasestorage.googleapis.com/v0/b/appmapdemo-b2a39.appspot.com/o/course4.png?alt=media&token=2c90bb76-11ef-4e9b-b0ea-fb654abb26f3",
                    "//demo.mp5"
                    , typeCourses.Result[3]),
                
                new Course(
                    "Sử dụng công cụ SEO hiệu quả",
                    "Học cách sử dụng các công cụ và tài nguyên SEO để tối ưu hóa trang web một cách hiệu quả và tự động hóa các quy trình.",
                    690.99,
                    "F8 duqc nhåc tdi d moi ndi, d dåu c6 cd håi viéc låm cho\nghé IT vå c6 nhüng con ngudi yéu thich lap trinh F8 sé d", "Cåc kién thüc cd bån, nen m6ng cüa ngånh IT, Cåc m6 hinh, kién trüc cd bån khi trién khai üng\ndung, Cåc khåi niém, thuat nga c6t löi khi trién khai (fng\ndung, Hiéu hdn ve cåch intemet vå måy vi tinh hoat döng", "Hoån thånh kh6a hoc Javascript cd bån tai F8 hoäc dä nåm chåc Javascript cd bån",
                    "https://firebasestorage.googleapis.com/v0/b/appmapdemo-b2a39.appspot.com/o/course5.png?alt=media&token=59c3f771-eb23-4f6a-a834-666a56df0796",
                          "//demo.mp5"
                    , typeCourses.Result[3]),
                
                new Course(
                    "Python cơ bản cho người mới bắt đầu",
                    "Học cách lập trình Python từ cơ bản, bao gồm cú pháp, cấu trúc dữ liệu và các khái niệm quan trọng khác.",
                    209.99,
                    "F8 duqc nhåc tdi d moi ndi, d dåu c6 cd håi viéc låm cho\nghé IT vå c6 nhüng con ngudi yéu thich lap trinh F8 sé d", "Cåc kién thüc cd bån, nen m6ng cüa ngånh IT, Cåc m6 hinh, kién trüc cd bån khi trién khai üng\ndung, Cåc khåi niém, thuat nga c6t löi khi trién khai (fng\ndung, Hiéu hdn ve cåch intemet vå måy vi tinh hoat döng", "Hoån thånh kh6a hoc Javascript cd bån tai F8 hoäc dä nåm chåc Javascript cd bån",
                   " https://firebasestorage.googleapis.com/v0/b/appmapdemo-b2a39.appspot.com/o/python_course1.png?alt=media&token=b33921b2-3016-42f6-9c96-1acd9951b35a",
                          "//demo.mp5"
                    , typeCourses.Result[4]),
                new Course(
                    "Python nâng cao: Lập trình đối tượng và ứng dụng thực tế",
                    "Tiếp tục học về Python với các khái niệm nâng cao như lập trình đối tượng và áp dụng trong các dự án thực tế.",
                    390.99,
                    "F8 duqc nhåc tdi d moi ndi, d dåu c6 cd håi viéc låm cho\nghé IT vå c6 nhüng con ngudi yéu thich lap trinh F8 sé d", "Cåc kién thüc cd bån, nen m6ng cüa ngånh IT, Cåc m6 hinh, kién trüc cd bån khi trién khai üng\ndung, Cåc khåi niém, thuat nga c6t löi khi trién khai (fng\ndung, Hiéu hdn ve cåch intemet vå måy vi tinh hoat döng", "Hoån thånh kh6a hoc Javascript cd bån tai F8 hoäc dä nåm chåc Javascript cd bån",
                    "https://firebasestorage.googleapis.com/v0/b/appmapdemo-b2a39.appspot.com/o/python_course2.png?alt=media&token=4c2b0e3d-b737-4454-81c5-1204aa31bf88",
                            "//demo.mp5"
                    , typeCourses.Result[4]),
                
                new Course(
                    "Python và Machine Learning",
                    "Học cách sử dụng Python cho machine learning và deep learning với thư viện như TensorFlow và Keras.",
                    490.99,
                    "F8 duqc nhåc tdi d moi ndi, d dåu c6 cd håi viéc låm cho\nghé IT vå c6 nhüng con ngudi yéu thich lap trinh F8 sé d", "Cåc kién thüc cd bån, nen m6ng cüa ngånh IT, Cåc m6 hinh, kién trüc cd bån khi trién khai üng\ndung, Cåc khåi niém, thuat nga c6t löi khi trién khai (fng\ndung, Hiéu hdn ve cåch intemet vå måy vi tinh hoat döng", "Hoån thånh kh6a hoc Javascript cd bån tai F8 hoäc dä nåm chåc Javascript cd bån",
                    "https://firebasestorage.googleapis.com/v0/b/appmapdemo-b2a39.appspot.com/o/python_course3.png?alt=media&token=755a4640-6507-4f56-8a3d-d9bd1f3369cd",
                    "//demo.mp5"
                    , typeCourses.Result[4]),
                
                new Course(
                    "Web Development với Python và Django",
                    "Học cách xây dựng ứng dụng web sử dụng Python và framework Django từ đầu đến cuối.",
                    590.99,
                    "F8 duqc nhåc tdi d moi ndi, d dåu c6 cd håi viéc låm cho\nghé IT vå c6 nhüng con ngudi yéu thich lap trinh F8 sé d", "Cåc kién thüc cd bån, nen m6ng cüa ngånh IT, Cåc m6 hinh, kién trüc cd bån khi trién khai üng\ndung, Cåc khåi niém, thuat nga c6t löi khi trién khai (fng\ndung, Hiéu hdn ve cåch intemet vå måy vi tinh hoat döng", "Hoån thånh kh6a hoc Javascript cd bån tai F8 hoäc dä nåm chåc Javascript cd bån",
                    "https://firebasestorage.googleapis.com/v0/b/appmapdemo-b2a39.appspot.com/o/python_course4.png?alt=media&token=f6f5bc68-107e-4701-9f33-4a0f48afdf6a",
                    "//demo.mp5"
                    , typeCourses.Result[4]),
                
                new Course(
                    "Python và Data Analysis",
                    "Học cách sử dụng Python cho phân tích dữ liệu và trực quan hóa với các thư viện như Pandas và Matplotlib.",
                    690.99,
                    "F8 duqc nhåc tdi d moi ndi, d dåu c6 cd håi viéc låm cho\nghé IT vå c6 nhüng con ngudi yéu thich lap trinh F8 sé d", "Cåc kién thüc cd bån, nen m6ng cüa ngånh IT, Cåc m6 hinh, kién trüc cd bån khi trién khai üng\ndung, Cåc khåi niém, thuat nga c6t löi khi trién khai (fng\ndung, Hiéu hdn ve cåch intemet vå måy vi tinh hoat döng", "Hoån thånh kh6a hoc Javascript cd bån tai F8 hoäc dä nåm chåc Javascript cd bån",
                    "https://firebasestorage.googleapis.com/v0/b/appmapdemo-b2a39.appspot.com/o/python_course5.png?alt=media&token=dbb0cc4d-11a2-4a2a-b2e9-1bbfbc153d6e",
                    "//demo.mp5"
                    , typeCourses.Result[4]),
                
                
                new Course(
                    "Marketing cơ bản: Nền tảng và chiến lược",
                    "Học cách xây dựng nền tảng và chiến lược marketing cơ bản để phát triển doanh nghiệp.",
                    490.99,
                    "F8 duqc nhåc tdi d moi ndi, d dåu c6 cd håi viéc låm cho\nghé IT vå c6 nhüng con ngudi yéu thich lap trinh F8 sé d", "Cåc kién thüc cd bån, nen m6ng cüa ngånh IT, Cåc m6 hinh, kién trüc cd bån khi trién khai üng\ndung, Cåc khåi niém, thuat nga c6t löi khi trién khai (fng\ndung, Hiéu hdn ve cåch intemet vå måy vi tinh hoat döng", "Hoån thånh kh6a hoc Javascript cd bån tai F8 hoäc dä nåm chåc Javascript cd bån",
                    "https://firebasestorage.googleapis.com/v0/b/appmapdemo-b2a39.appspot.com/o/marketing_course1.png?alt=media&token=48197284-a003-4fcf-86d3-d273f139e658",
                    "//demo.mp5"
                    , typeCourses.Result[5]),

                new Course(
                    "Content Marketing và SEO",
                    "Học cách sử dụng content marketing và SEO để tăng tương tác và hiệu suất của trang web.",
                    590.99,
                    "F8 duqc nhåc tdi d moi ndi, d dåu c6 cd håi viéc låm cho\nghé IT vå c6 nhüng con ngudi yéu thich lap trinh F8 sé d", "Cåc kién thüc cd bån, nen m6ng cüa ngånh IT, Cåc m6 hinh, kién trüc cd bån khi trién khai üng\ndung, Cåc khåi niém, thuat nga c6t löi khi trién khai (fng\ndung, Hiéu hdn ve cåch intemet vå måy vi tinh hoat döng", "Hoån thånh kh6a hoc Javascript cd bån tai F8 hoäc dä nåm chåc Javascript cd bån",
                    "https://firebasestorage.googleapis.com/v0/b/appmapdemo-b2a39.appspot.com/o/marketing_course2.png?alt=media&token=9de9bb73-4c8b-4281-a7ea-b26022ecc3ad",
                    "//demo.mp5"
                    , typeCourses.Result[5]),
                
                new Course(
                    "Quảng cáo trực tuyến và Google Ads",
                    "Học cách tạo và quản lý quảng cáo trực tuyến sử dụng Google Ads để tăng lưu lượng truy cập và doanh số bán hàng.",
                    690.99,
                    "F8 duqc nhåc tdi d moi ndi, d dåu c6 cd håi viéc låm cho\nghé IT vå c6 nhüng con ngudi yéu thich lap trinh F8 sé d", "Cåc kién thüc cd bån, nen m6ng cüa ngånh IT, Cåc m6 hinh, kién trüc cd bån khi trién khai üng\ndung, Cåc khåi niém, thuat nga c6t löi khi trién khai (fng\ndung, Hiéu hdn ve cåch intemet vå måy vi tinh hoat döng", "Hoån thånh kh6a hoc Javascript cd bån tai F8 hoäc dä nåm chåc Javascript cd bån",
                    "https://firebasestorage.googleapis.com/v0/b/appmapdemo-b2a39.appspot.com/o/marketing_course3.png?alt=media&token=caed6bdb-27fb-479a-83ca-cfbcb9258b56",
                    "//demo.mp5"
                    , typeCourses.Result[5]),
                
                new Course(
                    "Email Marketing và Automation",
                    "Học cách sử dụng email marketing và các công cụ tự động hóa để tối ưu hóa chiến lược tiếp thị qua email.",
                    790.99,
                    "F8 duqc nhåc tdi d moi ndi, d dåu c6 cd håi viéc låm cho\nghé IT vå c6 nhüng con ngudi yéu thich lap trinh F8 sé d", "Cåc kién thüc cd bån, nen m6ng cüa ngånh IT, Cåc m6 hinh, kién trüc cd bån khi trién khai üng\ndung, Cåc khåi niém, thuat nga c6t löi khi trién khai (fng\ndung, Hiéu hdn ve cåch intemet vå måy vi tinh hoat döng", "Hoån thånh kh6a hoc Javascript cd bån tai F8 hoäc dä nåm chåc Javascript cd bån",
                    "https://firebasestorage.googleapis.com/v0/b/appmapdemo-b2a39.appspot.com/o/marketing_course4.png?alt=media&token=914af0dc-1660-4c9c-ba37-db2f5ab8a39a",
                    "//demo.mp5"
                    , typeCourses.Result[5]),
                
                new Course(
                    "Marketing trên mạng xã hội",
                    "Học cách xây dựng và quản lý chiến lược tiếp thị trên các nền tảng mạng xã hội như Facebook, Instagram và Twitter.",
                    890.99,
                    "F8 duqc nhåc tdi d moi ndi, d dåu c6 cd håi viéc låm cho\nghé IT vå c6 nhüng con ngudi yéu thich lap trinh F8 sé d", "Cåc kién thüc cd bån, nen m6ng cüa ngånh IT, Cåc m6 hinh, kién trüc cd bån khi trién khai üng\ndung, Cåc khåi niém, thuat nga c6t löi khi trién khai (fng\ndung, Hiéu hdn ve cåch intemet vå måy vi tinh hoat döng", "Hoån thånh kh6a hoc Javascript cd bån tai F8 hoäc dä nåm chåc Javascript cd bån",
                    "https://firebasestorage.googleapis.com/v0/b/appmapdemo-b2a39.appspot.com/o/marketing_course5.png?alt=media&token=f71eb891-b666-4ade-9621-573bf0a32323",
                    "//demo.mp5"
                    , typeCourses.Result[5]),

            };
            // Add initial courses if the database is empty
            Courses.AddRange(courses);
            SaveChanges();
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<CategoryCourse> CategoriesCourse { get; set; }
        public DbSet<Banner> Banners { get; set; }
        public DbSet<Post> Post { get; set; }
        public DbSet<NoteLesson> NoteLessons { get; set; }
    }
}
