import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure, Input } from '@nextui-org/react';
import toast from 'react-hot-toast';
import { sendLinkResetPassword } from './service';
type ModalEnterEmailProps = {
    children: React.ReactNode;
};

export default function ModalEnterEmail(props: ModalEnterEmailProps) {
    const { isOpen, onOpenChange, onOpen } = useDisclosure();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

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
                                            onChange={(e) => setEmail(e.target.value)}
                                            value={email}
                                            placeholder="   "
                                            startContent="Email:"
                                            className="w-full"
                                            labelPlacement="outside"
                                            label="Nhập email khôi phục của bạn"
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
                                                isLoading={isLoading}
                                                className="text-white"
                                                color="success"
                                                onClick={async () => {
                                                    if (!email) {
                                                        toast.error('Vui lòng nhập email để khôi phục mật khẩu!');
                                                        return;
                                                    }
                                                    try {
                                                        setIsLoading(true);
                                                        const res = await sendLinkResetPassword({
                                                            email,
                                                        });
                                                        setIsLoading(false);

                                                        if (res) {
                                                            toast.success(
                                                                'Đã có đường dẫn khôi phục mật khẩu trong email của bạn! vui lòng kiểm tra và làm theo hướng dẫn!',
                                                            );
                                                            setEmail('');
                                                            onClose();
                                                        } else {
                                                            toast.error('Đã xảy ra lỗi!');
                                                        }
                                                    } catch (error: any) {
                                                        toast.error(error?.message);
                                                        console.error(error.message);

                                                        setIsLoading(false);
                                                    }
                                                }}
                                            >
                                                Xác nhận
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
