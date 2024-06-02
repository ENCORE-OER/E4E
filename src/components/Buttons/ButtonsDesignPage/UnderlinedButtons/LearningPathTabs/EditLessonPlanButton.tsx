import { Flex, Tooltip } from '@chakra-ui/react';
import { useLearningPathDesignContext } from '../../../../../Contexts/LearningPathDesignContext/LearningPathDesignContext';
import { LessonPlanTabButtonProps } from '../../../../../types/encoreElements';
import IconEdit from '../../../../Icons/IconEdit/IconEdit';
import UnderlinedButton from '../UnderlinedButton';

export default function EditLessonPlanButton({
  name,
  isDisabled,
  isSmallerScreen
}: LessonPlanTabButtonProps) {
  const { handleEditLessonPlanClick, isEditLessonPlanClicked } =
    useLearningPathDesignContext();

  return (
    <Tooltip
      hasArrow
      placement="top"
      label={name}
      aria-label={name}
      //ml="1px"
      bg="white"
      color="primary"
      p={2}
      fontSize={'sm'}
      borderRadius={5}
      isDisabled={!isSmallerScreen}
    >
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
          nameButton={!isSmallerScreen ? name : ""}
          rightIcon={<IconEdit />}
          color="primary"
          fontWeight="normal"
          isDisabled={isEditLessonPlanClicked || isDisabled}
        />
      </Flex>
    </Tooltip>
  );
}
