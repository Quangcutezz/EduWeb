import React from 'react';
import { Card, CardBody, Image, Button, User } from '@nextui-org/react';
import { BsBookmark } from 'react-icons/bs';
import { BsFillBookmarkFill } from 'react-icons/bs';
import { path } from '../enum/path';
import { useRouter } from '../hook';
import { IPostItem } from '../model/Post.model';
import dayjs from 'dayjs';

type PostItemProps = {
   data: IPostItem;
};
export default function PostItem(props: PostItemProps) {
   const { data } = props;
   const router = useRouter();
   const [liked, setLiked] = React.useState(false);

   return (
      <Card isBlurred className="cursor-pointer border-none bg-background/60 dark:bg-default-100/50 w-full" shadow="sm">
         <CardBody
            onClick={() => {
               router.push(path.POST.DETAIL + '/' + props.data.id);
            }}
         >
            <div className="w-full">
               <div className="w-full flex justify-between items-center">
                  <User
                     name={data.user?.email}
                     description=""
                     avatarProps={{
                        src: data.user?.avatar,
                     }}
                  />
                  <div className="flex justify-end items-start">
                     <h5 className=" dark:text-white/50 text-black/50">{dayjs(data.createAt).format('DD/MM/YYYY')}</h5>
                     <Button
                        isIconOnly
                        className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                        radius="full"
                        variant="light"
                        onPress={() => setLiked((v) => !v)}
                     >
                        {!liked && <BsBookmark onClick={() => setLiked(!liked)} className="text-xl" />}
                        {liked && (
                           <BsFillBookmarkFill onClick={() => setLiked(!liked)} className="text-xl text-primary" />
                        )}
                     </Button>
                  </div>
               </div>
               <div className="w-full mt-5 flex justify-between items-start">
                  <div className="">
                     <h5 className="text-xl font-bold ">{data.title}</h5>
                     <h5 className="truncate text-md dark:text-white/50 text-black/50">{data.description}</h5>
                     <div className="flex  justify-start items-start gap-4 mt-5 truncate">
                        {data.tags.split(',').map((topic, index) => {
                           if (index < 3) {
                              return (
                                 <Button className="truncate" size="md" key={index}>
                                    {topic}
                                 </Button>
                              );
                           } else if (index === 3) {
                              return (
                                 <Button className="truncate" size="md" key={index}>
                                    ...
                                 </Button>
                              );
                           }
                        })}
                     </div>
                  </div>
                  <Image
                     alt="Album cover"
                     className="object-cover"
                     height={50}
                     width={200}
                     shadow="md"
                     src={data.thumbnail}
                  />
               </div>
            </div>
         </CardBody>
      </Card>
   );
}
