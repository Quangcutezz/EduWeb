import { Image } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { IQuestion } from '../../model/Question.model';
import RenderHTMLContent from '../RenderHtmlContent';

type QuestionProps = {
   data: IQuestion;
   index: number;
   warning: boolean;
};
function Question(props: QuestionProps) {
   const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number | null>(null);
   const [isCorrect, setIsCorrect] = useState(false);

   useEffect(() => {
      setIsCorrect(correctAnswerIndex === props.data.correctAnswerIndex);
   }, [correctAnswerIndex]);

   return (
      <div className="p-10 rounded-lg dark:bg-white/5 bg-black/5">
         <div className="mb-5 font-bold text-xl">
            <RenderHTMLContent htmlContent={props.data?.content}></RenderHTMLContent>
         </div>
         <Image width={300} alt="" src={props.data.imgURL} />
         {props.warning && (
            <div className="mb-5 font-bold text-xl">
               <RenderHTMLContent htmlContent={props.data?.explain ?? ''}></RenderHTMLContent>
            </div>
         )}
         <div className="grid grid-cols-2 gap-4 ">
            {props.data.answers.map((an, index) => (
               <div
                  onClick={() => setCorrectAnswerIndex(index)}
                  className={`p-4 cursor-pointer rounded-lg ${
                     correctAnswerIndex === index && !props.warning && 'bg-green-600/40'
                  } dark:hover:bg-green-600
                  ${isCorrect && correctAnswerIndex === index && 'bg-green-600/50'}
                  hover:bg-green-600/20 bg-black/5 dark:bg-white/5
                  ${props.warning && props.data.correctAnswerIndex === index && !isCorrect && 'bg-red-600/40'}
                  `}
                  key={index}
               >
                  {an}
               </div>
            ))}
         </div>
      </div>
   );
}

export default Question;
