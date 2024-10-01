import { Card, Chip, Image, Link, User } from '@nextui-org/react';
import { IPostItem } from '../model/Post.model';
import { TbHistoryToggle } from 'react-icons/tb';
import { FragmentBlogItemType, TypeItemPost } from './FragmentBlogItem/FragmentBlogItem.type';
import RenderHTMLContent from './RenderHtmlContent';
import YouTubeEmbed from './FragmentBlogItem/YoutubeEmbed';
import FacebookEmbed from './FragmentBlogItem/FacebookEmbed';

type PostViewProps = {
   data: IPostItem;
};

export const getContentBlog = (data: TypeItemPost) => {
   switch (data.type) {
      case FragmentBlogItemType.HEADING: {
         return (
            <h1 key={data.id} className="text-3xl font-bold">
               {data.content}
            </h1>
         );
      }
      case FragmentBlogItemType.TEXT_SIMPLE: {
         return <p key={data.id}>{data.content}</p>;
      }
      case FragmentBlogItemType.TEXT_EDITOR: {
         return <RenderHTMLContent key={data.id} htmlContent={data.content ?? ''} />;
      }
      case FragmentBlogItemType.IMAGE: {
         return (
            <Link key={data.id} href={data?.link ?? ''} className="w-full">
               <Image width={'100%'} alt={data.alt} src={data.imgURL} className="rounded-t-xl w-full" />
            </Link>
         );
      }
      case FragmentBlogItemType.EMBED_YOUTUBE: {
         return <YouTubeEmbed key={data.id} videoId={'R_zMKRuQbM0'}></YouTubeEmbed>;
      }
      case FragmentBlogItemType.EMBED_FACEBOOK: {
         return <FacebookEmbed key={data.id}></FacebookEmbed>;
      }
      default:
         null;
   }
};
function BlogView(props: PostViewProps) {
   const { data } = props;

   return (
      <Card className=" max-w-[70rem] m-auto mt-5 select-none over mb-10">
         <Image
            width={'100%'}
            alt={data.title}
            src={data.thumbnail}
            className="rounded-t-xl "
            style={{
               height: '400px',
               objectFit: 'cover',
            }}
         />

         <div className="w-full p-4 flex flex-col gap-4 ">
            <div className="w-full flex justify-between items-center">
               <User
                  name={props.data.user?.email}
                  description={props.data.user?.fullName}
                  avatarProps={{
                     src: props.data.user?.avatar,
                  }}
               />

               <div className="flex flex-col gap-4 ">
                  <div className="flex justify-end items-center brightness-75 text-xs">
                     <TbHistoryToggle />

                     <h5>3 giờ trước</h5>
                  </div>

                  <div className="flex justify-start truncate items-center gap-2">
                     {data.tags.split(',').map((tag: string, index: number) => (
                        <Chip color="primary" variant="flat" key={index}>
                           # {tag}
                        </Chip>
                     ))}
                  </div>
               </div>
            </div>

            <h1 className="text-4xl font-semibold">{data.title}</h1>
            <p>{data.description}</p>

            {data.items && data.items.map((item: TypeItemPost) => getContentBlog(item))}
         </div>
      </Card>
   );
}

export default BlogView;
