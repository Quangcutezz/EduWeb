import { Button } from '@nextui-org/react';
import { MdAdd } from 'react-icons/md';
import FormAddQuizLesson from './FormAddQuizLesson';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { memo, useState, useMemo } from 'react';
import { IoIosSave } from 'react-icons/io';
import uuid from 'react-uuid';
import { IQuestion } from '../../../../../model/Course.model';

type AddQuizLessonProps = {
   onResult: (res: IQuestion[]) => void;
};
function AddQuizLesson(props: AddQuizLessonProps) {
   const [lessons, setLessons] = useState<IQuestion[]>([]);

   function handleOnDragEnd(result: any): void {
      console.log(result);
      if (!result.destination) return;

      const indexDes = result.destination.index;
      const indexSource = result.source.index;
      console.log(indexDes);
      console.log(indexSource);
      const newItems = Array.from(lessons);
      const [reorderedItem] = newItems.splice(indexSource, 1);
      newItems.splice(indexDes, 0, reorderedItem);
      const clonedItems = newItems.map((item: IQuestion, index) => ({ ...item, index }));
      console.log(clonedItems);
      setLessons(clonedItems);
   }

   const handleAddNewLesson = () => {
      setLessons((prev) => {
         const newIndex = prev.length > 0 ? prev[prev.length - 1].index + 1 : 0;
         return [
            ...prev,
            {
               content: '',
               answers: ['', '', '', ''],
               correctAnswerIndex: -1,
               imgURL: '',
               index: newIndex,
               id: uuid(),
               explain: '',
            },
         ];
      });
   };

   const memoizedLessons = useMemo(() => lessons, [lessons]);

   const renderFormAddQuiz = () => {
      return memoizedLessons.map((item, index) => (
         <FormAddQuizLesson
            onRemove={(id: any) => {
               setLessons((prev) => prev.filter((it) => it.id !== id));
            }}
            onAdd={(res) => setLessons((prev) => prev.map((it) => (it.id === res.id ? { ...res } : it)))}
            data={item}
            index={index}
            key={item.id}
         />
      ));
   };

   return (
      <div className="w-full h-full pb-32 ">
         <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">Tạo bài trắc nghiệm mới</h1>
         </div>

         <div className="mt-5 flex flex-col gap-12 pb-20">
            <DragDropContext onDragEnd={handleOnDragEnd}>
               <Droppable droppableId="main-board-width" type="COLUMN">
                  {(provided) => {
                     return (
                        <div
                           className={`flex w-full flex-wrap flex-col gap-4 justify-start items-start`}
                           {...provided.droppableProps}
                           ref={provided.innerRef}
                        >
                           {renderFormAddQuiz()}
                        </div>
                     );
                  }}
               </Droppable>
            </DragDropContext>
         </div>
         <div className="flex justify-center gap-4 mt-6 items-center right-1/2 z-50 translate-x-1/2 mb-20 fixed -bottom-4 shadow-2xl">
            <Button onClick={handleAddNewLesson} startContent={<MdAdd />} color="secondary" className="  ">
               Thêm câu hỏi
            </Button>
            <Button
               onClick={() => {
                  props.onResult(lessons);
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

export default memo(AddQuizLesson);
