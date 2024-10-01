export type ICarouselItem = {
    title: string;
    subtitle: string;
    btnTitle: string;
    background: {
        start: string;
        end: string;
    };
    action: () => void;
    banner: string;
};

export const exampleCarousels: ICarouselItem[] = [
    {
        title: 'Học ReactJs Miễn Phí',
        subtitle:
            'Kh6a hqc ReactJS tü cd bån tdi nång cao. Két quå cia kh6a hqc nåy lå ben c6 thé låm häu hét cåc dv ån thudng göp vdi ReactJS.',
        banner: 'https://files.fullstack.edu.vn/f8-prod/banners/20/6308a6bf603a4.png',
        action: () => {},
        background: {
            start: '#3563f0',
            end: '#651bcf',
        },
        btnTitle: 'Đặt ký ngay',
    },
    {
        title: 'F8 trên Youtube',
        subtitle:
            'F8 dugc nhåc tdi d moi noir d dåu c6 Cd höi viéc låm cho nghé IT vå c6 nhüng con ngudi yéu thich lap trinh F8 sé d dö.',
        banner: 'https://files.fullstack.edu.vn/f8-prod/banners/Banner_03_youtube.png',
        action: () => {},
        background: {
            start: '#fe2e53',
            end: '#fb870b',
        },
        btnTitle: 'Đặt ký kênh',
    },
];
