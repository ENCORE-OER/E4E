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
import BorderedWords from '../../Card/ExercisePreview/BorderedWords';
import HighlightWords from '../../Card/ExercisePreview/HighlightWords';

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
            {chosenTypeOfExercise > 3 && ( 
              <Box>
                <Heading size="sm">
                  {/*spiegazione della soluzione nel multiple choice e testo nel fill gaps */}
                  Solution explained
                </Heading>
                <Text pt="2" fontSize="sm">
                  {apiData.Plus}
                </Text>
              </Box>
            )}
            {chosenTypeOfExercise > 3 && (
              <Box>
                <Heading size="sm">
                  Exercise
                </Heading>
                <CheckboxDisabledMenu
                  solutions={apiData.Solutions}
                  distractors={[
                    ...apiData.Distractors,
                    ...apiData.EasilyDiscardableDistractors,
                  ]}
                />
              </Box>
            )}
            {chosenTypeOfExercise == 3 && (
              <Box>
                <Heading size="sm" paddingBottom={'0.5rem'}> 
                  Target words
                </Heading>
                <BorderedWords words={apiData.Solutions} color={'green'}/>
              </Box>
            )}
             {apiData.Distractors.join(' -|- ') !== '' && chosenTypeOfExercise == 3 && (
              <Box>
                <Heading size="sm" paddingBottom={'0.5rem'}> 
                  Regular Distractors
                </Heading>
                <BorderedWords words={apiData.Distractors} color={'lightgrey'} />
              </Box>
            )}
            {apiData.EasilyDiscardableDistractors.join(' -|- ') !== '' && chosenTypeOfExercise == 3 && (
              <Box>
                <Heading size="sm" paddingBottom={'0.5rem'}> 
                  Easy Distractors
                </Heading>
                <BorderedWords words={apiData.EasilyDiscardableDistractors} color={'lightgrey'} />
              </Box>
            )} 
            {chosenTypeOfExercise == 3 && (
              <Box>
                <Heading size="sm"> 
                  Text to be filled
                </Heading>
                <HighlightWords text={apiData.Plus} words={apiData.Solutions} color={'green'}/>
              </Box>
            )}           

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
