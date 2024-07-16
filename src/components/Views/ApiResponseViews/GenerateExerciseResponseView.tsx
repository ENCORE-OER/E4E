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
import CheckboxDisabledMenu from '../../CheckboxMenu/CheckboxDisabledMenu';

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
          <Stack spacing="6">
            <Box>
              <Heading size="sm">
                {' '}
                {/* comune a tutti */}
                Title
              </Heading>
              <Text pt="2" fontSize="sm">
                {chosenTopic}
              </Text>
            </Box>
            <Box>
              <Heading size="sm">
                {' '}
                {/* comune a tutti */}
                Task
              </Heading>
              <Text pt="2" fontSize="sm">
                {ExerciseDescriptionData[chosenTypeOfExercise]}
              </Text>
            </Box>
            <Box>
              <Heading size="sm">
                {' '}
                {/* comune a tutti */}
                Assignment
              </Heading>
              <Text pt="2" fontSize="sm">
                {apiData.Assignment}
              </Text>
            </Box>
            {chosenTypeOfExercise < 3 && ( //only for open question
              <Box>
                <Heading size="sm">Solutions</Heading>
                <Text pt="2" fontSize="sm">
                  {apiData.Solutions.join(' -|- ')}
                </Text>
              </Box>
            )}
            {chosenTypeOfExercise > 2 && ( //todo da cambiare in 3 quandoa anche fill gaps è pronto
              <Box>
                <Heading size="sm">
                  {' '}
                  {/*spiegazione della soluzione nel multiple choice e testo nel fill gaps */}
                  Explanation of the solution
                </Heading>
                <Text pt="2" fontSize="sm">
                  {apiData.Plus}
                </Text>
              </Box>
            )}
            {chosenTypeOfExercise > 2 && ( //todo da cambiare in 3 quandoa anche fill gaps è pronto
              <Box>
                <Heading size="sm">Exercise</Heading>
                <CheckboxDisabledMenu
                  solutions={apiData.Solutions}
                  distractors={[
                    ...apiData.Distractors,
                    ...apiData.EasilyDiscardableDistractors,
                  ]}
                />
              </Box>
            )}
            {/* {apiData.Distractors.join(' -|- ') !== '' && (
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
            )} */}

            {/* <Box>
              <Heading size="xs" textTransform="uppercase">
                Response
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
