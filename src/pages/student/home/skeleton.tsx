import { Skeleton as NextUISkeleton } from '@nextui-org/react';
import CourseItemSkeleton from '../../../components/CourseItemSkeleton';

function Skeleton() {
    return (
        <div className="w-full min-h-screen p-10">
            {/*  banner  */}
            <NextUISkeleton className="rounded-lg w-full h-[25rem] mb-10"></NextUISkeleton>
            {/* item */}
            <div className="max-w-screen-xl mt-5 m-auto flex justify-center items-start flex-col gap-5">
                <NextUISkeleton className="w-3/5 rounded-lg">
                    <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                </NextUISkeleton>
                <div className="grid grid-cols-3 gap-10">
                    <CourseItemSkeleton />
                    <CourseItemSkeleton />
                    <CourseItemSkeleton />
                    <CourseItemSkeleton />
                    <CourseItemSkeleton />
                    <CourseItemSkeleton />
                </div>

                <NextUISkeleton className="w-3/5 rounded-lg">
                    <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                </NextUISkeleton>
                <div className="grid grid-cols-3 gap-10">
                    <CourseItemSkeleton />
                    <CourseItemSkeleton />
                    <CourseItemSkeleton />
                    <CourseItemSkeleton />
                    <CourseItemSkeleton />
                    <CourseItemSkeleton />
                </div>
            </div>
        </div>
    );
}

export default Skeleton;
