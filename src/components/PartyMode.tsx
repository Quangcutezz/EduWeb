import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';

const PartyMode = () => {
    const { width, height } = useWindowSize();
    return <Confetti width={width} height={height} recycle={true} />;
};
export default PartyMode;
