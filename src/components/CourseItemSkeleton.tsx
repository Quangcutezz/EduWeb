import { Card, CardBody, CardFooter, CardHeader, Skeleton } from '@nextui-org/react';

const CourseItemSkeleton = () => {
    return (
        <Card
            isFooterBlurred
            radius="lg"
            className="relative hover:shadow-md transition-all cursor-pointer select-none overflow-hidden group border-none shadow-none"
        >
            <CardHeader className="flex-col !items-start">
                <Skeleton className="w-2/3 h-6 mb-2" />
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <Skeleton className="h-[12rem] min-w-[24rem] w-full" />
            </CardBody>
            <CardFooter className="opacity-0 transition-all group-hover:opacity-100 justify-between before:bg-white/2 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-0 p-2 shadow-small z-10">
                <Skeleton className="w-2/3 h-6 mb-2" />
                <Skeleton className="w-2/3 h-10" />
            </CardFooter>
        </Card>
    );
};

export default CourseItemSkeleton;
