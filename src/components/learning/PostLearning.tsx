import { ILesson } from '../../model/Course.model';
import { TypeItemPost } from '../FragmentBlogItem/FragmentBlogItem.type';
import { getContentBlog } from '../PostView';

type PostViewProps = {
   data: ILesson;
};

function BlogView(props: PostViewProps) {
   const { data } = props;

   return (
      <div
         style={{
            height: 'calc(100vh - 10rem)',
         }}
         className="overflow-auto overflow-x-hidden "
      >
         <div className="w-full flex justify-start items-start flex-col gap-4 pl-28 pr-28 pt-10 pb-20 ">
            <h1 className="text-4xl font-semibold">{data.title}</h1>
            <p>{data.description}</p>
            {data.post && data.post.items && data.post.items.map((item: TypeItemPost) => getContentBlog(item))}
         </div>
      </div>
   );
}

export default BlogView;
