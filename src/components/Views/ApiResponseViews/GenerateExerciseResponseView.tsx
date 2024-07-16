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
import { useCreateOERsContext } from '../../../Contexts/CreateOERsContext';
import {
  GeneratedExerciseProps,
  ExerciseDescriptionData,
} from '../../../types/encoreElements';

type GenerateExerciseResonseViewProps = {
  response?: GeneratedExerciseProps | null;
  topic?: string;
  oerId?: string;
};

export default function GenerateExerciseResponseView({} //oerId,
//response,
: GenerateExerciseResonseViewProps) {
  const {
    apiGeneratedExerciseData: apiData,
    chosenTopic,
    chosenTypeOfExercise,
  } = useCreateOERsContext();

  return (
    <>
      <Card variant="outline">
        <CardBody>
          <Stack spacing="4">
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Title
              </Heading>
              <Text pt="2" fontSize="sm">
                {chosenTopic}
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Task
              </Heading>
              <Text pt="2" fontSize="sm">
                {ExerciseDescriptionData[chosenTypeOfExercise]}
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Assignment
              </Heading>
              <Text pt="2" fontSize="sm">
                {apiData.Assignment}
              </Text>
            </Box>
            {apiData.Plus !== '' && (
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Plus
                </Heading>
                <Text pt="2" fontSize="sm">
                  {apiData.Plus}
                </Text>
              </Box>
            )}
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Solutions
              </Heading>
              <Text pt="2" fontSize="sm">
                {apiData.Solutions.join(' -|- ')}
              </Text>
            </Box>
            {apiData.Distractors.join(' -|- ') !== '' && (
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Distractors
                </Heading>
                <Text pt="2" fontSize="sm">
                  {apiData.Distractors.join(' -|- ')}
                </Text>
              </Box>
            )}
            {apiData.EasilyDiscardableDistractors.join(' -|- ') !== '' && (
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Easily Discardable Distractors
                </Heading>
                <Text pt="2" fontSize="sm">
                  {apiData.EasilyDiscardableDistractors.join(' -|- ')}
                </Text>
              </Box>
            )}
            {/* <Box>
              <Heading size="xs" textTransform="uppercase">
                Risposta
              </Heading>
              <Text pt="2" fontSize="sm">
                {JSON.stringify(response)}
              </Text>
            </Box> */}
          </Stack>
        </CardBody>
      </Card>
    </>
  );
}
