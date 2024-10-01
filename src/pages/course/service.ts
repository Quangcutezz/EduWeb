import { Constant } from '../../constant';
import { IUserCourse, IPaymentResponse, ICourse } from '../../model/Course.model';

// change current process learning
export const changeCurrentProcessLearning = async (data: {
   courseId: string | number;
   lessonId: string | number;
}): Promise<IUserCourse | null> => {
   try {
      const response = await fetch(Constant.BASE_URL_API + 'course/change-current-process-learning', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (!response.ok) {
         throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return responseData;
   } catch (error) {
      console.error('Error during registration:', error);
      return null;
   }
};

// get user course
export const getUserCourse = async (
   userId: string | number,
   courseId: string | number,
): Promise<IUserCourse | null> => {
   try {
      const response = await fetch(Constant.BASE_URL_API + 'course/get-user-course/' + userId + '/' + courseId, {
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
      return null;
   }
};

// register course
export const registerCourse = async (registerCourseRequestDto: {
   courseId: number | string;
   userId: string | number;
   isPayment: boolean;
}): Promise<IUserCourse | null> => {
   try {
      const response = await fetch(Constant.BASE_URL_API + 'course/register', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(registerCourseRequestDto),
      });
      const responseData = await response.json();
      if (!response.ok) {
         throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return responseData;
   } catch (error) {
      console.error('Error during registration:', error);
      return null;
   }
};

// create payment
export const createPayment = async (registerCourseRequestDto: {
   courseId: number | string;
   userId: string | number;
   isPayment: true;
}): Promise<IPaymentResponse | null> => {
   try {
      const response = await fetch(Constant.BASE_URL_API + 'course/register/create-payment', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(registerCourseRequestDto),
      });
      if (!response.ok) {
         throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const responseData = await response.json();
      return responseData;
   } catch (error) {
      console.error('Error during registration:', error);
      return null;
   }
};

// confirm payment
export const confirmPayment = async (paymentHistoryId: string | number): Promise<boolean> => {
   try {
      const response = await fetch(
         Constant.BASE_URL_API + 'course/register/confirm-payment?paymentId=' + paymentHistoryId,
         {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
         },
      );
      if (!response.ok) {
         throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const responseData = await response.json();
      return responseData;
   } catch (error) {
      console.error('Error during registration:', error);
      return false;
   }
};

// get course by id
export const getCourseById = async (id: string | number): Promise<ICourse | null> => {
   try {
      const response = await fetch(Constant.BASE_URL_API + 'course/' + id, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
         },
      });
      if (!response.ok) {
         throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const responseData: ICourse | null = await response.json();
      return responseData;
   } catch (error) {
      console.error('Error during registration:', error);
      return null;
   }
};

// check exist register course
export const checkExistRegisterCourse = async (
   userId: string | number,
   courseId: string | number,
): Promise<boolean> => {
   try {
      const response = await fetch(
         Constant.BASE_URL_API + 'course/check-user-course-exits/' + userId + '/' + courseId,
         {
            method: 'GET',
            headers: {
               'Content-Type': 'application/json',
            },
         },
      );
      const responseData = await response.json();
      if (!response.ok) {
         throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return responseData;
   } catch (error: any) {
      console.error('Error during registration:', error);
      throw new error(`HTTP error: ${error}`);
   }
};
