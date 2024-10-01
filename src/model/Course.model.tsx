import { TypeItemPost } from '../components/FragmentBlogItem/FragmentBlogItem.type';
import { ICategoryCourse } from './Common.model';
import { IUser } from './User.model';

export type ICourse = {
   id?: number;
   title: string;
   description: string;
   subTitle: string;
   thumbnail: string;
   price: number;
   adviseVideo: string;
   categoryCourse: ICategoryCourse;
   status: IStatusCourse;
   requireSkill: string;
   target: string;
   groupLessons?: IGroupLesson[];
};

export type IGroupLesson = {
   id?: number | string;
   title: string;
   lessons: ILesson[];
   totalLesson: number;
   index: number;
};
export enum ITypeLesson {
   Quiz,
   Post,
   Video,
}
export type ILesson = {
   id?: number | string | null;
   type?: ITypeLesson | any;
   title: string;
   description?: string;
   quiz?: IQuestion[] | null;
   video?: IVideoLesson | null;
   post?: IPostLesson | null;
   index: number;
};

export type IQuestion = {
   id?: string | number | null;
   content: string;
   answers: string[];
   correctAnswerIndex: number;
   explain?: string;
   imgURL?: string;
   index: number;
};

export type IVideoLesson = {
   id?: string | number | null;
   videoURL?: string;
   videoId?: string;
};
export type IPostLesson = {
   id?: string | number | null;
   items: TypeItemPost[];
};

export enum IStatusCourse {
   Published,
   UnPublished,
   ComingSoon,
}

export enum TypePayment {
   VNPAY,
   MOMO,
   OTHER,
}

export type IPaymentHistory = {
   user: IUser;
   typePayment: TypePayment;
   paymentAt?: Date;
   isPayment: boolean;
};
export type IUserCourse = {
   id?: string | number;
   user: IUser;
   course: ICourse;
   registerAt: Date;
   isPayment: boolean;
   lessonPassed: ILesson[];
   paymentHistory: IPaymentHistory;
   currentLesson?: ILesson;
   currentGroupLesson?: IGroupLesson;
};

export type IPaymentResponse = {
   paymentURL: string;
   typePayment: TypePayment;
   code: string;
   message: string;
};
