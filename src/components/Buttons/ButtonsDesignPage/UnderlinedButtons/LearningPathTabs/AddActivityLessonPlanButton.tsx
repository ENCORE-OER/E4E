import { Flex } from '@chakra-ui/react';
import { useLearningPathDesignContext } from '../../../../../Contexts/LearningPathDesignContext/LearningPathDesignContext';
import IconPlus from '../../../../Icons/IconPlus/IconPlus';
import UnderlinedButton from '../UnderlinedButton';

type AddActivityLessonPlanButtonProps = {
  isDisabled?: boolean;
};

export default function AddActivityLessonPlanButton({
  isDisabled,
}: AddActivityLessonPlanButtonProps) {
  const { addEmptyLessonActivity } = useLearningPathDesignContext();
  return (
    <Flex p={1} _hover={{ bg: 'gray.200' }}>
      <UnderlinedButton
        handleClick={addEmptyLessonActivity}
        nameButton="Add activity"
        rightIcon={<IconPlus />}
        color="primary"
        fontWeight="normal"
        isDisabled={isDisabled}
      />
    </Flex>
  );
}
