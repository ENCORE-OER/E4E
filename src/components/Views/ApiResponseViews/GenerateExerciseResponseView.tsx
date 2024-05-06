import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';
import { useCreateOERsContext } from '../../../Contexts/CreateOERsContext';
import { GeneratedExerciseProps } from '../../../types/encoreElements';

type GenerateExerciseResonseViewProps = {
  response: GeneratedExerciseProps | null;
};

export default function GenerateExerciseResponseView({} //response,
: GenerateExerciseResonseViewProps) {
  const { apiGeneratedExerciseData: apiData, title } = useCreateOERsContext();

  return (
    <>
      <Card>
        <CardHeader>
          <Heading size="md">{title}</Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Assignment
              </Heading>
              <Text pt="2" fontSize="sm">
                {apiData.Assignment}
              </Text>
            </Box>
            { apiData.Plus !== "" &&
              <Box>            
                <Heading size="xs" textTransform="uppercase">
                  Plus
                </Heading>
                <Text pt="2" fontSize="sm">
                  {apiData.Plus}
                </Text>
              </Box>
            }
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Solutions
              </Heading>
              <Text pt="2" fontSize="sm">
                {apiData.Solutions.join(' -|- ')}
              </Text>
            </Box>
             { apiData.Distractors.join(' -|- ') !== "" &&
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Distractors
                </Heading>
                <Text pt="2" fontSize="sm">
                  {apiData.Distractors.join(' -|- ')}
                </Text>
              </Box>
            }
            { apiData.EasilyDiscardableDistractors.join(' -|- ') !== "" &&
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Easily Discardable Distractors
                </Heading>
                <Text pt="2" fontSize="sm">
                  {apiData.EasilyDiscardableDistractors.join(' -|- ')}
                </Text>
              </Box>
            }
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
