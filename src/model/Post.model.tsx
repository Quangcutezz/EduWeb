import { TypeItemPost } from '../components/FragmentBlogItem/FragmentBlogItem.type';
import { IComment } from './Comment.model';
import { IUser } from './User.model';

export type IPostItem = {
   id?: number | string;
   thumbnail: string;
   title: string;
   description: string;
   tags: string;
   items?: TypeItemPost[];
   status?: IStatusPost;
   isPin?: boolean;
   user?: IUser;
   isApproved?: boolean;
   createAt?: Date;
   approveAt?: Date;
   comments?: IComment[];
};
export type IPostRequest = {
   id?: number;
   userId?: number;
   thumbnail: string;
   title: string;
   description: string;
   tags: string;
   items: TypeItemPost[];
   status?: IStatusPost;
   isPin?: boolean;
};

export enum IStatusPost {
   WAIT_APPROVE,
   Published,
   REJECT,
}

export const MapColorStatusPost = {
   [IStatusPost.WAIT_APPROVE]: 'bg-primary/20',
   [IStatusPost.Published]: 'bg-green-600/20',
   [IStatusPost.REJECT]: 'bg-red-600/20',
};
export const MapTextColorStatusPost = {
   [IStatusPost.WAIT_APPROVE]: 'text-primary',
   [IStatusPost.Published]: 'text-green-600',
   [IStatusPost.REJECT]: 'text-red-600',
};
export const MapTitleStatusPost = {
   [IStatusPost.WAIT_APPROVE]: 'Chờ duyệt',
   [IStatusPost.Published]: 'Đã xuất bản',
   [IStatusPost.REJECT]: 'Bị từ chối',
};
