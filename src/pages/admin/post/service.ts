import { IPaginationResponseDto } from '../../../assets/data/PaginatedResponse.dto';
import { IPaginationRequestDto } from '../../../assets/data/PaginationRequest.Dto';
import { IPostQueryDto } from '../../../assets/data/PostQuery.Dto';
import { Constant } from '../../../constant';
import { IPostItem } from '../../../model/Post.model';

export const getPaginationPost = async (
   queryData: IPaginationRequestDto<IPostQueryDto>,
): Promise<IPaginationResponseDto<IPostItem> | null> => {
   try {
      const response = await fetch(Constant.BASE_URL_API + 'post/pagination', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(queryData),
      });

      if (!response.ok) {
         throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData: IPaginationResponseDto<IPostItem> = await response.json();
      return responseData;
   } catch (error) {
      console.error('Error during registration:', error);
      return null;
   }
};

export const countTotalPost = async (queryData: IPostQueryDto): Promise<number> => {
   try {
      const response = await fetch(Constant.BASE_URL_API + 'post/count', {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(queryData),
      });

      if (!response.ok) {
         throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData: number = await response.json();
      return responseData;
   } catch (error) {
      console.error('Error during registration:', error);
      return 0;
   }
};

export const removePostById = async (postId: string | number): Promise<boolean> => {
   try {
      const response = await fetch(Constant.BASE_URL_API + '/post/' + postId, {
         method: 'DELETE',
         headers: {
            'Content-Type': 'application/json',
         },
      });

      if (!response.ok) {
         throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData: boolean = await response.json();
      return responseData;
   } catch (error) {
      console.error('Error during registration:', error);
      return false;
   }
};

//  approve post
export const approvePost = async (postId: string | number): Promise<IPostItem | null> => {
   try {
      const response = await fetch(Constant.BASE_URL_API + 'post/approve-post/' + postId, {
         method: 'PUT',
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
//  reject post
export const rejectPost = async (postId: string | number): Promise<IPostItem | null> => {
   try {
      const response = await fetch(Constant.BASE_URL_API + 'post/reject-post/' + postId, {
         method: 'PUT',
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
