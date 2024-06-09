import { Flex, Text } from '@chakra-ui/react';
import { forwardRef, useEffect } from 'react';
import { useLearningPathDesignContext } from '../../../Contexts/LearningPathDesignContext/LearningPathDesignContext';
import TableLearningPath from '../../Tables/LearningPathTable';

export type TabTableProps = {
  isPrinting: boolean;
};

// export default function TabTable() {
const TabTable = forwardRef<HTMLDivElement, TabTableProps>((props, ref) => {
  const { isPrinting } = props;
  const { handleSaveLessonPlanClick, isEditLessonPlanClicked } =
    useLearningPathDesignContext();

  useEffect(() => {
    handleSaveLessonPlanClick();
  }, []);

  return (
    <Flex w="100%" direction="column" h="100%">
      {isEditLessonPlanClicked && (
        <Text pb={5} fontWeight="bold" fontSize="lg" color="gray.500">
          Edit table mode
        </Text>
      )}
      <TableLearningPath ref={ref} isPrinting={isPrinting} />
    </Flex>
  );
});

TabTable.displayName = 'TabTable';
export default TabTable;
