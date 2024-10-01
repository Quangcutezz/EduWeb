import { Button } from '@nextui-org/react';
import BlogItem from '../../components/PostItem';
import { useEffect, useState } from 'react';
import { IPostItem } from '../../model/Post.model';
import { getAllPostApprove } from './service';
import { Helmet } from 'react-helmet-async';

function ViewPost() {
   const [posts, setPosts] = useState<IPostItem[]>([]);

   useEffect(() => {
      const initData = async () => {
         const res = await getAllPostApprove();
         setPosts(res);
      };
      initData();
   }, []);

   const topics = ['UX/UI design', 'Study English', 'SEO website', 'Other...'];
   return (
      <div className="pl-32 pr-32 mt-5 w-full">
         <Helmet>
            <title>Bài viết hay tổng hợp</title>
            <meta name="description" content={'Bài viết hay tổng hợp'} />
            <meta name="keywords" content={'Bài viết hay tổng hợp'} />
         </Helmet>
         <h5 className="text-3xl font-extrabold">Bài viết mới nhất</h5>
         <h5 className="">
            Tổng hợp các bài viết chia sẻ về kinh nghiệm tự học lập trình online và các kỹ thuật lập trình web.
         </h5>
         <div className=" flex justify-between items-start mt-5 w-full gap-10">
            <div className="flex flex-col gap-4 w-full">
               {posts.map((post, index) => (
                  <BlogItem data={post} key={index} />
               ))}
            </div>

            <div className="relative w-2/5 ">
               <h5 className="text-xl font-bold dark:text-white/50  text-black/50">CÁC CHỦ ĐỀ ĐƯỢC ĐỀ XUẤT</h5>
               <div className="grid grid-cols-3 gap-4 mt-5">
                  {topics.map((topic, index) => (
                     <Button size="md" key={index}>
                        {topic}
                     </Button>
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
}

export default ViewPost;
