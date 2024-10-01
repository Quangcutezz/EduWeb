import { useEffect, useState } from 'react';
import { ICourse } from '../../../../../model/Course.model';
import { Button, Chip, Image, Input, Textarea } from '@nextui-org/react';
import UploadImg from '../../../../../components/UploadImg';
import SelectCategoryCourse from '../../SelectCategoryCourse';
import SelectStatusCourse from '../../SelectStatusCourse';
import { ICourseQueryDto } from '../../../../../assets/data/CourseQuery.Dto';
import { updateCourseById } from './service';

type SettingCourseProps = {
   data: ICourse;
   onChangeData: (res: ICourse) => void;
};

type IFiledInput = {
   value: any;
   isEdit: boolean;
   isLoading: boolean;
};

type InputType = {
   title: IFiledInput;
   subTitle: IFiledInput;
   description: IFiledInput;
   thumbnail: IFiledInput;
   price: IFiledInput;
   adviseVideo: IFiledInput;
   categoryCourse: IFiledInput;
   status: IFiledInput;
   requireSkill: IFiledInput;
   target: IFiledInput;
};

const compareObjects = (obj1: ICourse, obj2: InputType): boolean => {
   const keysToCompare: (keyof InputType)[] = [
      'title',
      'description',
      'subTitle',
      'thumbnail',
      'price',
      'status',
      'requireSkill',
      'target',
   ];

   for (const key of keysToCompare) {
      if (obj1[key] !== obj2[key].value) {
         return false;
      }
   }

   if (obj1.categoryCourse.id !== obj2.categoryCourse.value) {
      return false;
   }
   return true;
};

