import { Constant } from '../../constant';
import { IComment } from '../../model/Comment.model';
import { IPostItem } from '../../model/Post.model';

// get all comment post
export const getAllCommentPost = async (postId: string | number): Promise<IComment[]> => {
   try {
      const response = await fetch(Constant.BASE_URL_API + 'post/comment/' + postId, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
         },
      });

      if (!response.ok) {
         throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData: IComment[] = await response.json();
      return responseData;
   } catch (error) {
      console.error('Error during registration:', error);
      return [];
   }
};
// remove comment
export const removeComment = async (commentId: string | number): Promise<IComment | null> => {
   try {
      const response = await fetch(Constant.BASE_URL_API + 'post/comment/' + commentId, {
         method: 'DELETE',
         headers: {
            'Content-Type': 'application/json',
         },
      });

      if (!response.ok) {
         throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData: IComment | null = await response.json();
      return responseData;
   } catch (error) {
      console.error('Error during registration:', error);
      return null;
   }
};
//  update comment
export const updateComment = async (updateComment: IComment): Promise<IComment | null> => {
   try {
      const response = await fetch(Constant.BASE_URL_API + "post/comment'", {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(updateComment),
      });

      if (!response.ok) {
         throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData: IComment | null = await response.json();
      return responseData;
   } catch (error) {
      console.error('Error during registration:', error);
      return null;
   }
};
//create comment
export const createComment = async (postId: string | number, comment: any): Promise<IComment | null> => {
   try {
      const response = await fetch(Constant.BASE_URL_API + 'post/comment/' + postId, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(comment),
      });

      if (!response.ok) {
         throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData: IComment | null = await response.json();
      return responseData;
   } catch (error) {
      console.error('Error during registration:', error);
      return null;
   }
};
// get all post when approve = true
export const getAllPostApprove = async (): Promise<IPostItem[]> => {
   try {
      const response = await fetch(Constant.BASE_URL_API + 'post/approve', {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
         },
      });

      if (!response.ok) {
         throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData: IPostItem[] = await response.json();
      return responseData;
   } catch (error) {
      console.error('Error during registration:', error);
      return [];
   }
};

//get post detail
export const getDetailPostById = async (postId: string | number): Promise<IPostItem | null> => {
   try {
      const response = await fetch(Constant.BASE_URL_API + 'post/' + postId, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
         },
      });

      if (!response.ok) {
         throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData: IPostItem = await response.json();
      return responseData;
   } catch (error) {
      console.error('Error during registration:', error);
      return null;
   }
};
