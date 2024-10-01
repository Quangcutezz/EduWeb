import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure, Input } from '@nextui-org/react';
import { IGroupLesson } from '../../../../../model/Course.model';
import uuid from 'react-uuid';
type ModalAddGroupLessonProps = {
    onRemove?: (id: number) => void;
    children: React.ReactNode;
    onAdd: (res: IGroupLesson) => void;
};

export default function ModalAddGroupLesson(props: ModalAddGroupLessonProps) {
    const { isOpen, onOpenChange, onOpen } = useDisclosure();
    const [title, setTitle] = useState('');

    return (
        <>
            <div onClick={onOpen}>{props.children}</div>
            <Modal className="z-[1000000]" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1"></ModalHeader>
                            <ModalBody>
                                <div className="p-2 rounded-lg flex flex-col gap-4 justify-center items-center bg-[rgba(0,0,0,0.1) ">
                                    <div
                                        onClick={(e) => e.stopPropagation()}
                                        className="p-2 w-full rounded-lg bg-[rgba(0,0,0,0.1)  "
                                    >
                                        <Input
                                            onChange={(e) => setTitle(e.target.value)}
                                            value={title}
                                            placeholder="   "
                                            className="w-full"
                                            labelPlacement="outside"
                                            label="Tên nhóm bài học"
                                        />

                                        <div className="mt-5 w-full flex justify-end items-center gap-4">
                                            <Button
                                                color="danger"
                                                onClick={() => {
                                                    onClose();
                                                }}
                                            >
                                                Hủy
                                            </Button>
                                            <Button
                                                className="text-white"
                                                color="success"
                                                onClick={() => {
                                                    props.onAdd({
                                                        id: uuid(),
                                                        title,
                                                        totalLesson: 0,
                                                        lessons: [],
                                                        index: -1,
                                                    });
                                                    setTitle('');
                                                    onClose();
                                                }}
                                            >
                                                Thêm
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
