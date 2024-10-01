import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure } from '@nextui-org/react';
type ModalConfirmRemoveProps = {
    id: string | number;
    onRemove: (id: number | string) => void;
    children: React.ReactNode;
};

const removeCategoryById = async (id: number): Promise<boolean> => {
    try {
        const response = await fetch('https://localhost:7005/api/category-course/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData: boolean = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error during registration:', error);
        return false;
    }
};

export default function ModalConfirmRemove(props: ModalConfirmRemoveProps) {
    const { isOpen, onOpenChange, onOpen } = useDisclosure();
    const [isLoading, setIsLoading] = useState(false);

    const handleRemoveCategory = async () => {
        setIsLoading(true);
        // const isRes = await removeCategoryById(props.id);

        // if (isRes) {
        //     toast.success('Xóa thành công!');
        //     props.onRemove && props.onRemove(props.id);
        //     onClose();
        // } else {
        //     toast.error('Xóa không thành công!');
        // }
        setIsLoading(false);

        props.onRemove(props.id);
    };

    return (
        <>
            <div onClick={onOpen}>{props.children}</div>
            <Modal className="z-[1000000]" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1"></ModalHeader>
                            <ModalBody>
                                <div className="p-2 rounded-lg flex flex-col gap-4 justify-center items-center bg-[rgba(0,0,0,0.1) backdrop-blur-2xl ">
                                    <h1 className="mb-2 text-2xl font-bold">Xác nhận xóa</h1>
                                    <h5>Bạn có chắc chắn muốn xóa nhóm bài học này</h5>

                                    <div className="mt-2 w-full flex justify-center items-center gap-4">
                                        <Button size="sm" onClick={onClose}>
                                            Hủy
                                        </Button>
                                        <Button
                                            size="sm"
                                            color="danger"
                                            onClick={handleRemoveCategory}
                                            isLoading={isLoading}
                                        >
                                            Chắc chắn
                                        </Button>
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
