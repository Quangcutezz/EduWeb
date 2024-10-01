import React from 'react';
import {
    Table as TableNextUI,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Image,
    Chip,
    Card,
    Spinner,
} from '@nextui-org/react';
import { AiFillEdit } from 'react-icons/ai';
import { IoMdTrash } from 'react-icons/io';
import { ICourse, IStatusCourse } from '../../../model/Course.model';
import { useRouter } from '../../../hook';
import { path } from '../../../enum/path';

const columns = [
    { name: 'Tiêu đề', uid: 'title' },
    { name: 'Ảnh đại diện', uid: 'thumbnail' },
    { name: 'Mô tả', uid: 'description' },
    { name: 'Trạng thái', uid: 'status' },
    { name: 'Danh mục', uid: 'category' },
    { name: 'actions', uid: 'actions' },
];

type TableProps = {
    data: ICourse[];
    isLoading?: boolean;
};
export default function Table(props: TableProps) {
    const router = useRouter();
    const renderCell = React.useCallback((course: ICourse, columnKey: any) => {
        switch (columnKey) {
            case 'title':
                return <h5>{course.title}</h5>;
            case 'thumbnail':
                return <Image width={200} alt={course.title} src={course.thumbnail} />;
            case 'status':
                return (
                    <Chip
                        className="capitalize"
                        color={course.status === IStatusCourse.ComingSoon ? 'danger' : 'success'}
                        size="sm"
                        variant="flat"
                    >
                        {course.status === IStatusCourse.ComingSoon ? 'Chuẩn bị ra mắt' : 'Đã ra mắt'}
                    </Chip>
                );
            case 'description':
                return <h5 className="w-[10rem] truncate">{course.description}</h5>;
            case 'category':
                return course?.categoryCourse ? (
                    <div className="flex justify-start items-center gap-2 ">
                        <Chip variant="flat" color="secondary">
                            #
                            {course?.categoryCourse?.categoryName
                                ? course?.categoryCourse?.categoryName.toUpperCase()
                                : ''}
                        </Chip>
                    </div>
                ) : (
                    <Chip variant="flat" color="secondary">
                        Chưa cập nhật
                    </Chip>
                );
            case 'actions':
                return (
                    <div className="relative flex items-center gap-2">
                        <span className="text-lg text-danger cursor-pointer active:opacity-50">
                            <IoMdTrash className="text-xl" />
                        </span>
                    </div>
                );
            default:
                return null;
        }
    }, []);

    return (
        <>
            <TableNextUI aria-label="Example table with custom cells" className="bg-transparent shadow-none">
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
                    isLoading={props.isLoading}
                    loadingContent={<Spinner label="Loading..." />}
                    emptyContent={<h5>Không có kết quả nào</h5>}
                    className="bg-transparent shadow-none"
                    items={props.data}
                >
                    {(item) => (
                        <TableRow className="hover:bg-[rgba(0,0,0,0.1)] cursor-pointer rounded-lg" key={item.id}>
                            {(columnKey) => (
                                <TableCell
                                    onClick={() => router.push(path.ADMIN.COURSE + '/' + item.id?.toString() ?? '')}
                                >
                                    {renderCell(item, columnKey)}
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </TableNextUI>
        </>
    );
}
