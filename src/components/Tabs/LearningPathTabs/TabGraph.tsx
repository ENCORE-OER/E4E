import { Flex } from '@chakra-ui/react';
import LearningPathEditor from '../../Layout/LearningPathEditor';

export default function TabGraph() {
  // const { handleSaveLessonPlanClick } =
  //   useLearningPathDesignContext();

  // Save Lesson Plan when the user change Tab
  // useEffect(() => {
  //   handleSaveLessonPlanClick();
  // }, []);
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
