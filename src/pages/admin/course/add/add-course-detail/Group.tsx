import { useState } from 'react';
import { IGroupLesson } from '../../../../../model/Course.model';
import { Button, Input } from '@nextui-org/react';
import { IoIosSave } from 'react-icons/io';
import { MdModeEditOutline } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';
import ModalConfirmRemove from './ModalConfirmRemove';
import { MdDragIndicator } from 'react-icons/md';
import { Draggable } from '@hello-pangea/dnd';
import uuid from 'react-uuid';
import { removeGroupLessonById, updateGroupLessonById } from './service';
import toast from 'react-hot-toast';

type GroupProps = {
   data: IGroupLesson;
   onSelect: (res: IGroupLesson) => void;
   onRemove: (id: string | number) => void;
   onUpdate: (id: string | number, res: IGroupLesson) => void;
};
function Group(props: GroupProps) {
   const [isEdit, setIsEdit] = useState(false);
   const [title, setTitle] = useState(props.data.title);
   const [isLoading, setIsLoading] = useState(false);

   const handleUpdateGroupLesson = async () => {
      const newGroupLesson = {
         ...props.data,
         title: title,
      };

      if (!props.data.id) return;

      if (!title) {
         toast.error('Tên nhóm khóa học không được trống !');
         return;
      }
      setIsLoading(true);
      const res = await updateGroupLessonById(props.data.id, newGroupLesson);
      setIsLoading(false);

      if (res) {
         props.onUpdate(props.data.id, res);
         setIsEdit(false);
      } else {
         toast.error('Đã xảy ra lỗi, không thể chỉnh sửa tên');
      }
   };

   const handleRemoveGroupLesson = async (id: string | number) => {
      const res = await removeGroupLessonById(id);
      if (res) {
         props.onRemove(id);
      } else {
         toast.error('Không thể xóa nhóm bài học! đã xảy ra lỗi gì đó!');
      }
   };
   return (
      <Draggable
         key={props.data.id}
         draggableId={props.data.id ? props.data.id?.toString() : uuid()}
         index={props.data.index}
      >
         {(provided) => (
            <div
               ref={provided.innerRef}
               {...provided.draggableProps}
               {...provided.dragHandleProps}
               onClick={() => props.onSelect(props.data)}
               className="p-4 group w-full flex justify-between items-center gap-4 hover:bg-primary/10 cursor-pointer group"
            >
               {/* {item.index + 1}. {item.title} */}
               <div className="flex justify-start items-center w-[70%]">
                  <MdDragIndicator className="text-xl hover:cursor-move" />
                  {isEdit && (
                     <Input
                        size="md"
                        onKeyPress={(e) => {
                           if (e.key === 'Enter') {
                              e.preventDefault();
                              handleUpdateGroupLesson();
                           }
                        }}
                        onFocus={(e) => e.stopPropagation()}
                        startContent={<h5>{props.data.index + 1}.</h5>}
                        type="email"
                        variant="underlined"
                        disabled={!isEdit}
                        value={title}
                        className={`bg-transparent `}
                        label=""
                        onChange={(e) => {
                           setTitle(e.target.value);
                        }}
                        defaultValue={props.data.title}
                        labelPlacement="outside"
                     />
                  )}

                  {!isEdit && (
                     <h5 className="p-2 w-full truncate">
                        {props.data.index + 1}.{props.data.title}
                     </h5>
                  )}
               </div>
               <div className={`group-hover:flex hidden justify-end items-center gap-4 `}>
                  {!isEdit && (
                     <Button
                        size="sm"
                        className="bg-blue-600 "
                        isIconOnly
                        onClick={() => setIsEdit(true)}
                        startContent={<MdModeEditOutline className=" text-white" />}
                     />
                  )}
                  {isEdit && (
                     <Button
                        isLoading={isLoading}
                        size="sm"
                        className="bg-blue-600"
                        isIconOnly
                        onClick={() => {
                           handleUpdateGroupLesson();
                        }}
                        startContent={<IoIosSave className=" text-white" />}
                     />
                  )}
                  <ModalConfirmRemove
                     id={props.data.id ?? ''}
                     onRemove={async function (id: string | number) {
                        await handleRemoveGroupLesson(id);
                     }}
                  >
                     <div className="p-2 rounded-lg bg-danger-400">
                        <FaTrash />
                     </div>
                  </ModalConfirmRemove>
                  {/* <Button
                                    onClick={onOpen}
                                    size="sm"
                                    color="secondary"
                                    isIconOnly
                                    startContent={<IoMdAdd />}
                                />
                                <Popover isOpen={isOpenConfirmRemove} placement="bottom-end" offset={20} showArrow>
                                    <PopoverTrigger>
                                        <Button
                                            onClick={() => {
                                                setIsOpenConfirmRemove(true);
                                            }}
                                            size="sm"
                                            color="danger"
                                            isIconOnly
                                            startContent={<FaTrash />}
                                        />
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <div className="p-2 rounded-lg bg-[rgba(0,0,0,0.1) backdrop-blur-2xl ">
                                            <h1 className="mb-5 text-2xl font-bold">Xác nhận xóa</h1>
                                            <h5>Bạn có chắc chắn muốn xóa nhóm khóa học này</h5>

                                            <div className="mt-5 w-full flex justify-center items-center gap-4">
                                                <Button
                                                    size="sm"
                                                    onClick={() => {
                                                        setIsOpenConfirmRemove(false);
                                                    }}
                                                >
                                                    Hủy
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    color="danger"
                                                    onClick={() => {
                                                        props.onRemove(props.data.id);
                                                        setIsOpenConfirmRemove(false);
                                                    }}
                                                >
                                                    Chắc chắn
                                                </Button>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover> */}
               </div>
            </div>
         )}
      </Draggable>
   );
}

export default Group;
