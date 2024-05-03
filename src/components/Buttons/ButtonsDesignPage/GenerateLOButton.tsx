import StandardButton from "./StandardButton";

interface GenerateLOButtonProps {
    handleGenerateLO: () => void;
    numberOfLO: number;
}

export default function GenerateLOButton({
    handleGenerateLO,
    numberOfLO,
}: GenerateLOButtonProps) {

    const isDisabled = !numberOfLO || numberOfLO <= 0;
    return (
        <StandardButton buttonText={'Generate learning objectives'} handleClick={handleGenerateLO} isDisabled={isDisabled} />
    );
}