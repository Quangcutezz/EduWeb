export type IQuestion = {
   id?: string | number;
   content: string;
   answers: string[];
   correctAnswerIndex: number;
   explain?: string;
   imgURL?: string;
};
