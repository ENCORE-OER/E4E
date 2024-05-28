import { Button, Flex } from '@chakra-ui/react';
import IconDelete from '../Icons/IconDelete/IconDelete';
import LearningObjectiveTextBox from '../TextBox/LearningObjectiveTextBox';

type BoxLearningObjectiveProps = {
  textLearningObjective: string;
  index: number;
  handleUpdateLO: (newText: string, index?: number) => void;
  handleDeleteLO: (index: number) => void;
  isGenerated?: boolean;
  label_tooltip_delete?: string;
  isSmallerScreen?: boolean;
  isNextButtonClicked: boolean;
};

export default function BoxLearningObjective({
  textLearningObjective,
  // label_tooltip_delete,
  index,
  handleUpdateLO,
  handleDeleteLO,
  // isSmallerScreen,
  isGenerated,
  isNextButtonClicked,
}: BoxLearningObjectiveProps) {
  return (
    <Flex direction="row" gap={1}>
      <LearningObjectiveTextBox
        learningObjective={textLearningObjective}
        index={index}
        handleLearningObjective={handleUpdateLO}
        placeholder="Type your learning objective here..."
        bg={isGenerated ? 'accent.200' : undefined}
        isHighlighted={isNextButtonClicked}
      />
      {/* <Tooltip
        hasArrow
        placement="top"
        label={
          isSmallerScreen && label_tooltip_delete
            ? label_tooltip_delete
            : undefined
        }
        aria-label={label_tooltip_delete || undefined}
        //ml="1px"
        bg="white"
        color="primary"
        p={2}
        fontSize={'sm'}
        borderRadius={5}
      > */}
      <Button variant="ghost" onClick={() => handleDeleteLO(index)} p={0}>
        <IconDelete />
      </Button>
      {/* </Tooltip> */}
    </Flex>
  );
}
