import { cloneElement, isValidElement, useState, type PropsWithChildren, type ReactElement } from "react";

type Props = {
    button: ReactElement<{ onClick?: (e: any) => void }>;
}

export default function FormPopUp({ children, button }: PropsWithChildren<Props>) {
    const [showForm, setShowForm] = useState(false);

    const trigger = isValidElement(button)
        ? cloneElement(button, {
            onClick: () => setShowForm(true),
        })
        : button;

    const close = () => setShowForm(false);

    return (
        <>
            {trigger}

            {showForm && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 max-h-4/6 w-11/12 max-w-150 overflow-visible">
                    <div className="bg-base-100 rounded-lg shadow-xl p-6 md:p-8">
                        <button onClick={close} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>

                        {children}

                    </div>
                </div>
            )}

            {showForm && (
                <div
                    className="fixed inset-0 backdrop-blur-sm bg-black/50 z-40"
                    onClick={close}
                />
            )}
        </>
    )
}