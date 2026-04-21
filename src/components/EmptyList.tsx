import BetterLottie from "./BetterLottie";
import EmptyBox from "../assets/lotties/Empty Box.json"

type Props = {
    title: string;
    description: string;
}

export default function EmptyList({ title, description }: Props) {
    return (
        <div className="flex flex-col mb-4 items-center justify-center text-center">
            <div className="w-64 h-64">
                <BetterLottie animationData={EmptyBox} />
            </div>

            <p className="text-lg font-medium">{title}</p>

            <p className="text-base-content/60 text-sm mt-2">{description}</p>
        </div>
    );
}