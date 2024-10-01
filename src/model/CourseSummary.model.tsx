export enum typeCourse {
    FREE = 'FREE',
    CHARGES = 'CHARGES',
}
export type ICourseSummary = {
    thumbnail: string;
    title: string;
    description: string;
    target: string[];
    contentOutline: string[];
    requirements: string[];
    typeCourse: typeCourse;
};
export type IReviewCourse = {};