function SettingCourse(props: SettingCourseProps) {
   const { data } = props;
   const [input, setInput] = useState<InputType>({
      title: {
         value: data.title,
         isEdit: false,
         isLoading: false,
      },
      subTitle: {
         value: data.subTitle,
         isEdit: false,
         isLoading: false,
      },
      description: {
         value: data.description,
         isEdit: false,
         isLoading: false,
      },
      thumbnail: {
         value: data.thumbnail,
         isEdit: false,
         isLoading: false,
      },
      price: {
         value: data.price,
         isEdit: false,
         isLoading: false,
      },
      adviseVideo: {
         value: data.adviseVideo,
         isEdit: false,
         isLoading: false,
      },
      categoryCourse: {
         value: data.categoryCourse.id,
         isEdit: false,
         isLoading: false,
      },
      status: {
         value: data.status,
         isEdit: false,
         isLoading: false,
      },
      requireSkill: {
         value: data.requireSkill,
         isEdit: false,
         isLoading: false,
      },
      target: {
         value: data.target,
         isEdit: false,
         isLoading: false,
      },
   });
   const [inputSave, setInputSave] = useState<InputType>(input);
   const [isChange, setIsChange] = useState<boolean>(false);
   const [isLoading, setIsLoading] = useState<boolean>(false);

   const handleChangeInput = (key: keyof InputType, value: string) => {
      setInput((prevInput) => ({
         ...prevInput,
         [key]: {
            ...prevInput[key],
            value: value,
         },
      }));
   };

   const handleCancelEditText = (key: keyof InputType) => {
      setInput((prevInput) => ({
         ...prevInput,
         [key]: {
            ...prevInput[key],
            value: inputSave[key].value,
         },
      }));
      handleChangeEdit(key);
   };

   const handleSaveEditText = (key: keyof InputType) => {
      setInputSave((prevInput) => ({
         ...prevInput,
         [key]: {
            ...prevInput[key],
            value: input[key].value,
         },
      }));
      handleChangeEdit(key);
   };

   const handleChangeEdit = (key: keyof InputType) => {
      setInput((prevInput) => ({
         ...prevInput,
         [key]: {
            ...prevInput[key],
            isEdit: !prevInput[key].isEdit,
         },
      }));
   };

   const handleChangeLoading = (key: keyof InputType) => {
      setInput((prevInput) => ({
         ...prevInput,
         [key]: {
            ...prevInput[key],
            isEdit: !prevInput[key].isEdit,
         },
      }));
   };

   const handleSaveChange = async (key: keyof InputType) => {
      handleChangeLoading(key);
      handleChangeLoading(key);
      handleChangeEdit(key);
   };

   const handleSave = async () => {
      const newData = {
         ...props.data,
         title: inputSave.title.value,
         subTitle: inputSave.subTitle.value,
         description: inputSave.description.value,
         price: inputSave.price.value,
         categoryId: inputSave.categoryCourse.value - 1,
         thumbnail: inputSave.thumbnail.value,
         requireSkill: inputSave.requireSkill.value,
         target: inputSave.target.value,
         status: inputSave.status.value,
      };

      if (!props.data.id) return;
      setIsLoading(true);
      const res = await updateCourseById(props.data.id, newData);
      setIsLoading(false);

      if (res) {
         props.onChangeData(res);
      }
   };

   useEffect(() => {
      const isChanged = compareObjects(props.data, inputSave);
      setIsChange(!isChanged);
   }, [inputSave]);

   return (
      <div className="p-4 w-full">
         <h5 className="font-extrabold">Chỉnh sửa thông tin, cài đặt khóa học</h5>

         {/* thumbnail - title subtitle description  */}
         <div className="flex w-full justify-center items-center gap-10">
            <div className="flex w-fit flex-col items-start p-4">
               <div className="mb-5">
                  <h5 className="mb-2">Thumbnail khóa học</h5>
                  <Image className="p-4 rounded-lg bg-primary/10" width={300} src={input.thumbnail.value} />
               </div>

               {!input.thumbnail.isEdit && (
                  <UploadImg
                     onResult={function (res: string): void {
                        if (!res) return;
                        handleChangeInput('thumbnail', res);
                     }}
                  />
               )}
               {input.thumbnail.isEdit && (
                  <div className="flex justify-end items-center gap-4">
                     <Button
                        color="primary"
                        variant="bordered"
                        isLoading={input.thumbnail.isLoading}
                        onClick={async () => {}}
                     >
                        Lưu
                     </Button>
                     <Button variant="bordered" onClick={() => {}}>
                        Hủy
                     </Button>
                  </div>
               )}
            </div>

            <div className="flex flex-shrink-1 flex-col gap-4 mt-10 w-full pb-10">
               {/* title */}
               <div className="flex justify-between items-center p-4 gap-10">
                  <Input
                     value={input.title.value}
                     radius="lg"
                     variant="underlined"
                     type="email"
                     onChange={(e) => handleChangeInput('title', e.target.value)}
                     label="Tiêu đề"
                     disabled={!input.title.isEdit}
                     labelPlacement="outside"
                     placeholder="Tiêu đề khóa học của bạn"
                     className="max-w-[920px]"
                  />
                  {!input.title.isEdit && (
                     <Button variant="bordered" onClick={() => handleChangeEdit('title')}>
                        Chỉnh sửa
                     </Button>
                  )}
                  {input.title.isEdit && (
                     <div className="flex justify-end items-center gap-4">
                        <Button
                           onClick={() => handleSaveEditText('title')}
                           color="primary"
                           variant="bordered"
                           isLoading={input.title.isLoading}
                        >
                           Lưu
                        </Button>
                        <Button
                           variant="bordered"
                           onClick={() => {
                              handleCancelEditText('title');
                           }}
                        >
                           Hủy
                        </Button>
                     </div>
                  )}
               </div>
               {/* sub title */}
               <div className="flex justify-between items-center p-4 gap-10">
                  <Input
                     value={input.subTitle.value}
                     radius="lg"
                     variant="underlined"
                     type="email"
                     onChange={(e) => handleChangeInput('subTitle', e.target.value)}
                     label="Tiêu đề phụ"
                     disabled={!input.subTitle.isEdit}
                     labelPlacement="outside"
                     placeholder="Tiêu đề phụ cho khóa học của bạn"
                     className="max-w-[920px]"
                  />
                  {!input.subTitle.isEdit && (
                     <Button variant="bordered" onClick={() => handleChangeEdit('subTitle')}>
                        Chỉnh sửa
                     </Button>
                  )}
                  {input.subTitle.isEdit && (
                     <div className="flex justify-end items-center gap-4">
                        <Button
                           onClick={() => handleSaveEditText('subTitle')}
                           color="primary"
                           variant="bordered"
                           isLoading={input.subTitle.isLoading}
                        >
                           Lưu
                        </Button>
                        <Button
                           variant="bordered"
                           onClick={() => {
                              handleCancelEditText('subTitle');
                           }}
                        >
                           Hủy
                        </Button>
                     </div>
                  )}
               </div>
               {/* description */}
               <div className="flex justify-between items-center p-4 gap-10">
                  <Textarea
                     value={input.description.value}
                     radius="lg"
                     type="email"
                     onChange={(e) => handleChangeInput('description', e.target.value)}
                     label="Mô tả"
                     disabled={!input.description.isEdit}
                     labelPlacement="outside"
                     placeholder="Mô tả cho khóa học của bạn"
                     className="max-w-[920px]"
                  />
                  {!input.description.isEdit && (
                     <Button variant="bordered" onClick={() => handleChangeEdit('description')}>
                        Chỉnh sửa
                     </Button>
                  )}
                  {input.description.isEdit && (
                     <div className="flex justify-end items-center gap-4">
                        <Button
                           onClick={() => handleSaveEditText('description')}
                           color="primary"
                           variant="bordered"
                           isLoading={input.description.isLoading}
                        >
                           Lưu
                        </Button>
                        <Button
                           variant="bordered"
                           onClick={() => {
                              handleCancelEditText('description');
                           }}
                        >
                           Hủy
                        </Button>
                     </div>
                  )}
               </div>

               {/* require skill */}
               <div className="flex justify-between items-center p-4 gap-10">
                  <div className="w-full">
                     <Textarea
                        value={input.requireSkill.value}
                        radius="lg"
                        type="email"
                        onChange={(e) => handleChangeInput('requireSkill', e.target.value)}
                        label="Kỹ năng yêu cầu"
                        disabled={!input.requireSkill.isEdit}
                        labelPlacement="outside"
                        placeholder="Kỹ năng yêu cầu trước khóa học"
                        className="max-w-[920px]"
                     />
                     {input.requireSkill && (
                        <div className="flex  mt-2 justify-start gap-4 items-start flex-wrap ga-4">
                           {input.requireSkill.value.split(',').map((str: string, index: number) => (
                              <Chip variant="flat" key={index} color="primary">
                                 # {str}
                              </Chip>
                           ))}
                        </div>
                     )}
                  </div>
                  {!input.requireSkill.isEdit && (
                     <Button variant="bordered" onClick={() => handleChangeEdit('requireSkill')}>
                        Chỉnh sửa
                     </Button>
                  )}
                  {input.requireSkill.isEdit && (
                     <div className="flex justify-end items-center gap-4">
                        <Button
                           onClick={() => handleSaveEditText('requireSkill')}
                           color="primary"
                           variant="bordered"
                           isLoading={input.requireSkill.isLoading}
                        >
                           Lưu
                        </Button>
                        <Button
                           variant="bordered"
                           onClick={() => {
                              handleCancelEditText('requireSkill');
                           }}
                        >
                           Hủy
                        </Button>
                     </div>
                  )}
               </div>

               {/* target  skill */}
               <div className="flex justify-between items-center p-4 gap-10">
                  <div className="w-full">
                     <Textarea
                        value={input.target.value}
                        radius="lg"
                        type="email"
                        onChange={(e) => handleChangeInput('target', e.target.value)}
                        label="Đạt được gì sau khóa học này"
                        disabled={!input.target.isEdit}
                        labelPlacement="outside"
                        placeholder="..."
                        className="max-w-[920px]"
                     />
                     {input.target && (
                        <div className="flex mt-2 justify-start gap-4 items-start flex-wrap ">
                           {input.target.value.split(',').map((str: string, index: number) => (
                              <Chip variant="flat" key={index} color="success">
                                 # {str}
                              </Chip>
                           ))}
                        </div>
                     )}
                  </div>
                  {!input.target.isEdit && (
                     <Button variant="bordered" onClick={() => handleChangeEdit('target')}>
                        Chỉnh sửa
                     </Button>
                  )}
                  {input.target.isEdit && (
                     <div className="flex justify-end items-center gap-4">
                        <Button
                           onClick={() => handleSaveEditText('target')}
                           color="primary"
                           variant="bordered"
                           isLoading={input.target.isLoading}
                        >
                           Lưu
                        </Button>
                        <Button
                           variant="bordered"
                           onClick={() => {
                              handleCancelEditText('target');
                           }}
                        >
                           Hủy
                        </Button>
                     </div>
                  )}
               </div>

               {/* price category status  */}
               <div className="flex p-4 justify-start items-center gap-4 ">
                  <Input
                     onChange={(e) => {
                        handleChangeInput('price', e.target.value);
                        handleSaveChange('price');
                     }}
                     type="number"
                     className="w-[20rem]"
                     label="Giá công khai của khóa học"
                     placeholder="0.00"
                     labelPlacement="outside"
                     value={input.price.value}
                     startContent={
                        <div className="pointer-events-none flex items-center">
                           <span className="text-default-400 text-small">VND</span>
                        </div>
                     }
                  />
                  <SelectCategoryCourse
                     value={input.categoryCourse.value}
                     onResult={function (res: number): void {
                        handleChangeInput('categoryCourse', res.toString());
                        handleSaveChange('categoryCourse');
                     }}
                  />

                  <SelectStatusCourse
                     value={input.status.value}
                     onResult={function (res: number): void {
                        handleChangeInput('status', res.toString());
                        handleSaveChange('status');
                     }}
                  />
               </div>

               {/* btn save change  */}
               <div className="w-full flex justify-end items-center">
                  <Button isLoading={isLoading} onClick={handleSave} color="success" className="text-white">
                     Lưu lại thay đổi
                  </Button>
               </div>
            </div>
         </div>
      </div>
   );
}

export default SettingCourse;
