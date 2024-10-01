import { Button, Input, Image } from '@nextui-org/react';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { FaRegImages } from 'react-icons/fa6';
import uploadImage from '../../services/Firebase';

type FragmentImgFileItemProps = {
    onChangeData?: (value: { link?: string; alt?: string; imgURL?: string }) => void;
};
function FragmentImgFileItem(props: FragmentImgFileItemProps) {
    const imgRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [imgURL, setImgUrl] = useState<any>('');
    const [alt, setAlt] = useState<string>('');
    const [link, setLink] = useState<string>('');

    const handleChangeImg = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            setIsLoading(true);
            try {
                const url = await uploadImage(file);
                setImgUrl(url);
            } catch (error) {
                console.error('Error uploading image:', error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    useEffect(() => {
        props.onChangeData &&
            props.onChangeData({
                imgURL,
                link,
                alt,
            });
    }, [imgURL, link, alt]);
    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-start items-center gap-10">
                <input ref={imgRef} type="file" accept="image/*" className="hidden" onChange={handleChangeImg} />
                <Button
                    className="flex-shrink-0"
                    isLoading={isLoading}
                    startContent={<FaRegImages className="text-xl" />}
                    color="primary"
                    variant="flat"
                    onClick={() => {
                        if (imgRef.current) {
                            imgRef.current?.click();
                        }
                    }}
                >
                    Chọn ảnh
                </Button>
                {imgURL && <Image height={100} width={100} src={imgURL} />}
            </div>

            {imgURL && (
                <div className="flex justify-start items-center gap-4 flex-shrink-0">
                    <Input
                        value={alt}
                        onChange={(e) => setAlt(e.target.value)}
                        labelPlacement={'outside-left'}
                        className="w-max text-3xl"
                        type="text"
                        label="Alt : "
                        placeholder="alt"
                    />
                    <Input
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        labelPlacement={'outside-left'}
                        className="w-max text-3xl"
                        type="text"
                        label="Đường dẫn : "
                    />
                </div>
            )}
        </div>
    );
}

export default FragmentImgFileItem;
