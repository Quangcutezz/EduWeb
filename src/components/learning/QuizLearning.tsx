import Question from './Question';
import { Button, user } from '@nextui-org/react';
import { MdSend } from 'react-icons/md';
import PartyMode from '../PartyMode';
import { useEffect, useState } from 'react';
import { ILesson, IQuestion } from '../../model/Course.model';
import toast from 'react-hot-toast';

type QuizLearningProps = {
   data: ILesson;
};
function QuizLearning(props: QuizLearningProps) {
   const [isWarning, setIsWarning] = useState(false);
   const [party, setParty] = useState<boolean>(false);
   useEffect(() => {
      if (party) {
         const handleStopParty = setInterval(() => {
            setParty(false);
         }, 4000);
         return () => {
            clearInterval(handleStopParty);
         };
      }
   }, [party]);

   const submitQuiz = () => {
      setParty(true);
      setIsWarning(true);
   };

   return (
      <div
         style={{
            height: 'calc(100vh - 10rem)',
         }}
         className="select-none scroll-custom overflow-auto w-full pl-28 pr-28 pt-10 pb-28"
      >
         {party && <PartyMode />}
         <h5 className="text-3xl text-center font-extrabold mb-5">{props.data.title}</h5>

         <div className="flex flex-col gap-4">
            {props.data.quiz &&
               props.data.quiz.map((ques: IQuestion, index) => (
                  <Question warning={isWarning} data={ques} key={index} index={index} />
               ))}
         </div>

         <div className="w-full flex justify-center items-center mt-10">
            <Button
               onClick={submitQuiz}
               startContent={<MdSend className="text-xl text-white" />}
               color="success"
               className="text-white"
            >
               Gửi kết quả
            </Button>
         </div>
      </div>
   );
}

export default QuizLearning;
