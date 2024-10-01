import { FragmentBlogItemType, TypeItemPost, fragmentBlogItemLabel } from './FragmentBlogItem.type';
import { BsArrowsMove } from 'react-icons/bs';
import { RiCloseCircleLine } from 'react-icons/ri';
import { Input, Textarea } from '@nextui-org/react';
import FragmentImgFileItem from './FragmentImgFileItem';
import ReactQuill from 'react-quill';

type FragmentBlogItemProps = {
   type: FragmentBlogItemType;
   onRemove: (id: number) => void;
   data: TypeItemPost;
   onChangeData: (data: {
      content?: string;
      link?: string;
      alt?: string;
      imgURL?: string;
      type?: FragmentBlogItemType;
   }) => void;
};

const getLabel = (type: FragmentBlogItemType): string => {
   return fragmentBlogItemLabel.find((fra) => fra.key === type)?.label ?? '';
};

function FragmentBlogItem(props: FragmentBlogItemProps) {
   const getComponentItem = (type: FragmentBlogItemType): React.ReactNode => {
      switch (type) {
         case FragmentBlogItemType.HEADING: {
            return (
               <Input
                  onChange={(e) =>
                     props.onChangeData({
                        content: e.target.value,
                        alt: '',
                        imgURL: '',
                        link: '',
                        type: FragmentBlogItemType.HEADING,
                     })
                  }
                  labelPlacement={'outside'}
                  className="text-3xl"
                  type="text"
                  label=""
                  placeholder="Nhập tiêu đề của bài viết..."
               />
            );
         }
         case FragmentBlogItemType.IMAGE: {
            return (
               <FragmentImgFileItem
                  onChangeData={(data: { link?: string; alt?: string; imgURL?: string; content?: string }) =>
                     props.onChangeData({
                        ...data,
                        content: '',
                        type: FragmentBlogItemType.IMAGE,
                     })
                  }
               />
            );
         }
         case FragmentBlogItemType.TEXT_SIMPLE: {
            return (
               <Textarea
                  onChange={(e) =>
                     props.onChangeData({
                        content: e.target.value,
                        alt: '',
                        imgURL: '',
                        link: '',
                        type: FragmentBlogItemType.TEXT_SIMPLE,
                     })
                  }
                  labelPlacement={'outside'}
                  disableAnimation
                  classNames={{
                     base: 'w-full h-max',
                     input: 'resize-y min-h-[100px]',
                  }}
                  placeholder="Nhập nội dung tại đây..."
               />
            );
         }
         case FragmentBlogItemType.TEXT_EDITOR: {
            return (
               <ReactQuill
                  onChange={(val) =>
                     props.onChangeData({
                        content: val,
                        alt: '',
                        imgURL: '',
                        link: '',
                        type: FragmentBlogItemType.TEXT_EDITOR,
                     })
                  }
                  className="rounded-lg w-full bg-[#f4f4f5] dark:bg-[#27272a]"
                  theme="snow"
               />
            );
         }

         case FragmentBlogItemType.EMBED_YOUTUBE: {
            return (
               <Input
                  onChange={(e) =>
                     props.onChangeData({
                        link: e.target.value,
                        alt: '',
                        imgURL: '',
                        content: '',
                        type: FragmentBlogItemType.EMBED_YOUTUBE,
                     })
                  }
                  labelPlacement={'outside'}
                  className=""
                  type="text"
                  placeholder="Dán đường dẫn vào đây"
               />
            );
         }

         case FragmentBlogItemType.EMBED_FACEBOOK: {
            return (
               <Input
                  onChange={(e) =>
                     props.onChangeData({
                        link: e.target.value,
                        alt: '',
                        imgURL: '',
                        content: '',
                        type: FragmentBlogItemType.EMBED_FACEBOOK,
                     })
                  }
                  labelPlacement={'outside'}
                  className=""
                  type="text"
                  placeholder="Dán đường dẫn vào đây"
               />
            );
         }

         default:
            return null;
      }
   };

   return (
      <div className="flex w-full justify-between items-start gap-10">
         <div className="flex flex-shrink-0 w-[86%] justify-start items-start">
            <h5 className="min-w-[13rem]">{getLabel(props.type)} : </h5>
            {getComponentItem(props.type)}
         </div>
         <div className="flex  justify-end items-center gap-5">
            <RiCloseCircleLine
               className="text-xl hover:text-primary cursor-pointer"
               onClick={() => {
                  props.data?.id && props.onRemove(+props.data.id);
               }}
            />
            <BsArrowsMove className="text-xl cursor-grab hover:text-blue-600" />
         </div>
      </div>
   );
}

export default FragmentBlogItem;
