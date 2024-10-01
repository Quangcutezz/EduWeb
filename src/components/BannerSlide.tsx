import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Button, Image } from '@nextui-org/react';
import { IBanner } from '../model/Common.model';

type BannerSlideProps = {
    data: IBanner[];
};
export default function BannerSlide(props: BannerSlideProps) {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <Slider {...settings}>
            {props.data.map((c, index) => {
                return (
                    <div key={index} className="pl-4 pr-4">
                        <div
                            style={{
                                background: `linear-gradient(to right, ${c.startColor}, ${c.endColor})`,
                            }}
                            className="flex justify-between items-center h-[25rem] p-10 rounded-xl"
                        >
                            <div className="flex flex-col w-1/2 gap-2 text-white">
                                <h5 className="font-extrabold text-2xl">{c.title}</h5>
                                <h5 className="mb-4">{c.subtitle}</h5>
                                <Button onClick={() => {}} color="primary" className="w-[20rem]">
                                    {c.btnTitle}
                                </Button>
                            </div>
                            <Image className="h-full w-[40rem] -translate-x-24" alt={c.title} src={c.thumbnails} />
                        </div>
                    </div>
                );
            })}
        </Slider>
    );
}
