import TextBox from "./TextBox";

type LearningObjectiveTextBoxProps = {
    learningObjective: string;
    index?: number;
    handleLearningObjective: (text: string, index?: number) => void;
    isGenerateButtonClicked?: boolean;   // Used to highlight the box when the user try to go ahead with an empty text
    placeholder?: string;
}

export default function LearningObjectiveTextBox({
    learningObjective,
    handleLearningObjective,
    isGenerateButtonClicked,
    placeholder,
    index
}: LearningObjectiveTextBoxProps) {
    return (
        <TextBox
            isHighlighted={isGenerateButtonClicked && learningObjective == ''}
            text={learningObjective || ''}
            index={index}
            onTextChange={handleLearningObjective}
            resize="vertical"
            placeholder={placeholder}
        />
    )
}