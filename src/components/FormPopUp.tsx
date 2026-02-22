import { useState, type PropsWithChildren, type ReactNode } from "react";
import { Bounce, ToastContainer } from "react-toastify/unstyled";

type Props = {
    button: ReactNode;
}

export default function FormPopUp({ children, button }: PropsWithChildren<Props>) {
    const [showForm, setShowForm] = useState(false);

    return (
        <>
            <div
                className="w-full h-full cursor-pointer" onClick={() => setShowForm(true)}>
                {button}
            </div>

            {showForm && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-11/12 max-w-150 overflow-y-auto">
                    <div className="bg-base-100 rounded-lg shadow-xl p-6 md:p-8">
                        
                        {children}

                        <div className="flex gap-3 mt-8">
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="btn btn-error flex-1"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showForm && (
                <div
                    className="fixed inset-0 backdrop-blur-sm bg-black/50 z-40"
                    onClick={() => setShowForm(false)}
                />
            )}

            
        </>
    )
}