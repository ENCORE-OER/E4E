import { Flex, Tooltip } from '@chakra-ui/react';
import { useLearningPathDesignContext } from '../../../../../Contexts/LearningPathDesignContext/LearningPathDesignContext';
import { LessonPlanTabButtonProps } from '../../../../../types/encoreElements';
import IconPlus from '../../../../Icons/IconPlus/IconPlus';
import UnderlinedButton from '../UnderlinedButton';

export default function AddActivityLessonPlanButton({
  name,
  isDisabled,
  isSmallerScreen,
}: LessonPlanTabButtonProps) {
  const { addEmptyLessonActivity, handleEditActivityLesson, lessonActivities, setScrollToIndex: setScrollIndex } =
    useLearningPathDesignContext();

  const handleClickAddActivity = () => {
    addEmptyLessonActivity();
    const activityIndex = lessonActivities?.length;
    handleEditActivityLesson(activityIndex);
    setScrollIndex(activityIndex);
  };

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
      <Flex p={1} _hover={{ bg: 'gray.200' }}>
        <UnderlinedButton
          handleClick={handleClickAddActivity}
          nameButton={!isSmallerScreen ? name : ''}
          rightIcon={<IconPlus />}
          color="primary"
          fontWeight="normal"
          isDisabled={isDisabled}
        />
      </Flex>
    </Tooltip>
  );
}
