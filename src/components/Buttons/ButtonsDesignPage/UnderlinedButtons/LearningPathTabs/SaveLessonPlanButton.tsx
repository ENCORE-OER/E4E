import { Flex } from '@chakra-ui/react';
import { FaSave } from 'react-icons/fa';
import { useLearningPathDesignContext } from '../../../../../Contexts/LearningPathDesignContext/LearningPathDesignContext';
import UnderlinedButton from '../UnderlinedButton';

type SaveLessonPlanButtonProps = {
  isDisabled?: boolean;
};

export default function SaveLessonPlanButton({
  isDisabled,
}: SaveLessonPlanButtonProps) {
  const { handleSaveLessonPlanClick } = useLearningPathDesignContext();
  return (
    <Flex p={1} _hover={{ bg: 'gray.200' }}>
      <UnderlinedButton
        handleClick={handleSaveLessonPlanClick}
        nameButton="Save"
        rightIcon={<FaSave />}
        color="primary"
        fontWeight="normal"
        isDisabled={isDisabled}
        _hover={{ bg: 'gray.200' }}
      />
    </Flex>
  );
}
