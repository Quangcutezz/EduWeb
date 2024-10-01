import { Button } from '@nextui-org/react';
import { motion } from 'framer-motion';
import ReactQuill from 'react-quill';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { IPostItem } from '../model/Post.model';
import { useEffect, useState } from 'react';
import { IComment } from '../model/Comment.model';
import { createComment, getAllCommentPost } from '../pages/post/service';
import RenderHTMLContent from './RenderHtmlContent';
import { useAuth } from '../context/authContext';

type DrawerBoxEditProps = {
   onCLose: () => void;
   post: IPostItem;
   initComment: IComment[];
};
export default function DrawerBoxEdit(props: DrawerBoxEditProps) {
   const [comments, setComments] = useState<IComment[]>(props.initComment);
   const [content, setContent] = useState('');
   const [isLoading, setIsLoading] = useState(false);
   const { user } = useAuth();

   const handleAddComment = async () => {
      const newComment = {
         content,
         user: user,
      };

      setIsLoading(true);
      if (!props.post.id) return;
      const res = await createComment(props.post.id, newComment);
      console.log(res);

      setIsLoading(false);
      if (res) {
         setComments((prev) => [...prev, { ...res }]);
         setContent('');
      }
   };

   return (
      <motion.div
         initial={{
            transform: 'translateX(100%)',
         }}
         animate={{
            transform: 'translateX(0%)',
         }}
         transition={{
            duration: 0.2,
         }}
         exit={{
            transform: 'translateX(100%)',
         }}
         className="fixed top-0 z-[10000000] bottom-0 right-0 w-1/2 light:bg-white/80 dark:bg-black/80 backdrop-blur-xl p-10 m-auto rounded-l-xl"
      >
         <Button
            className="absolute top-2 left-2"
            isIconOnly
            startContent={<FaLongArrowAltLeft className="text-xl" />}
            variant="flat"
            onClick={props.onCLose}
         />
         <h5 className="text-xl mt-10 font-extrabold mb-4">Nhập nội dung bình luận tại đây</h5>
         <ReactQuill
            onChange={(text) => setContent(text)}
            value={content}
            className="border-solid rounded-lg border-[1px] dark:bg-black bg-white"
         />

         <div className="flex mt-5 justify-end items-center gap-4">
            <Button color="danger" onClick={props.onCLose}>
               Hủy
            </Button>
            <Button isLoading={isLoading} onClick={handleAddComment} color="success" className="text-white">
               Bình luận
            </Button>
         </div>

         <div className="flex flex-col gap-4">
            {comments.map((comment, index) => (
               <div key={index} className="p-2 rounded-lg">
                  <RenderHTMLContent htmlContent={comment.content} />
               </div>
            ))}
         </div>
      </motion.div>
   );
}
