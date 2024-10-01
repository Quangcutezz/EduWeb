import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Input,
    Switch,
} from '@nextui-org/react';
import { IoMdAdd } from 'react-icons/io';
import { ICategoryCourse } from '../../../../model/Common.model';
import { useState } from 'react';
import toast from 'react-hot-toast';

type ModalAddNewCategoryProps = {
    onAdd?: (newCategory: ICategoryCourse) => void;
};

const createNewCategory = async (newCategory: ICategoryCourse): Promise<ICategoryCourse | null> => {
    try {
        const response = await fetch('https://localhost:7005/api/category-course', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCategory),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData: ICategoryCourse | null = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error during registration:', error);
        return null;
    }
};

export default function ModalAddNewCategory(props: ModalAddNewCategoryProps) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [categoryName, setCategoryName] = useState<string>('');
    const [isLock, setIsLock] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleAddNewCategory = async () => {
        const newCategoryCourse: ICategoryCourse = {
            isLock,
            categoryName,
        };

        setIsLoading(true);
        const res: ICategoryCourse | null = await createNewCategory(newCategoryCourse);
        if (res) {
            toast.success('Thêm danh mục mới thành công!');
            props.onAdd && props.onAdd(res);
            setCategoryName('');
            onClose();
        } else {
            toast.error('Thêm danh mục mới thất bại!');
        }
        setIsLoading(false);
    };

    return (
        <>
            <Button startContent={<IoMdAdd />} color="primary" className="mt-5 w-fit" onClick={onOpen}>
                Thêm danh mục
            </Button>
            <Modal isOpen={isOpen} isDismissable={false} isKeyboardDismissDisabled={true} onClose={onClose}>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">Thêm danh mục khóa học mới</ModalHeader>
                    <ModalBody>
                        <Input
                            value={categoryName}
                            label="Tên danh mục"
                            onChange={(e) => setCategoryName(e.target.value)}
                            placeholder="..."
                            labelPlacement="outside"
                        />
                        <h5 className="text-sm">Khóa</h5>
                        <Switch
                            defaultChecked={isLock}
                            checked={isLock}
                            onChange={(e) => setIsLock(e.target.checked)}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                            Hủy
                        </Button>
                        <Button color="primary" onPress={onClose} isLoading={isLoading} onClick={handleAddNewCategory}>
                            Lưu
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
