import { Flex } from '@chakra-ui/react';
import { useLearningPathDesignContext } from '../../../../../Contexts/LearningPathDesignContext/LearningPathDesignContext';
import IconExport from '../../../../Icons/IconExport/IconExport';
import UnderlinedButton from '../UnderlinedButton';

type ExportLessonPlanButtonProps = {
  isDisabled?: boolean;
};

export default function ExportLessonPlanButton({
  isDisabled,
}: ExportLessonPlanButtonProps) {
  const { isEditLessonPlanClicked } = useLearningPathDesignContext();
  return (
    <Flex p={1} _hover={{ bg: 'gray.200' }}>
      <UnderlinedButton
        handleClick={() => console.log('Export')}
        nameButton="Export"
        rightIcon={<IconExport />}
        color="primary"
        fontWeight="normal"
        isDisabled={isDisabled || isEditLessonPlanClicked}
      />
    </Flex>
  );
}
