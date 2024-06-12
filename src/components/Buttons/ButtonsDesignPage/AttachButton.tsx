import StandardButton from "./StandardButton";

type AttachButtonProps = {
    handleAttachClick: () => void;
    isDisabled: boolean;
}

export default function AttachButton({
    handleAttachClick,
    isDisabled
}: AttachButtonProps) {
    return (
        <StandardButton
            buttonText="Attach Selected"
            handleClick={handleAttachClick}
            size={'sm'}
            isDisabled={isDisabled}
        />
    );
}