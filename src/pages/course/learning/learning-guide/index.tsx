import { Popover, PopoverTrigger, Button, PopoverContent } from '@nextui-org/react';
import { useEffect, useState } from 'react';

function LearningGuide() {
   const [open, setOpen] = useState(true);
   const [steps] = useState([
      {
         id: 'step-one',
         title: 'Hello 1',
         desc: 'hello 1 description',
      },
      {
         id: 'step-two',
         title: 'Hello 2',
         desc: 'hello 2 description',
      },
   ]);
   const [indexCurrentStep, setIndexCurrentStep] = useState(0);

   useEffect(() => {
      const guideItem = document.getElementById(steps[indexCurrentStep].id);

      if (!guideItem) return;

      guideItem.style.position = 'absolute';
      guideItem.style.zIndex = '100000';
   }, [indexCurrentStep]);
   return (
      <Popover placement="bottom" backdrop="blur" showArrow={true}>
         <PopoverTrigger>
            <Button>Open Popover</Button>
         </PopoverTrigger>
         <PopoverContent>
            <div className="px-1 py-2">
               <div className="text-small font-bold">{steps[indexCurrentStep].title}</div>
            </div>
         </PopoverContent>
      </Popover>
   );
}

export default LearningGuide;
