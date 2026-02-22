type Prop = {
    error: Error | null;
}

export default function ErrorDisplay({ error }: Prop) {
    if (!error) return null;

    return (
        <div className="toast toast-end toast-top toast-center">
            <div className="alert alert-error">
                <span>{error?.message || "Unknown error"}</span>
            </div>
        </div>
    );

    /* */

}
