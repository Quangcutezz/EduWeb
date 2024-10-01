import React, { useEffect, useState } from 'react';
import {
    Table as TableNextUI,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Tooltip,
    Switch,
    Button,
    Spinner,
} from '@nextui-org/react';
import { AiFillEdit } from 'react-icons/ai';
import { IoMdTrash } from 'react-icons/io';
import { ICategoryCourse } from '../../../../model/Common.model';
import { CiSearch } from 'react-icons/ci';
import ModalConfirmRemove from './ModalConfirmRemove';
import ModalAddNewCategory from './ModalAddNewCategory';

const columns = [
    { name: 'Tên danh mục', uid: 'categoryName' },
    { name: 'Trạng thái', uid: 'isLock' },
    { name: '', uid: 'actions' },
];

const getAllCategoryCourse = async (): Promise<ICategoryCourse[] | null> => {
    try {
        const response = await fetch('https://localhost:7005/api/category-course', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData: ICategoryCourse[] = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error during fetching:', error);
        return null;
    }
};

const editCategoryCourseById = async (
    id: number,
    newCategoryCourse: ICategoryCourse,
): Promise<ICategoryCourse | null> => {
    try {
        const response = await fetch('https://localhost:7005/api/category-course/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCategoryCourse),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData: ICategoryCourse | null = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error during updating:', error);
        return null;
    }
};

export default function Table() {
    const [categories, setCategories] = useState<ICategoryCourse[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleLockCategory = async (data: ICategoryCourse, isLock: boolean) => {
        const newData = {
            ...data,
            isLock: isLock,
        };

        setIsLoading(true);
        if (data.id) {
            const newCategoryCourse = await editCategoryCourseById(+data.id, newData);
            console.log(newCategoryCourse);
            if (newCategoryCourse) {
                setCategories((prev) =>
                    prev.map((i) =>
                        i.id === newCategoryCourse.id
                            ? {
                                  ...newCategoryCourse,
                              }
                            : i,
                    ),
                );
            }
        }
        setIsLoading(false);
    };

    const renderCell = React.useCallback((categoryCourse: ICategoryCourse, columnKey: React.Key) => {
        const cellValue = categoryCourse[columnKey as keyof ICategoryCourse];
        switch (columnKey) {
            case 'categoryName':
                return <h5>{categoryCourse.categoryName}</h5>;
            case 'isLock':
                return (
                    <Switch
                        defaultSelected={categoryCourse.isLock}
                        onChange={(e) => {
                            handleLockCategory(categoryCourse, e.target.checked);
                        }}
                        color="primary"
                    />
                );
            case 'actions':
                return (
                    <div className="relative flex items-center gap-2">
                        {categoryCourse.id && (
                            <>
                                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                    <AiFillEdit className="text-xl" />
                                </span>

                                <ModalConfirmRemove
                                    id={+categoryCourse.id}
                                    onRemove={(id) => setCategories((prev) => prev.filter((p) => p.id !== id))}
                                >
                                    <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                        <IoMdTrash className="text-xl" />
                                    </span>
                                </ModalConfirmRemove>
                            </>
                        )}
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            const res = await getAllCategoryCourse();
            setIsLoading(false);

            if (res) {
                setCategories(res);
            } else {
                // Handle error
            }
        };
        getData();
    }, []);

    return (
        <>
            <TableNextUI
                aria-label="Category Courses Table"
                bottomContent={<ModalAddNewCategory onAdd={(res) => setCategories((prev) => [...prev, res])} />}
            >
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn
                            className="font-extrabold"
                            key={column.uid}
                            align={column.uid === 'actions' ? 'center' : 'start'}
                        >
                            {column.name.toUpperCase()}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody
                    loadingContent={<Spinner />}
                    loadingState={isLoading ? 'loading' : 'idle'}
                    items={categories}
                    emptyContent={
                        <div className="flex justify-center flex-col items-center gap-4">
                            <h1>Chưa có danh mục khóa học nào</h1>
                            <CiSearch className="text-xl" />
                            <Button color="secondary" variant="flat">
                                Thêm
                            </Button>
                        </div>
                    }
                >
                    {(item: ICategoryCourse) => (
                        <TableRow className="hover:bg-[rgba(0,0,0,0.1)] cursor-pointer rounded-lg" key={item?.id ?? 0}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </TableNextUI>
        </>
    );
}
