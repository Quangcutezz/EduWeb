import { Accordion, AccordionItem, Button } from '@nextui-org/react';
import { ICourse, IGroupLesson, ILesson, ITypeLesson, IUserCourse } from '../../model/Course.model';
import { changeCurrentProcessLearning } from '../../pages/course/service';
import { IoMdPlayCircle } from 'react-icons/io';
import { TfiLayoutListPost } from 'react-icons/tfi';
import { MdQuiz } from 'react-icons/md';
import { useCallback } from 'react';

type OutlineLearningProps = {
   data: ICourse;
   currentLesson: ILesson | null | undefined;
   onChangeLesson: (res: IUserCourse) => void;
   lessonPassedList: ILesson[];
};
function OutlineLearning(props: OutlineLearningProps) {
   const groupLessons: IGroupLesson[] = props.data.groupLessons ?? [];

   const handleChangeLesson = async (lessonId: string | number) => {
      if (!props.data.id) return;
      const resUpdate = await changeCurrentProcessLearning({
         courseId: props.data.id,
         lessonId: lessonId,
      });
      resUpdate && props.onChangeLesson(resUpdate);
   };

   const checkPassedLesson = useCallback(
      (lessonId: string | number) => {
         const less = props.lessonPassedList.find((item) => item.id === lessonId);
         return !!less;
      },
      [props.lessonPassedList],
   );
   return (
      <div
         style={{
            height: 'calc(100vh - 10rem)',
         }}
         id="step-two"
         className=" flex-shrink-0 overflow-hidden max-w-[20rem] w-[20rem] border-l-[1px] border-solid dark:border-gray-900"
      >
         <h1 className="text-xl font-extrabold p-2">Nội dung khóa học</h1>
         {groupLessons.length > 0 && (
            <Accordion className="max-w-[20rem] p-0 m-0 px-0">
               {groupLessons.map((gr: IGroupLesson, index: number) => (
                  <AccordionItem
                     key={index}
                     aria-label={'\t' + gr.title}
                     subtitle=""
                     title={
                        <div className="pl-2 pr-2 font-extrabold text-sm">
                           {index + 1} . {gr.title}
                        </div>
                     }
                     isDisabled={gr.lessons.length === 0}
                  >
                     {gr.lessons.map((les, indexChild) => (
                        <div
                           onClick={async () => {
                              les.id && (await handleChangeLesson(les.id));
                           }}
                           key={indexChild}
                           className={`${
                              props.currentLesson && props.currentLesson.id === les.id && ' bg-primary/70'
                           } p-4 text-sm border-t-1  border-gray-700/50 border-dashed flex justify-between items-center  hover:bg-gray-600/30 cursor-pointer`}
                        >
                           <div>
                              {index + 1} .{indexChild + 1}. {les.title}
                              {les.id && checkPassedLesson(les.id) && <div className="mt-4 text-primary">Đã học</div>}
                           </div>
                           {les.type === ITypeLesson.Quiz && (
                              <Button variant="light" isIconOnly startContent={<MdQuiz />} />
                           )}
                           {les.type === ITypeLesson.Video && (
                              <Button variant="light" isIconOnly startContent={<IoMdPlayCircle />} />
                           )}
                           {les.type === ITypeLesson.Post && (
                              <Button variant="light" isIconOnly startContent={<TfiLayoutListPost />} />
                           )}
                        </div>
                     ))}
                  </AccordionItem>
               ))}
            </Accordion>
         )}
      </div>
   );
}

export default OutlineLearning;
