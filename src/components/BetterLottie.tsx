import { useState } from "react";
import Lottie from "react-lottie-player";

type Props = {
    animationData: object;
    style?: React.CSSProperties;
}

export default function BetterLottie({ animationData, style }: Props) {
    const [direction, setDirection] = useState(1);

    return (
        <Lottie
            animationData={animationData}
            play
            loop={false}
            direction={direction === 1 ? 1 : -1}
            onComplete={() => setDirection(direction === 1 ? -1 : 1)}
            style={style}
        />
    );
}