import { Box, Flex, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useCreateOERsContext } from '../../../Contexts/CreateOERsContext';
import { GeneratedExerciseProps } from '../../../types/encoreElements';
import TextBox from '../../TextBox/TextBox';

// type OpenQuestionData = {
//   language: string;
//   date: string;
//   level: string;
//   type_of_question: string;
//   category: string;
//   temperature: number;
//   question: string;
//   correctAnswer: string;
// };

type EditOpenQuestionProps = {
  isSmallerScreen?: boolean;
  openQuestionData: GeneratedExerciseProps;
};

export default function EditOpenQuestion({
  openQuestionData,
}: EditOpenQuestionProps) {
  const {
    title,
    handleTitle,
    description,
    handleDescription,
    question,
    handleQuestion,
    solution,
    handleSolution,
  } = useCreateOERsContext();

  useEffect(() => {
    handleQuestion(openQuestionData.Assignment);
    handleSolution(openQuestionData.Solutions[0]);
  }, []);

  return (
    <>
      <Flex w={'100%'}>
        <Box w={'100%'}>
          <Flex paddingBottom="0.5rem" paddingTop="1rem">
            <Text as="b">Title</Text>
          </Flex>
          <TextBox
            text={title}
            onTextChange={handleTitle}
            placeholder="Insert the title of the question"
            rows={1}
          />
          <Flex paddingBottom="0.5rem" paddingTop="1rem">
            <Text as="b">Description</Text>
          </Flex>
          <TextBox
            text={description}
            onTextChange={handleDescription}
            placeholder="Insert the description of the question"
            rows={5}
          />
          <Flex paddingBottom="0.5rem" paddingTop="1rem">
            <Text as="b">Question</Text>
          </Flex>
          <TextBox
            text={question}
            onTextChange={handleQuestion}
            placeholder="Insert the question"
            rows={5}
          />
          {console.log('question', question)}
          <Flex paddingBottom="0.5rem" paddingTop="1rem">
            <Text as="b">Answer</Text>
          </Flex>
          <TextBox
            text={solution}
            onTextChange={handleSolution}
            placeholder="Insert the answer of the question"
            rows={5}
          />
          {console.log('solution', solution)}
        </Box>
      </Flex>
    </>
  );
}
