import {
  Box,
  Card,
  CardBody,
  //CardHeader,
  Heading,
  Stack,
  //StackDivider,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { OerData } from '../../../types/encoreElements';
import CheckboxDisabledMenu from '../../CheckboxMenu/CheckboxDisabledMenu';
import BorderedWords from './BorderedWords';
import HighlightWords from './HighlightWords';

type ExerciseCardProps = {
  oerData: OerData;
};

export default function ExerciseCard({ oerData }: ExerciseCardProps) {
  const [typeOfExercise, setTypeOfExercise] = useState<number>(-1);
  const [correct, setCorrect] = useState<string[]>([]);
  const [distractors, setDistractors] = useState<string[]>([]);

  const handleCorrectUncorrect = () => {
    const correct: string[] = [];
    const distractors: string[] = [];
    oerData.exercise_values?.options?.forEach((oer: [string, boolean]) => {
      const [str, bool] = oer;
      if (bool) {
        correct.push(str);
      } else {
        distractors.push(str);
      }
    });
    setCorrect(correct);
    setDistractors(distractors);
  };

  const handleTypeOfExercise = () => {
    if (oerData.exercise_values.options?.length === 0) {
      setTypeOfExercise(0);
    } else if (oerData.exercise_values.fill_template !== '') {
      setTypeOfExercise(1);
      handleCorrectUncorrect();
    } else {
      setTypeOfExercise(2);
      handleCorrectUncorrect();
    }
  };
  useEffect(() => {
    handleTypeOfExercise();
  }, []);

  return (
    <>
      <Card variant="outline">
        <CardBody>
          <Stack spacing="6">
            <Box>
              <Heading size="sm">Title</Heading>
              <Text pt="2" fontSize="sm">
                {oerData.title}
              </Text>
            </Box>
            <Box>
              <Heading size="sm">Description</Heading>
              <Text pt="2" fontSize="sm">
                {oerData.description}
              </Text>
            </Box>

            {typeOfExercise === 0 && ( //only for open question
              <Box>
                <Heading size="sm">Question</Heading>
                <Text pt="2" fontSize="sm">
                  {oerData.exercise_values.question}
                </Text>
              </Box>
            )}
            {typeOfExercise === 0 && (
              <Box>
                <Heading size="sm">Solution</Heading>
                <Text pt="2" fontSize="sm">
                  {oerData.exercise_values.solution}
                </Text>
              </Box>
            )}
            {typeOfExercise === 2 && (
              <Box>
                <Heading size="sm">Exercise</Heading>
                <CheckboxDisabledMenu
                  solutions={correct}
                  distractors={distractors}
                />
              </Box>
            )}
            {typeOfExercise === 1 && (
              <Box>
                <Heading size="sm" paddingBottom={'0.5rem'}>
                  Target words
                </Heading>
                <BorderedWords words={correct} color={'green'} />
              </Box>
            )}
            {typeOfExercise === 1 && (
              <Box>
                <Heading size="sm" paddingBottom={'0.5rem'}>
                  Distractors
                </Heading>
                <BorderedWords words={distractors} color={'lightgrey'} />
              </Box>
            )}
            {typeOfExercise === 1 && (
              <Box>
                <Heading size="sm">Text to be filled</Heading>
                <HighlightWords
                  text={oerData.exercise_values.fill_template}
                  words={correct}
                  color={'green'}
                />
              </Box>
            )}
          </Stack>
        </CardBody>
      </Card>
    </>
  );
}
