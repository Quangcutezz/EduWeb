import { Button, Image } from '@nextui-org/react';
import { FaTrash } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { Draggable } from '@hello-pangea/dnd';
import { memo, useState } from 'react';
import { ILesson, ITypeLesson } from '../../../../../model/Course.model';
import uuid from 'react-uuid';
import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowUp } from 'react-icons/io';
import ModalConfirmRemove from './ModalConfirmRemove';
import BlogView from '../../../../../components/PostView';
import YouTubeEmbed from '../../../../../components/YouTubeEmbed';
import helper from '../../../../../helper';
import RenderHTMLContent from '../../../../../components/RenderHtmlContent';
import { removeLessonById } from './service';
import toast from 'react-hot-toast';
import { useLoading } from '../../../../../context/loadingContext';

type LessonProps = {
    data: ILesson;
    onRemove: (id: string | number) => void;
    index: number;
};
function Lesson(props: LessonProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const loading = useLoading();
    return (
        <Draggable
            key={props.data.id}
            draggableId={props.data.id ? props.data.id.toString() : uuid()}
            index={props.data.index}
        >
            {(provided) => {
                return (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="w-full group  "
                    >
                        <div className="w-full border-gray-500/10 border-solid border-[1px] backdrop-blur-3xl bg-[#000]/10 rounded">
                            <div className="justify-between h-12 p-4 pt-10 pb-10 flex items-center">
                                <h1 className="">
                                    {props.index + 1}. {props.data.title}
                                </h1>
                                <div className="hidden justify-end group-hover:flex items-center gap-4">
                                    <Button isIconOnly variant="flat" startContent={<MdEdit />} size="sm" />
                                    <ModalConfirmRemove
                                        id={props.data.id ?? ''}
                                        onRemove={async function (id: string | number) {
                                            loading.startLoading();
                                            const res = await removeLessonById(id);
                                            loading.stopLoading();

                                            if (res) {
                                                props.onRemove(id);
                                            } else {
                                                toast.error('Không thể xóa bài học! Đã xảy ra lỗi gì đó!');
                                            }
                                        }}
                                    >
                                        <div className="p-2 rounded-lg bg-[#252528]">
                                            <FaTrash className="text-red-600 " />
                                        </div>
                                    </ModalConfirmRemove>
                                    <Button
                                        onClick={() => setIsExpanded(!isExpanded)}
                                        isIconOnly
                                        startContent={!isExpanded ? <IoIosArrowDown /> : <IoIosArrowUp />}
                                        size="sm"
                                    />
                                </div>
                            </div>

                            {isExpanded && (
                                <div className="border-solid border-t-[1px] border-gray-500/10 pt-5">
                                    {props.data.type === ITypeLesson.Post && (
                                        <BlogView
                                            data={{
                                                id: undefined,
                                                thumbnail: '',
                                                title: '',
                                                description: '',
                                                tags: '',
                                                items: props.data.post?.items,
                                                status: undefined,
                                                isPin: undefined,
                                                user: undefined,
                                                isApproved: undefined,
                                            }}
                                        />
                                    )}
                                    {props.data.type === ITypeLesson.Video && (
                                        <div className="p-4 flex flex-col gap-4">
                                            <h1 className="font-extrabold text-xl ">{props.data.title}</h1>
                                            <p>{props.data.description}</p>

                                            {props.data?.video && props.data.video?.videoId && (
                                                <YouTubeEmbed
                                                    videoId={helper.getVideoYTId(props.data.video?.videoId)}
                                                />
                                            )}

                                            {props.data?.video && props.data.video.videoURL && (
                                                <video
                                                    style={{
                                                        height: '30rem',
                                                        borderRadius: '10px',
                                                    }}
                                                    controls
                                                    className="w-full"
                                                >
                                                    <source src={props.data.video.videoURL} type="video/mp4" />
                                                    Your browser does not support the video tag.
                                                </video>
                                            )}
                                        </div>
                                    )}

                                    {props.data.type === ITypeLesson.Quiz && (
                                        <div className="flex flex-col gap-10 p-4">
                                            {props.data.quiz && props.data.quiz.length === 0 && (
                                                <div className="w-full p-4 flex flex-col justify-center items-center gap-4">
                                                    <Image
                                                        width={'300'}
                                                        alt="NextUI hero Image"
                                                        src="https://firebasestorage.googleapis.com/v0/b/appmapdemo-b2a39.appspot.com/o/image-removebg-preview.png?alt=media&token=056f15ad-5e7c-408a-97f5-cd5862906826"
                                                    />
                                                    <h5 className="font-bold">Chưa có câu hỏi nào</h5>
                                                </div>
                                            )}
                                            {props.data.quiz &&
                                                props.data.quiz.length > 0 &&
                                                props.data.quiz?.map((quiz) => (
                                                    <div
                                                        className="p-4 rounded-lg dark:bg-black light:bg-white"
                                                        key={quiz.id}
                                                    >
                                                        <RenderHTMLContent htmlContent={quiz.question} />
                                                        {quiz.imgURL && (
                                                            <Image
                                                                width={'300'}
                                                                className="mt-5"
                                                                alt="NextUI hero Image"
                                                                src={quiz.imgURL}
                                                            />
                                                        )}
                                                    </div>
                                                ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                );
            }}
        </Draggable>
    );
}

export default memo(Lesson);
