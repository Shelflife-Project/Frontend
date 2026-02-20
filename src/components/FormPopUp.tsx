import { cloneElement, isValidElement, useState, type PropsWithChildren, type ReactNode } from "react";

type Props = {
    button: ReactNode;
}

export default function FormPopUp({ children, button }: PropsWithChildren<Props>) {
    const [showForm, setShowForm] = useState(false);

    const close = () => setShowForm(false);

    return (
        <>
            {showForm && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-11/12 max-w-150 overflow-y-auto">
                    <div className="bg-base-100 rounded-lg shadow-xl p-6 md:p-8">

                        {isValidElement(children)
                            ? cloneElement(children, { onSuccess: close })
                            : children}

                        <div className="flex gap-3 mt-1">
                            <button
                                type="button"
                                onClick={close}
                                className="btn btn-ghost flex-1"
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

            <div onClick={() => setShowForm(true)}>
                {button}
            </div>
        </>
    )
}