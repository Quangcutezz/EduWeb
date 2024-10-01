import { Button, Tooltip } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { FaQuestion } from 'react-icons/fa';
import { FaRegBookmark } from 'react-icons/fa6';
import { PiNotePencilFill } from 'react-icons/pi';

function UtilsButton() {
    const history = useNavigate();
    const navActions = [
        {
            name: 'Hỏi đáp',
            path: '',
            icon: <FaQuestion className="text-xl" />,
        },
        {
            name: 'Ghi chú',
            path: '',
            icon: <PiNotePencilFill className="text-xl" />,
        },
        {
            name: 'Đánh dấu bài học yêu thích',
            path: '',
            icon: <FaRegBookmark className="text-xl" />,
        },
    ];
    return (
        <div className="bg-[rgba(24,24,27,0.1)] dark:bg-[rgba(255,255,255,0.1)] fixed left-4 select-none top-1/2 -translate-y-1/2 z-[100000] p-2 pl-4 pr-4 rounded-xl backdrop-blur-2xl max-w-[30rem] flex flex-col justify-center items-center gap-4">
            {navActions.map((action, index) => (
                <Tooltip className="backdrop-blur-3xl bg-white/25 " content={action.name} key={index}>
                    <Button
                        isIconOnly
                        onClick={() => history(action.path)}
                        className="hover:text-primary cursor-pointer "
                        startContent={action.icon}
                    ></Button>
                </Tooltip>
            ))}
        </div>
    );
}

export default UtilsButton;
