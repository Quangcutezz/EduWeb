import { IUser } from './User.model';

export type IComment = {
   id?: string | number;
   content: string;
   commentAt?: Date;
   user: IUser;
};
