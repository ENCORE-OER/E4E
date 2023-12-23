import React, { useEffect } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import TextBox from '../TextBox/TextBox';
import { useLearningPathDesignContext } from '../../Contexts/LearningPathDesignContext';

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
      <Box w="33%">
        <TextBox
          backgroundColor="#FAD02E"
          placeholder="Bloom Verbs"
          isHighlighted={false}
          text={customLearningObjectivePart1}
          onTextChange={handleCustomLearningObjective1Change}
        />
      </Box>
      <Box w="33%">
        <TextBox
          backgroundColor="#FF6384"
          placeholder="Skills or concepts"
          isHighlighted={false}
          text={customLearningObjectivePart0}
          onTextChange={handleCustomLearningObjective0Change}
        />
      </Box>
      <Box w="33%">
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
