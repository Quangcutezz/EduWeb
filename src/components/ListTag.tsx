import { Chip } from '@nextui-org/react';

function ListTag() {
    const tags = ['Node Js', 'ADS', 'SEO', 'HTML', 'Backend', 'Front-end', 'Database'];
    return (
        <div className="flex justify-center items-center gap-4 max-w-[32rem] flex-wrap m-auto">
            {tags.map((tag, index) => (
                <Chip
                    key={index}
                    startContent={
                        <div className="text-2xl p-2 w-12 flex justify-center items-center rounded-full backdrop-blur-xl">
                            #
                        </div>
                    }
                    variant="faded"
                    className="text-lg hover:bg-primary cursor-pointer select-none rounded-full h-max p-0 border-none"
                >
                    {tag}
                </Chip>
            ))}
        </div>
    );
}

export default ListTag;
