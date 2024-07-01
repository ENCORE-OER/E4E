import { Flex, Tooltip } from '@chakra-ui/react';
import { useLearningPathDesignContext } from '../../../../../Contexts/LearningPathDesignContext/LearningPathDesignContext';
import { LessonPlanTabButtonProps } from '../../../../../types/encoreElements';
import { CustomToast } from '../../../../../utils/Toast/CustomToast';
import IconSave from '../../../../Icons/IconSave/IconSave';
import UnderlinedButton from '../UnderlinedButton';

type SaveLessonPlanButtonProps = {
  handleSaveOnDB?: () => Promise<void>;
} & LessonPlanTabButtonProps;

export default function SaveLessonPlanButton({
  name,
  isDisabled,
  isSmallerScreen,
  handleSaveOnDB,
}: SaveLessonPlanButtonProps) {
  const {
    isEditLessonPlanClicked,
    editActivityLessonIndex,
    handleSaveLessonPlanClick,
  } = useLearningPathDesignContext();
  const { addToast } = CustomToast();

  const handleClick = async () => {
    handleSaveLessonPlanClick();

    if (handleSaveOnDB) {
      await handleSaveOnDB();
    }

    addToast({
      message: 'Lesson Plan succesfully saved',
      type: 'success',
    });
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
          handleClick={handleClick}
          nameButton={!isSmallerScreen ? name : ''}
          rightIcon={<IconSave />}
          color="primary"
          fontWeight="normal"
          isDisabled={
            (!isEditLessonPlanClicked && editActivityLessonIndex === null) ||
            isDisabled
          }
          _hover={{ bg: 'gray.200' }}
        />
      </Flex>
    </Tooltip>
  );
}
