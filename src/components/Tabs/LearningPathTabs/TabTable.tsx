import { Flex, Text } from '@chakra-ui/react';
import { forwardRef } from 'react';
import { useLearningPathDesignContext } from '../../../Contexts/LearningPathDesignContext/LearningPathDesignContext';
import TableLearningPath from '../../Tables/LearningPathTable';

export type TabTableProps = {
  isPrinting: boolean;
};

// export default function TabTable() {
const TabTable = forwardRef<HTMLDivElement, TabTableProps>((props, ref) => {
  const { isPrinting } = props;
  const {
    //  handleSaveLessonPlanClick,
    isEditLessonPlanClicked,
    //  idLearningScenario
  } = useLearningPathDesignContext();

  // TODO: Should be a good choise update or save even if one does not click "Save" before changing tab or page? A good idead shoud be to show a message before?

  // Save Lesson Plan when the user change Tab
  // useEffect(() => {
  //   if (idLearningScenario !== "") {
  //     handleSaveLessonPlanClick();
  //   }
  // }, []);

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
