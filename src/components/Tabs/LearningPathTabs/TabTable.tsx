import { Flex, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useLearningPathDesignContext } from '../../../Contexts/LearningPathDesignContext/LearningPathDesignContext';
import TableLearningPath from '../../Tables/LearningPathTable';

export default function TabTable() {
  const { handleEditLessonPlanClick, isEditLessonPlanClicked } =
    useLearningPathDesignContext();

  useEffect(() => {
    if (isEditLessonPlanClicked) {
      handleEditLessonPlanClick(false);
    }
  }, []);
  return (
    <Flex w="100%" direction="column" h="100%">
      {isEditLessonPlanClicked && (
        <Text pb={5} fontWeight="bold" fontSize="lg" color="gray.400">
          Edit table mode
        </Text>
      )}
      <TableLearningPath />
    </Flex>
  );
}
