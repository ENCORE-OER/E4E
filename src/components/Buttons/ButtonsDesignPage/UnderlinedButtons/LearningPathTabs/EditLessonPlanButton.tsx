import { Flex } from '@chakra-ui/react';
import { useLearningPathDesignContext } from '../../../../../Contexts/LearningPathDesignContext/LearningPathDesignContext';
import IconEdit from '../../../../Icons/IconEdit/IconEdit';
import UnderlinedButton from '../UnderlinedButton';

type EditLessonPlanButtonProps = {
  isDisabled?: boolean;
};

export default function EditLessonPlanButton({
  isDisabled,
}: EditLessonPlanButtonProps) {
  const { handleEditLessonPlanClick, isEditLessonPlanClicked } =
    useLearningPathDesignContext();

  return (
    <Flex
      background={isEditLessonPlanClicked ? 'gray.200' : undefined}
      // p={isEditLessonPlanClicked ? 1 : undefined}
      // borderRadius={isEditLessonPlanClicked ? 'lg' : undefined}
      // borderBottom={isEditLessonPlanClicked ? '3px solid' : undefined}
      p={1}
      _hover={{ bg: 'gray.200' }}
    >
      <UnderlinedButton
        handleClick={() => handleEditLessonPlanClick(true)}
        nameButton="Edit"
        rightIcon={<IconEdit />}
        color="primary"
        fontWeight="normal"
        isDisabled={isEditLessonPlanClicked || isDisabled}
      />
    </Flex>
  );
}
