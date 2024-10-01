import { IStatusCourse } from '../../model/Course.model';
export type ICourseQueryDto = {
    categoryId?: number | string | null;
    status?: IStatusCourse | string | null;
    query?: string | null;
    minPrice?: number;
    maxPrice?: number;
};
