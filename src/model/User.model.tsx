export type IUser = {
   id?: number;
   email: string;
   password: string;
   firstName?: string;
   lastName?: string;
   avatar?: string;
   role?: string | number;
   fullName?: string;
   bio?: string;
   verifyAt?: Date;
   userSetting?: IUserSetting;
};

export type IUserSetting = {
   id?: number | string;
   facebookLink: string;
   githubLink: string;
   isEmailForNewCourse: boolean;
   isNotificationForNewCourse: boolean;
   isNotificationForReplyCmt: boolean;
   isNotificationForCmtOfYourBlog: boolean;
   isNotificationForPinInDiscuss: boolean;
};
