import { useState } from 'react';
import { Button, Chip, Input, Textarea } from '@nextui-org/react';
import UploadFile from '../../../../components/UploadFile';
import { MdOutlineSubtitles, MdTitle } from 'react-icons/md';
import { FaHeading } from 'react-icons/fa';
import { GrFormNextLink } from 'react-icons/gr';
import SelectCategoryCourse from '../SelectCategoryCourse';
import { ICourse } from '../../../../model/Course.model';
import SelectStatusCourse from '../SelectStatusCourse';
import { useRouter } from '../../../../hook';
import { path } from '../../../../enum/path';
import toast from 'react-hot-toast';

const createNewCourse = async (newCourse: any): Promise<ICourse | null> => {
   try {
      const response = await fetch('https://localhost:7005/api/course', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(newCourse),
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

function AddSummaryInformation() {
   const [title, setTitle] = useState<string>('');
   const [description, setDescription] = useState<string>('');
   const [subTitle, setSubtitle] = useState<string>('');
   const [thumbnail, setThumbnail] = useState<string>('');
   const [category, setCategory] = useState<number>(0);
   const [price, setPrice] = useState<number>(0);
   const [requireSkill, setRequireSkill] = useState<string>('');
   const [target, setTarget] = useState<string>('');
   const [status, setStatus] = useState<any>('');
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const router = useRouter();

   const handleAddNewCourse = async () => {
      if (!title) {
         toast.error('Vui lòng điền tiêu đề khóa học.');
         return;
      }
      if (!description) {
         toast.error('Vui lòng điền mô tả khóa học.');
         return;
      }
      if (!subTitle) {
         toast.error('Vui lòng điền tiêu đề phụ khóa học.');
         return;
      }
      if (!thumbnail) {
         toast.error('Vui lòng cung cấp hình ảnh minh họa cho khóa học.');
         return;
      }
      if (!price) {
         toast.error('Vui lòng cung cấp giá cho khóa học.');
         return;
      }
      if (!status) {
         toast.error('Vui lòng chọn trạng thái cho khóa học.');
         return;
      }
      const newCourse = {
         title,
         description,
         subTitle,
         thumbnail,
         price,
         adviseVideo: '',
         categoryId: category,
         requireSkill,
         target,
         status,
      };
      setIsLoading(true);
      const res: ICourse | null = await createNewCourse(newCourse);
      setIsLoading(false);

      if (res) {
         console.log(res);
         router.push(path.ADMIN.DETAIL_COURSE + res.id);
      }
   };
   return (
      <div className="w-full h-full">
         <h1 className="font-bold text-xl">Điền thông tin cơ bản của khóa học</h1>

         <div className="mt-10 flex justify-between items-center gap-10">
            <div className="w-1/2">
               <UploadFile
                  onFinished={function (res: string): void {
                     setThumbnail(res);
                  }}
                  value={thumbnail}
               />
            </div>

            <div className="w-full flex flex-col gap-6">
               <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  startContent={<FaHeading className="text-xl" />}
                  type="text"
                  className="w-full"
                  label="Nhập tiêu đề của bài post (Bắt buộc)"
                  labelPlacement={'outside'}
                  placeholder=""
               />
               <Input
                  value={subTitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  startContent={<MdOutlineSubtitles className="text-xl" />}
                  label="Nhập tiêu đề phụ của bạn"
                  labelPlacement={'outside'}
                  className="w-full"
               />
               <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  startContent={<MdTitle className="text-xl" />}
                  label="Nhập mô tả của bài post"
                  placeholder="..."
                  labelPlacement={'outside'}
                  className="w-full"
               />

               <Input
                  onChange={(e) => {
                     setRequireSkill(e.target.value);
                  }}
                  label="Các kỹ năng cần thiết "
                  placeholder="Mỗi yêu cầu cách nhau dấu ,"
                  labelPlacement="outside"
               />
               {requireSkill && (
                  <div className="flex justify-start gap-4 items-start flex-wrap ga-4">
                     {requireSkill.split(',').map((i, index) => (
                        <Chip variant="flat" key={index} color="secondary">
                           # {i}
                        </Chip>
                     ))}
                  </div>
               )}

               <Input
                  onChange={(e) => {
                     setTarget(e.target.value);
                  }}
                  label="Đạt được những gì sau khóa học này "
                  placeholder="..."
                  labelPlacement="outside"
               />

               {target && (
                  <div className="flex justify-start gap-4 items-start flex-wrap ga-4">
                     {target.split(',').map((i, index) => (
                        <Chip variant="flat" key={index} color="success">
                           #{i}
                        </Chip>
                     ))}
                  </div>
               )}

               <div className="flex justify-start items-center gap-4 ">
                  <Input
                     onChange={(e) => setPrice(+e.target.value)}
                     type="number"
                     className="w-[20rem]"
                     label="Giá công khai của khóa học"
                     placeholder="0.00"
                     labelPlacement="outside"
                     startContent={
                        <div className="pointer-events-none flex items-center">
                           <span className="text-default-400 text-small">VND</span>
                        </div>
                     }
                  />
                  <SelectCategoryCourse
                     value={category}
                     onResult={function (res: number): void {
                        setCategory(res);
                     }}
                  />

                  <SelectStatusCourse
                     value={status}
                     onResult={function (res: number): void {
                        setStatus(res);
                     }}
                  />
               </div>
            </div>
         </div>
         <div className="flex justify-end items-center">
            <Button
               onClick={handleAddNewCourse}
               startContent={<GrFormNextLink className="text-xl" />}
               color="success"
               isLoading={isLoading}
               className="text-white"
            >
               Xác nhận
            </Button>
         </div>
      </div>
   );
}

export default AddSummaryInformation;
