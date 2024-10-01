import { User } from '@nextui-org/react';

function Review() {
    return (
        <div className="p-10 rounded-xl">
            <div className="flex justify-between items-center">
                <User
                    name="Jane Doe"
                    description="@Jane Doe"
                    avatarProps={{
                        src: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
                    }}
                />
                <span className="text-white/25">3h 12/04/2003</span>
            </div>
            <h5 className="mt-5">
                Dễ hiểu, hướng dẫn rõ ràng nhưng một số extension không còn được hỗ trợ cần update lại clip này cho
                những bạn sau biết hiện nên sử dụng extention nào tốt hơn
            </h5>
        </div>
    );
}

export default Review;
