type LoadingSpinnerProps = {
    textLoading: string;
}

export default function LoadingSpinner(
    { textLoading }: LoadingSpinnerProps
) {
    return (
        <div className="loading-spinner">
            <div className="spinner"></div>
            <p>{textLoading}</p>
        </div>
    );
}