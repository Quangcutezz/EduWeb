import { Button } from '@nextui-org/react';
import Search from '../../../components/Search';
import { GrPowerReset } from 'react-icons/gr';
import { useEffect, useState } from 'react';
import { IFilterCourse } from '.';
import { IoAdd } from 'react-icons/io5';
import { useLocation, useNavigate } from 'react-router-dom';
import SelectCategoryCourse from './SelectCategoryCourse';
import SelectStatusCourse from './SelectStatusCourse';
import { IStatusCourse } from '../../../model/Course.model';

type FilterBarCourseProps = {
    onChange: (value: IFilterCourse) => void;
};
function FilterBarCourse(props: FilterBarCourseProps) {
    const history = useNavigate();
    const { pathname } = useLocation();

    const [status, setStatus] = useState<IStatusCourse | string | null>(null);
    const [query, setQuery] = useState<string | null>(null);
    const [orderType, setOrderType] = useState<string | null>(null);
    const [categoryId, setCategoryId] = useState<string | null>(null);

    useEffect(() => {
        let filter = {
            categoryId,
            status,
            query,
        };
        props.onChange(filter);
    }, [query, status, categoryId, orderType]);
    return (
        <div className="flex mt-10 justify-between  flex-wrap items-end gap-6 rounded-xl shadow-xl bg-light-sidebar backdrop-blur-xl dark:bg-dark-sidebar w-full p-4">
            <div className="flex justify-start items-center gap-6 min-w-[40rem]">
                <SelectCategoryCourse
                    value={categoryId}
                    onResult={function (res: any): void {
                        setCategoryId(res);
                    }}
                />
                <SelectStatusCourse
                    value={status}
                    onResult={function (res: IStatusCourse): void {
                        setStatus(res);
                    }}
                />
                {/* <SelectOrderType
                    onResult={function (res: string): void {
                        setOrderType(res);
                    }}
                /> */}
            </div>

            <div className=" flex justify-start items-center gap-6">
                <Search onChange={(val) => setQuery(val)} placeholder="Tìm kiếm theo tiều đề, thể loại, ..." />
                <Button
                    onClick={() => {
                        setCategoryId(null);
                        setQuery(null);
                        setStatus(null);

                        props.onChange({
                            categoryId: '',
                            status: null,
                            query: null,
                        });
                    }}
                    startContent={<GrPowerReset className="text-xl" />}
                    variant="flat"
                    color="primary"
                >
                    Làm mới lọc
                </Button>
                <Button
                    onClick={() => {
                        history(pathname + '/add');
                    }}
                    startContent={<IoAdd className="text-xl" />}
                    color="primary"
                >
                    Thêm khóa học
                </Button>
            </div>
        </div>
    );
}

export default FilterBarCourse;
