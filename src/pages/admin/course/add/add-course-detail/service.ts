import { IGroupLesson, ILesson } from './../../../../../model/Course.model';
import { ICourse } from '../../../../../model/Course.model';
import { Constant } from '../../../../../constant';

// add lesson
export const addLesson = async (
    courseId: number | string,
    groupLessonId: number | string,
    newLesson: ILesson,
): Promise<ILesson | null> => {
    try {
        const response = await fetch(
            Constant.BASE_URL_API + 'course/add-new-lesson/' + groupLessonId + '/' + courseId,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newLesson),
            },
        );
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error during registration:', error);
        return null;
    }
};

// update lesson
export const updateLessonById = async (lessonId: string | number, updateLesson: ILesson): Promise<ILesson | null> => {
    try {
        const response = await fetch(Constant.BASE_URL_API + 'course/update-lesson/' + lessonId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateLesson),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error during registration:', error);
        return null;
    }
};

// remove lesson by id
export const removeLessonById = async (lessonId: string | number): Promise<Boolean> => {
    try {
        const response = await fetch(Constant.BASE_URL_API + 'course/delete-lesson/' + lessonId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error during registration:', error);
        return false;
    }
};
/// add group lesson
export const removeGroupLessonById = async (groupLessonId: string | number): Promise<boolean> => {
    try {
        const response = await fetch(Constant.BASE_URL_API + 'course/delete-group-lesson/' + groupLessonId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error during registration:', error);
        return false;
    }
};

export const updateGroupLessonById = async (
    groupLessonId: string | number,
    updateGroupLesson: IGroupLesson,
): Promise<IGroupLesson | null> => {
    try {
        const response = await fetch(Constant.BASE_URL_API + 'course/update-group-lesson/' + groupLessonId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateGroupLesson),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData: IGroupLesson | null = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error during registration:', error);
        return null;
    }
};

export const addNewGroupLesson = async (
    courseId: string | number,
    newGroupLesson: IGroupLesson,
): Promise<IGroupLesson | null> => {
    try {
        const response = await fetch(Constant.BASE_URL_API + 'course/add-group-lesson/' + courseId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: newGroupLesson.title, index: newGroupLesson.index }),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData: IGroupLesson | null = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error during registration:', error);
        return null;
    }
};

export const updateCourseById = async (id: string | number, updateCourse: any): Promise<ICourse | null> => {
    try {
        const response = await fetch(Constant.BASE_URL_API + 'course/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateCourse),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData: ICourse | null = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error during registration:', error);
        return null;
    }
};

export const getCourseById = async (id: string | number): Promise<ICourse | null> => {
    try {
        const response = await fetch(Constant.BASE_URL_API + 'course/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData: ICourse | null = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error during registration:', error);
        return null;
    }
};
