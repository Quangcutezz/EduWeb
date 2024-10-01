import { IPaginationResponseDto } from '../../../assets/data/PaginatedResponse.dto';
import { IPaginationRequestDto } from '../../../assets/data/PaginationRequest.Dto';
import { IUserQueryDto } from '../../../assets/data/UseQuery.Dto';
import { Constant } from '../../../constant';
import { IUser } from '../../../model/User.model';

export const getPaginationUser = async (
   queryData: IPaginationRequestDto<IUserQueryDto>,
): Promise<IPaginationResponseDto<IUser> | null> => {
   try {
      const response = await fetch(Constant.BASE_URL_API + 'user/pagination', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(queryData),
      });

      if (!response.ok) {
         throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData: IPaginationResponseDto<IUser> = await response.json();
      return responseData;
   } catch (error) {
      console.error('Error during registration:', error);
      return null;
   }
};

export const countTotalUser = async (queryData: IUserQueryDto): Promise<number> => {
   try {
      const response = await fetch(Constant.BASE_URL_API + 'user/count', {
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
// get detail user
export const getDetailUser = async (id: string | number): Promise<IUser | null> => {
   try {
      const response = await fetch(Constant.BASE_URL_API + 'user/' + id, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
         },
      });

      if (!response.ok) {
         throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData: IUser = await response.json();
      return responseData;
   } catch (error) {
      console.error('Error during registration:', error);
      return null;
   }
};
