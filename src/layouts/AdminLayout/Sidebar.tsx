import { Image, Accordion, AccordionItem, Chip } from '@nextui-org/react';
import logo from '../../assets/img/logo.png';
import { GiOpenBook } from 'react-icons/gi';
import { BiBookContent } from 'react-icons/bi';
import { BsPersonFill } from 'react-icons/bs';
import { MdSpaceDashboard } from 'react-icons/md';
import { path } from '../../enum/path';
import { useLocation } from 'react-router-dom';
import { useRouter } from '../../hook';

function Sidebar() {
    const { pathname } = useLocation();
    const router = useRouter();
    const navs = [
        {
            name: 'Dashboard',
            icon: <MdSpaceDashboard className="text-xl" />,
            key: 1,
            path: path.ADMIN.DASHBOARD,
        },
        {
            name: 'Courses',
            icon: <GiOpenBook className="text-xl" />,
            key: 2,
            path: path.ADMIN.COURSE,
            subNav: [
                {
                    name: 'Quản lý',
                    path: path.ADMIN.COURSE,
                },
                {
                    name: 'Thêm',
                    path: path.ADMIN.ADD_COURSE,
                },
                {
                    name: 'Danh mục',
                    path: path.ADMIN.MANAGER_COURSE_CATEGORY,
                },
            ],
        },
        {
            name: 'Posts',
            icon: <BiBookContent className="text-xl" />,
            key: 3,
            path: path.ADMIN.POST,
            subNav: [
                {
                    name: 'Quản lý',
                    path: path.ADMIN.POST,
                },
                {
                    name: 'Thêm bài viết',
                    path: path.ADMIN.ADD_POST,
                },
            ],
        },
        {
            name: 'Users',
            icon: <BsPersonFill className="text-xl" />,
            key: 4,
            path: path.ADMIN.USER,
        },
    ];
    return (
        <div className="select-none shadow-3xl fixed z-auto dark:bg-dark-sidebar  bg-white backdrop-blur-3xl flex justify-start max-h-screen rounded-xl left-4 bottom-4 top-4 items-start flex-col">
            <div className="flex justify-center items-center w-full border-b-[1px] border-solid border-second pb-5 mb-5">
                <Image className="scale-[200%] mt-5" isBlurred width={50} src={logo} alt="Course Edut" />
            </div>
            <Accordion className="m-0 p-0">
                {navs.map((nav) => (
                    <AccordionItem
                        textValue={'nav'}
                        key={nav.key}
                        hideIndicator={!nav?.subNav}
                        className={`pl-2 pr-8 ${nav.path === pathname ? 'text-primary' : ''}`}
                        startContent={
                            <Chip
                                color="primary"
                                variant={nav.path === pathname ? 'light' : 'light'}
                                className={`rounded-lg  min-w-[8rem] `}
                            >
                                <div
                                    onClick={() => router.push(nav.path)}
                                    className={`hover:text-primary ${
                                        pathname.includes(nav.path) ? 'text-primary' : 'text-black dark:text-white'
                                    } pl-4 pr-4  flex justify-start items-center gap-4 `}
                                >
                                    {nav.icon}
                                    <h6>{nav.name}</h6>
                                </div>
                            </Chip>
                        }
                    >
                        {nav.subNav &&
                            nav.subNav.map((subNav, index) => (
                                <div
                                    onClick={() => router.push(subNav.path)}
                                    className={`${
                                        pathname.substring(1) === subNav.path
                                            ? 'text-primary '
                                            : ' text-black  dark:text-white '
                                    } pl-10 p-2 cursor-pointer hover:text-primary hover:dark:text-primary`}
                                    key={index}
                                >
                                    {subNav.name}
                                </div>
                            ))}
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}

export default Sidebar;
