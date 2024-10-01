import { Card, CardHeader, Avatar, Button, CardBody, CardFooter, Chip } from '@nextui-org/react';
import { MdOutlineShowChart } from 'react-icons/md';

type CardItemProps = {
    title: string;
    icon: React.ReactNode;
    number: number;
    path: string;
    description: string;
    subtitle: string;
};
function CardItem(props: CardItemProps) {
    return (
        <Card className="w-[340px] shadow-2xl">
            <CardHeader className="justify-between">
                <Chip variant="flat" className="p-4 pt-8 pb-8 rounded-full">
                    {props.icon}
                </Chip>
                <Button radius="full" variant="bordered">
                    Tới
                </Button>
            </CardHeader>
            <CardBody className="px-3 py-0 text-small text-default-400">
                <h1 className="text-2xl font-bold">{props.title}</h1>
                <p>{props.description}</p>
            </CardBody>
            <CardFooter className="gap-3">
                <Chip color="secondary" variant="flat" className="pl-4 pr-4 pt-4 pb-4">
                    {props.number}
                </Chip>
                <Button
                    variant="flat"
                    color="success"
                    className="rounded-2xl"
                    size="sm"
                    startContent={<MdOutlineShowChart className="text-xl" />}
                >
                    {props.subtitle}
                </Button>
            </CardFooter>
        </Card>
    );
}

export default CardItem;
