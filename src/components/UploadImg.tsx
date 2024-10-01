import { Button } from '@nextui-org/react';
import { ChangeEvent, useRef, useState } from 'react';
import { BiSolidImageAdd } from 'react-icons/bi';
import uploadImage from '../services/Firebase';

type UploadImgProps = {
    onResult: (res: string) => void;
};
function UploadImg(props: UploadImgProps) {
    const imgRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        try {
            setIsLoading(true);
            const downloadURL = await uploadImage(file);
            setIsLoading(false);
            console.log('Image uploaded. Download URL:', downloadURL);

            if (downloadURL) {
                props.onResult(downloadURL.toString());
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <>
            <Button
                onClick={() => {
                    imgRef.current && imgRef.current.click();
                }}
                isLoading={isLoading}
                isIconOnly
                variant="flat"
                startContent={isLoading ? <></> : <BiSolidImageAdd />}
                className=" bottom-3 right-3"
            />

            <input className="hidden" onChange={handleFileChange} type="file" accept="image/*" ref={imgRef} />
        </>
    );
}

export default UploadImg;
