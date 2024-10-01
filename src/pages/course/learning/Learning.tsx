import { useState, useEffect, useCallback } from 'react';
import OutlineLearning from '../../../components/learning/OutlineLearning';
import QuizLearning from '../../../components/learning/QuizLearning';
import { ICourse, ITypeLesson, IUserCourse } from '../../../model/Course.model';
import { changeCurrentProcessLearning, getCourseById, getUserCourse } from '../service';
import { useParams } from 'react-router-dom';
import LearningLayout from './layout';
import { useAuth } from '../../../context/authContext';
import VideoLearning from '../../../components/learning/VideoLearning';
import PostLearning from '../../../components/learning/PostLearning';
import { Progress } from '@nextui-org/react';

export function Learning() {
   const { courseId } = useParams();
   const { user } = useAuth();
   const [course, setCourse] = useState<ICourse | null>(null);
   const [userCourse, setUserCourse] = useState<IUserCourse | null>(null);

   useEffect(() => {
      const intiCourseData = async () => {
         if (courseId) {
            const res = await getCourseById(courseId);
            if (res) {
               setCourse(res);
            }
         }
      };
      courseId && intiCourseData();
   }, [courseId]);

   useEffect(() => {
      const initUserCourseData = async () => {
         if (courseId && course && user?.id) {
            const res = await getUserCourse(user?.id, courseId);
            if (res) {
               setUserCourse(res);
               if (!course?.groupLessons || course?.groupLessons.length == 0) return;
               if (res.currentLesson == null) {
                  const currentGroupLesson = course.groupLessons[0];
                  if (!currentGroupLesson.lessons || currentGroupLesson.lessons.length == 0) return;
                  const currentLesson = currentGroupLesson.lessons[0];
                  const resUpdate = await changeCurrentProcessLearning({
                     courseId: courseId,
                     lessonId: currentLesson.id ?? '',
                  });
                  resUpdate && setUserCourse(resUpdate);
               }
            }
         }
      };
      courseId && user?.id && initUserCourseData();
   }, [user, course, courseId]);

   const getNextLesson = useCallback(() => {
      if (!userCourse?.course) return;
      const nextLesson = userCourse?.course?.groupLessons.map((group) => {});
   }, [userCourse]);

   return (
      <>
         {!course && (
            <div className="h-screen w-screen flex justify-center items-center">
               <div>
                  Loading....{' '}
                  <Progress size="sm" isIndeterminate aria-label="Loading..." className="max-w-md" color="primary" />
               </div>
            </div>
         )}

         {course && userCourse && (
            <LearningLayout course={course} userCourse={userCourse}>
               <div className="pt-header w-full pb-footer flex justify-between overflow-hidden">
                  <div className="flex overflow-hidden w-full justify-between ">
                     <div className="w-full " id="step-one">
                        {userCourse?.currentLesson && userCourse?.currentLesson.type === ITypeLesson.Quiz && (
                           <QuizLearning data={userCourse?.currentLesson} />
                        )}
                        {userCourse?.currentLesson && userCourse?.currentLesson.type === ITypeLesson.Video && (
                           <VideoLearning data={userCourse?.currentLesson} />
                        )}
                        {userCourse?.currentLesson && userCourse?.currentLesson.type === ITypeLesson.Post && (
                           <PostLearning data={userCourse?.currentLesson} />
                        )}
                     </div>
                     {/* <VideoLearning /> */}
                     <OutlineLearning
                        currentLesson={userCourse?.currentLesson}
                        onChangeLesson={(res: IUserCourse) => setUserCourse(res)}
                        data={course}
                        lessonPassedList={userCourse.lessonPassed}
                     />
                  </div>
               </div>
            </LearningLayout>
         )}
      </>
   );
}
