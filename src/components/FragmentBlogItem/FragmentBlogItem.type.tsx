import { Input, Textarea } from '@nextui-org/react';
import FragmentImgFileItem from './FragmentImgFileItem';
import ReactQuill from 'react-quill';
import { FaHeading } from 'react-icons/fa';
import { MdOutlineTextFields } from 'react-icons/md';
import { CiTextAlignLeft } from 'react-icons/ci';
import { FaRegImage } from 'react-icons/fa';
import { FaYoutube, FaFacebook } from 'react-icons/fa';

export enum FragmentBlogItemType {
   HEADING,
   IMAGE,
   TEXT_SIMPLE,
   TEXT_EDITOR,
   EMBED_FACEBOOK,
   EMBED_YOUTUBE,
}

export const fragmentBlogItemLabel = [
   {
      key: FragmentBlogItemType.HEADING,
      label: 'Tiêu đề',
      icon: <FaHeading className="text-xl" />,
      component: (
         <Input
            labelPlacement={'outside'}
            className="text-3xl"
            type="text"
            label=""
            placeholder="Nhập tiêu đề của bài viết..."
         />
      ),
   },
   {
      key: FragmentBlogItemType.IMAGE,
      label: 'Hình ảnh',
      icon: <FaRegImage className="text-xl" />,
      component: <FragmentImgFileItem />,
   },

   {
      key: FragmentBlogItemType.TEXT_SIMPLE,
      label: 'Văn bản đơn giản',
      icon: <MdOutlineTextFields className="text-xl" />,
      component: <Textarea labelPlacement={'outside'} className="w-full" placeholder="Nhập nội dung tại đây..." />,
   },
   {
      key: FragmentBlogItemType.TEXT_EDITOR,
      label: 'Văn bản có biên tập',
      component: <ReactQuill className="rounded-lg w-full bg-[#f4f4f5] dark:bg-[#27272a]" theme="snow" />,
      icon: <CiTextAlignLeft className="text-xl" />,
   },
   {
      key: FragmentBlogItemType.EMBED_YOUTUBE,
      label: 'Video YouTube',
      component: <Input labelPlacement={'outside'} className="" type="text" placeholder="Dán đường dẫn vào đây" />,
      icon: <FaYoutube className="text-xl" />,
   },
   {
      key: FragmentBlogItemType.EMBED_FACEBOOK,
      label: 'Nhúng Facebook',
      component: <Input labelPlacement={'outside'} className="" type="text" placeholder="Dán đường dẫn vào đây" />,
      icon: <FaFacebook className="text-xl" />,
   },
];
export interface IHeading {
   id?: number | string;
   content?: string;
   index: number;
   alt?: string;
   imgURL?: string;
   link?: string;
   type: FragmentBlogItemType.HEADING;
}

export interface IText {
   id?: number | string;
   content?: string;
   index: number;
   alt?: string;
   imgURL?: string;
   link?: string;
   type: FragmentBlogItemType.TEXT_SIMPLE;
}

export interface ITextEditor {
   id?: number | string;
   content?: string;
   index: number;
   alt?: string;
   imgURL?: string;
   link?: string;
   type: FragmentBlogItemType.TEXT_EDITOR;
}

export interface IYoutubeEmbed {
   id?: number | string;
   content?: string;
   index: number;
   alt?: string;
   imgURL?: string;
   link?: string;
   type: FragmentBlogItemType.EMBED_YOUTUBE;
}

export interface IFacebookEmbed {
   id?: number | string;
   index: number;
   content?: string;
   alt?: string;
   imgURL?: string;
   link?: string;
   type: FragmentBlogItemType.EMBED_FACEBOOK;
}

export interface IImage {
   id?: number | string;
   index: number;
   content?: string;
   alt?: string;
   imgURL?: string;
   link?: string;
   type: FragmentBlogItemType.IMAGE;
}

export type TypeItemPost = IHeading | IText | ITextEditor | IImage | IFacebookEmbed | IYoutubeEmbed;
