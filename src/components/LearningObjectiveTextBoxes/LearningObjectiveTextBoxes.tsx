import { Box, Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useLearningPathDesignContext } from '../../Contexts/LearningPathDesignContext';
import TextBox from '../TextBox/TextBox';

//type ThreeTextBoxesProps = {};

const ThreeTextBoxes = () => {
  const {
    customLearningObjectivePart0,
    customLearningObjectivePart1,
    customLearningObjectivePart2,
    handleCustomLearningObjective0Change,
    handleCustomLearningObjective1Change,
    handleCustomLearningObjective2Change,
  } = useLearningPathDesignContext();

  useEffect(() => {
    console.log(
      'customLearningObjectives: ' +
        customLearningObjectivePart0 +
        ' ' +
        customLearningObjectivePart1 +
        ' ' +
        customLearningObjectivePart2
    );
  }, []);

  return (
    <Flex>
      <Box flex="1">
        <TextBox
          backgroundColor="#FAD02E"
          placeholder="Bloom Verbs"
          isHighlighted={false}
          text={customLearningObjectivePart1}
          onTextChange={handleCustomLearningObjective1Change}
        />
      </Box>
      <Box flex="1">
        <TextBox
          backgroundColor="#FF6384"
          placeholder="Skills or concepts"
          isHighlighted={false}
          text={customLearningObjectivePart0}
          onTextChange={handleCustomLearningObjective0Change}
        />
      </Box>
      <Box flex="1">
        <TextBox
          backgroundColor="#36A2EB"
          placeholder="Context"
          isHighlighted={false}
          text={customLearningObjectivePart2}
          onTextChange={handleCustomLearningObjective2Change}
        />
      </Box>
    </Flex>
  );
};

export default ThreeTextBoxes;
