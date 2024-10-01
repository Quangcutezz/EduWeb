import { Button, Image, Spinner } from '@nextui-org/react';
import { ChangeEvent, useRef, useState } from 'react';
import uploadImage from '../services/Firebase';
import { FaExchangeAlt } from 'react-icons/fa';

type UploadFileProps = {
    onFinished: (res: string) => void;
    value: string;
};

function UploadFile(props: UploadFileProps) {
    const inputFileRef = useRef<HTMLInputElement>(null);
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
                props.onFinished(downloadURL.toString());
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <>
            <div
                className="flex items-center justify-center w-full"
                style={{
                    display: props.value ? 'none' : 'flex',
                }}
            >
                <label
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    htmlFor="dropzone-file"
                >
                    {isLoading && <Spinner color="secondary" />}
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Nhấn chuột để tải lên</span> hoặc kéo thả ảnh vào
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                    </div>
                    <input
                        onChange={handleFileChange}
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        ref={inputFileRef}
                    />
                </label>
            </div>

            {props.value && (
                <div className="relative">
                    <Image alt={props.value} className="h-full bg-contain w-full" src={props.value} />
                    <Button
                        className="mt-2"
                        startContent={isLoading ? <></> : <FaExchangeAlt className="text-xl" />}
                        variant="flat"
                        onClick={() => {
                            if (inputFileRef.current) inputFileRef.current.click();
                        }}
                        isLoading={isLoading}
                    >
                        Thay ảnh
                    </Button>
                </div>
            )}
        </>
    );
}

export default UploadFile;
