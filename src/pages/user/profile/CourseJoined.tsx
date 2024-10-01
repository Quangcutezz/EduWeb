import { Card, Image, Progress } from '@nextui-org/react';
import { IUserCourse } from '../../../model/Course.model';
import { useCallback } from 'react';
import { useRouter } from '../../../hook';
import { path } from '../../../enum/path';

type CourseJoinedProps = {
   data: IUserCourse;
};
function CourseJoined(props: CourseJoinedProps) {
   const { data } = props;
   const router = useRouter();
   const totalLesson = useCallback(() => {
      const totalLess = data.course.groupLessons?.reduce((acc, item) => acc + item.lessons.length, 0);
      return totalLess;
   }, [props.data]);
   return (
      <Card className="p-4 rounded-lg flex justify-start items-start cursor-pointer" isHoverable>
         <div
            onClick={() => {
               router.push(path.COURSE.LEARNING + data.course.id);
            }}
            className="flex justify-start items-center gap-4 mb-2"
         >
            <Image src={data.course?.thumbnail} className="w-[20rem]" />
            <div>
               <h5 className="font-extrabold text-xl">{data.course?.title}</h5>
               <h5>{data.course?.description}</h5>
            </div>
         </div>
         <Progress
            size="sm"
            radius="sm"
            classNames={{
               track: 'drop-shadow-md border border-default',
               indicator: 'bg-gradient-to-r from-pink-500 to-yellow-500',
               label: 'tracking-wider font-medium text-default-600',
               value: 'text-foreground/60',
            }}
            label={`${data.lessonPassed.length}/${totalLesson()} Bài học`}
            value={data.lessonPassed.length}
            maxValue={totalLesson()}
            showValueLabel={true}
         />
      </Card>
   );
}

export default CourseJoined;
