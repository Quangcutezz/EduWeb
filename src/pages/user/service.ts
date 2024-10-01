import { Constant } from '../../constant';
import { IUserCourse } from '../../model/Course.model';

// change current process learning
export const getUserCourseByUser = async (userId: string | number): Promise<IUserCourse[]> => {
   try {
      const response = await fetch(Constant.BASE_URL_API + 'course/get-user-course-by-user/' + userId, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
         },
      });
      const responseData = await response.json();
      if (!response.ok) {
         throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return responseData;
   } catch (error) {
      console.error('Error during registration:', error);
      return [];
   }
};
