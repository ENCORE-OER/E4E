import TextBox from './TextBox';

type LearningObjectiveTextBoxProps = {
  learningObjective: string;
  index?: number;
  handleLearningObjective: (text: string, index?: number) => void;
  // isGenerateButtonClicked?: boolean; // Used to highlight the box when the user try to go ahead with an empty text
  placeholder?: string;
  bg?: string;
  isHighlighted?: boolean;
  isDisabled?: boolean;
};

export default function LearningObjectiveTextBox({
  learningObjective,
  handleLearningObjective,
  placeholder,
  index,
  bg,
  isHighlighted,
  isDisabled,
}: LearningObjectiveTextBoxProps) {
  return (
    <TextBox
      isHighlighted={isHighlighted}
      text={learningObjective || ''}
      index={index}
      onTextChange={handleLearningObjective}
      resize="vertical"
      placeholder={placeholder}
      bgTextArea={bg}
      isDisabled={isDisabled}
    // fontSize="sm"
    // fontWeight={"normal"}
    />
  );
}
