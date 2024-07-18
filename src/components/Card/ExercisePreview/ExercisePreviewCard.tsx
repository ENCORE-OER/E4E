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
// import { useCollectionsContext } from '../../../Contexts/CollectionsContext/CollectionsContext';
import { ExerciseDescriptionData } from '../../../types/encoreElements';
import CheckboxDisabledMenu from '../../CheckboxMenu/CheckboxDisabledMenu';
import BorderedWords from '../../Card/ExercisePreview/BorderedWords';
import HighlightWords from '../../Card/ExercisePreview/HighlightWords';

type ExercisePreviewCardProps = {
  oerId?: string;
};

export default function ExercisePreviewCard({}: ExercisePreviewCardProps) {
  const {
    apiGeneratedExerciseData: apiData,
    chosenTopic,
    chosenTypeOfExercise,
  } = useCreateOERsContext();

  // const { collections } = useCollectionsContext();

  /*
    devo accedere alla collezione
    da li prendere l'id dell'oer
    e ancora da li prendere i dati della preview
    oke oke
    */

  return (
    <>
      <Card variant="outline">
        <CardBody>
          <Stack spacing="6">
            <Box>
              <Heading size="sm">Title</Heading>
              <Text pt="2" fontSize="sm">
                {chosenTopic}
              </Text>
            </Box>
            <Box>
              <Heading size="sm">Task</Heading>
              <Text pt="2" fontSize="sm">
                {ExerciseDescriptionData[chosenTypeOfExercise]}
              </Text>
            </Box>
            <Box>
              <Heading size="sm">Assignment</Heading>
              <Text pt="2" fontSize="sm">
                {apiData.Assignment}
              </Text>
            </Box>
            {chosenTypeOfExercise < 3 && ( //only for open question
              <Box>
                <Heading size="sm">Solutions</Heading>
                <Text pt="2" fontSize="sm">
                  {apiData.Solutions}
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
            {chosenTypeOfExercise == 3 && (
              <Box>
                <Heading size="sm" paddingBottom={'0.5rem'}>
                  Target words
                </Heading>
                <BorderedWords words={apiData.Solutions} color={'green'} />
              </Box>
            )}
            {apiData.Distractors.join(' -|- ') !== '' &&
              chosenTypeOfExercise == 3 && (
                <Box>
                  <Heading size="sm" paddingBottom={'0.5rem'}>
                    Regular Distractors
                  </Heading>
                  <BorderedWords
                    words={apiData.Distractors}
                    color={'lightgrey'}
                  />
                </Box>
              )}
            {apiData.EasilyDiscardableDistractors.join(' -|- ') !== '' &&
              chosenTypeOfExercise == 3 && (
                <Box>
                  <Heading size="sm" paddingBottom={'0.5rem'}>
                    Easy Distractors
                  </Heading>
                  <BorderedWords
                    words={apiData.EasilyDiscardableDistractors}
                    color={'lightgrey'}
                  />
                </Box>
              )}
            {chosenTypeOfExercise == 3 && (
              <Box>
                <Heading size="sm">Text to be filled</Heading>
                <HighlightWords
                  text={apiData.Plus}
                  words={apiData.Solutions}
                  color={'green'}
                />
              </Box>
            )}

            {/* <Box>
                <Heading size="xs" textTransform="uppercase">
                  Collections
                </Heading>
                <Text pt="2" fontSize="sm">
                  {JSON.stringify(collections)}
                </Text>
              </Box> */}
          </Stack>
        </CardBody>
      </Card>
    </>
  );
}
