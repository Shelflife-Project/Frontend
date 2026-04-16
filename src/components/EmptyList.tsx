import BetterLottie from "./BetterLottie";
import EmptyBox from "../assets/lotties/Empty Box.json"

export default function EmptyList() {
    return (
        <div className="flex flex-col mb-4 items-center justify-center text-center">
            <div className="w-64 h-64">
                <BetterLottie animationData={EmptyBox} />
            </div>

            <p className="text-lg font-medium">
                Your list is empty
            </p>

            <p className="opacity-60 text-sm mt-2">
                Start by adding your first item
            </p>
        </div>
    );
}