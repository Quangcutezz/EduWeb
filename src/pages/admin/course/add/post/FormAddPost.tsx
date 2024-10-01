import { Button } from '@nextui-org/react';
import { IoIosSave } from 'react-icons/io';
import { TypeItemPost } from '../../../../../components/FragmentBlogItem/FragmentBlogItem.type';
import Editor from '../../../../post/create/Editor';
import { IPostLesson } from '../../../../../model/Course.model';
import { useState } from 'react';
import uuid from 'react-uuid';

type FormAddPostProps = {
   onResult: (res: IPostLesson) => void;
};
function FormAddPost(props: FormAddPostProps) {
   const [items, setItems] = useState<TypeItemPost[]>([]);

   console.log(items);
   return (
      <div>
         <Editor
            onResult={function (result: TypeItemPost[]): void {
               setItems(result);
            }}
         />
         <div className="flex justify-center gap-4 mt-10 items-center right-1/2 z-50 translate-x-1/2 mb-20 fixed -bottom-16 shadow-2xl">
            <Button
               onClick={() => {
                  props.onResult({
                     id: uuid(),
                     items,
                  });
               }}
               startContent={<IoIosSave />}
               color="success"
               className="text-white"
            >
               Lưu lại
            </Button>
         </div>
      </div>
   );
}

export default FormAddPost;
