import { Button } from '@nextui-org/react';
import { ChangeEvent, useRef, useState } from 'react';
import uploadImage from '../services/Firebase';
import { RiVideoUploadFill } from 'react-icons/ri';

type UploadVideoProps = {
    onResult: (res: string) => void;
    label?: string;
    color: 'default' | 'primary';
};
function UploadVideo({ color = 'default', ...props }: UploadVideoProps) {
    const imgRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        try {
            setIsLoading(true);
            const downloadURL = await uploadImage(file);
            setIsLoading(false);
            console.log('Video uploaded. Download URL:', downloadURL);

            if (downloadURL) {
                props.onResult(downloadURL.toString());
            }
        } catch (error) {
            console.error('Error uploading Video:', error);
        }
    };

    return (
        <div>
            <Button
                color={color}
                onClick={() => {
                    imgRef.current && imgRef.current.click();
                }}
                isLoading={isLoading}
                isIconOnly={!!!props.label}
                variant="flat"
                startContent={isLoading ? <></> : <RiVideoUploadFill />}
                className=" bottom-3 right-3"
            >
                {props.label}
            </Button>

            <input className="hidden" onChange={handleFileChange} type="file" accept="video/*" ref={imgRef} />
        </div>
    );
}

export default UploadVideo;
