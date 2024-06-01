import { Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useLearningPathDesignContext } from '../../../Contexts/LearningPathDesignContext/LearningPathDesignContext';
import LearningPathEditor from '../../Layout/LearningPathEditor';

export default function TabGraph() {
  const { handleEditLessonPlanClick, isEditLessonPlanClicked } = useLearningPathDesignContext();

  useEffect(() => {
    if (isEditLessonPlanClicked) {
      handleEditLessonPlanClick(false);
    }
  }, [])
  return (
    <Flex w="100%" h="100%">
      <LearningPathEditor
        //setConceptSelectedIndex={setConceptSelectedIndex}
        // isLoading={isLoading}
        // oers={oersById}
        // conceptSelectedIndex={0}
        // collectionColor={[collections[collectionIndex]?.color]}
        // wPathEditor={isSmallerScreen ? '90%' : '95%'}
        wPathEditor="100%"
      />
    </Flex>
  );
}
