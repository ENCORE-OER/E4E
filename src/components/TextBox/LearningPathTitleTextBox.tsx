import TextBox from './TextBox';

type LearningPathTitleTextBoxProps = {
    titleLearningPath: string;
    handleTitleLearningPath: (newTitle: string) => void;
    // isGenerateButtonClicked?: boolean; // Used to highlight the box when the user try to go ahead with an empty text
    placeholder?: string;
    bg?: string;
    isHighlighted?: boolean;
    isDisabled?: boolean;
};

export default function LearningPathTitleTextBox({
    titleLearningPath,
    handleTitleLearningPath,
    placeholder,
    bg,
    isHighlighted,
    isDisabled,
}: LearningPathTitleTextBoxProps) {
    return (
        <TextBox
            isHighlighted={isHighlighted}
            text={titleLearningPath || ''}
            onTextChange={handleTitleLearningPath}
            resize="vertical"
            placeholder={placeholder}
            backgroundColorTextArea={bg}
            isDisabled={isDisabled}
            // fontSize="x-large"
            // fontWeight="bold"
            w="80%"
        />
    );
}
