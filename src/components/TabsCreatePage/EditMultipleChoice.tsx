import { Box, Flex, Text } from '@chakra-ui/react';
//import axios from 'axios';
import { useEffect } from 'react';
//import { CustomToast } from '../../utils/Toast/CustomToast';
import { useCreateOERsContext } from '../../Contexts/CreateOERsContext';
import { useHasHydrated } from '../../utils/utils';
import CheckboxEditableMenu from '../CheckboxMenu/CheckboxEditableMenu';
import RadioEditableMenu from '../RadioMenu/RadioEditableMenu';
import TextBox from '../TextBox/TextBox';

type MultipleChoiceData = {
  // language: string;
  // date: string;
  // level: string;
  // temperature: number;
  // type: boolean;
  // nedd: number;
  // n_o_d: number;
  // category: string;
  // question: string;
  // correctAnswerIndex: number;
  // answers: string[];
  // solution: string;
  language: string;
  date: string;
  level: string;
  temperature: number;
  nedd: number;
  n_o_d: number;
  category: string;
  question: string;
  correctAnswer: string;
  answers: { [key: string]: boolean };
  solution: string;
};

type EditMultipleChoiceProps = {
  isSmallerScreen?: boolean;
  multipleChoiceData: MultipleChoiceData;
};

export default function EditMultipleChoice({
  multipleChoiceData,
}: EditMultipleChoiceProps) {
  const hydrated = useHasHydrated();
  const {
    title,
    handleTitle,
    description,
    handleDescription,
    solution,
    handleSolution,
    question,
    handleQuestion,
    options,
    handleOptions,
    handleOptionsChange,
    chosenType,
  } = useCreateOERsContext();

  useEffect(() => {
    handleSolution(multipleChoiceData.solution);
    handleQuestion(multipleChoiceData.question);
    handleOptionsChange(
      multipleChoiceData.answers
      // multipleChoiceData.answers.reduce(
      //   (acc, answer, index) => {
      //     acc[answer] = index === multipleChoiceData.correctAnswerIndex;
      //     return acc;
      //   },
      //   {} as { [key: string]: boolean }
      // )
    );
  }, []);

  useEffect(() => {
    console.log(options);
  }, [options]);

  // const [question, setQuestion] = useState<string>(multipleChoiceData.question);
  // const [solution, setSolution] = useState<string>(multipleChoiceData.solution);
  // const [answersObject, setAnswersObject] = useState<{
  //   [key: string]: boolean;
  // }>(
  //   multipleChoiceData.answers.reduce(
  //     (acc, answer, index) => {
  //       acc[answer] = index === multipleChoiceData.correctAnswerIndex;
  //       return acc;
  //     },
  //     {} as { [key: string]: boolean }
  //   )
  // );

  // useEffect(() => {
  //   console.log(answersObject);
  // }, [answersObject]);

  // const handleAnswerChange = (answer: string, isChecked: boolean) => {
  //   setAnswersObject((prevAnswers) => {
  //     const updatedAnswers = { ...prevAnswers, [answer]: isChecked };
  //     return updatedAnswers;
  //   });
  // };
  // const handleOptionsChange = (newOptions: { [key: string]: boolean }) => {
  //   setAnswersObject(newOptions);
  // };
  // const handleSolution = (newSolution: string) => {
  //   setSolution(newSolution);
  // };
  // const handleQuestion = (newQuestion: string) => {
  //   setQuestion(newQuestion);
  // };

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
            placeholder="Insert the title of the exercise"
            rows={1}
          />
          <Flex paddingBottom="0.5rem" paddingTop="1rem">
            <Text as="b">Description</Text>
          </Flex>
          <TextBox
            text={description}
            onTextChange={handleDescription}
            placeholder="Insert the description of the exercise"
            rows={5}
          />
          <Flex paddingBottom="0.5rem" paddingTop="1rem">
            <Text as="b">Question</Text>
          </Flex>
          <TextBox
            text={question}
            onTextChange={handleQuestion}
            placeholder="Insert the question of the exercise"
            rows={5}
          />
          <Flex paddingBottom="0.5rem" paddingTop="1rem">
            <Text as="b">Options</Text>
          </Flex>
          {hydrated &&
            (chosenType ? (
              <RadioEditableMenu
                initialOptions={options}
                onChange={handleOptions}
                onOptionsChange={handleOptionsChange}
              />
            ) : (
              <CheckboxEditableMenu
                initialOptions={options}
                onChange={handleOptions}
                onOptionsChange={handleOptionsChange}
              />
            ))}
          <Flex paddingBottom="0.5rem" paddingTop="1rem">
            <Text as="b">Answer</Text>
          </Flex>
          <TextBox
            text={solution}
            onTextChange={handleSolution}
            placeholder="Insert the solution of the exercise"
            rows={7}
          />
        </Box>
      </Flex>
    </>
  );
}
