import { Flex, Tooltip } from '@chakra-ui/react';
import { useLearningPathDesignContext } from '../../../../../Contexts/LearningPathDesignContext/LearningPathDesignContext';
import { LessonPlanTabButtonProps } from '../../../../../types/encoreElements';
import IconUpload from '../../../../Icons/IconUpload/IconUpload';
import UnderlinedButton from '../UnderlinedButton';

export default function PublishLessonPlanButton({
  name,
  isDisabled,
  isSmallerScreen,
}: LessonPlanTabButtonProps) {
  const { isEditLessonPlanClicked } = useLearningPathDesignContext();
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
          handleClick={() => console.log('Publish')}
          nameButton={!isSmallerScreen ? name : ""}
          rightIcon={<IconUpload />}
          color="primary"
          fontWeight="normal"
          isDisabled={isDisabled || isEditLessonPlanClicked}
        />
      </Flex>
    </Tooltip>
  );
}
