import { Box, Button, CircularProgress, Flex, Text } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useCreateOERsContext } from '../../../Contexts/CreateOERsContext';
import { useGeneralContext } from '../../../Contexts/GeneralContext';
import {
  BloomLevelsEnum,
  GeneratedExerciseProps,
} from '../../../types/encoreElements';
import { CustomToast } from '../../../utils/Toast/CustomToast';
import { mapOptionToNumber } from '../../../utils/utils';
import GenerateExerciseResponseView from '../../Views/ApiResponseViews/GenerateExerciseResponseView';

type CreateExerciseButtonProps = {
  isSmallerScreen?: boolean;
  isAddContentModal?: boolean;
};

export default function CreateExerciseButton({
  isSmallerScreen,
  isAddContentModal,
}: CreateExerciseButtonProps) {
  const {
    typeOfExercisePanel,
    sourceText,
    handleIsGenerateButtonClicked,
    questionType,
    bloomLevelExercise,
    temperature,
    targetLevel,
    distractorsFillGaps,
    easyDistractorsFillGaps,
    blanks,
    chosenTargetLevel,
    ChosenTemperature,
    chosenTypeOfAssignment,
    chosenTypeOfExercise,
    // apiGeneratedExerciseData: apiData, // is used in the GenerateExerciseResponseView component
    //handleTextToJSONFillGaps: handleTextToJSON,
    handleGeneratedExerciseData,
    assignmentType,
    correctAnswerQuiz,
    distractorsMultipleChoice,
    easyDistractors,
    title,
    description,
    macroSubject,
    chosenTopic,
    learningObjective,
    apiGeneratedExerciseData,
  } = useCreateOERsContext();
  const { apiKey, setupModel } = useGeneralContext();
  const responseRef = useRef<GeneratedExerciseProps | null>(null);
  const { addToast } = CustomToast();

  const [loading, setLoading] = useState(false);
  const [areOptionsComplete, setAreOptionsComplete] = useState(false);
  const [response, setResponse] = useState<GeneratedExerciseProps | null>(null);

  const handleGenerateButtonClick = async () => {
    setLoading(true);

    let temp;

    if (typeOfExercisePanel === 'Fill the Gaps') {
      temp = {
        macroSubject: macroSubject, // from materialAnalyzer API
        title: title, // from materialAnalyzer API
        level: chosenTargetLevel,
        typeOfActivity: chosenTypeOfExercise,
        learningObjective: learningObjective,
        bloomLevel: mapOptionToNumber(bloomLevelExercise, BloomLevelsEnum),
        // language: language, // English by default
        material: sourceText,
        correctAnswersNumber: blanks,
        distractorsNumber: distractorsFillGaps,
        easilyDiscardableDistractorsNumber: easyDistractorsFillGaps,
        assignmentType: chosenTypeOfAssignment, // 0 is for theoretical assignment
        topic: chosenTopic, // from materialAnalyzer API
        temperature: ChosenTemperature,
      };
    } else if (typeOfExercisePanel === 'Open Question') {
      temp = {
        macroSubject: macroSubject, // from materialAnalyzer API
        title: title, // from materialAnalyzer API
        level: chosenTargetLevel,
        typeOfActivity: chosenTypeOfExercise, // 0 = open question, 1 = short answer, 2 = true or false
        learningObjective: `Teaching the students ${title}. In particular ${description}`, // TODO: add a component in frontend to set the learning objective???
        bloomLevel: mapOptionToNumber(bloomLevelExercise, BloomLevelsEnum),
        // language: language, // English by default
        material: sourceText,
        assignmentType: chosenTypeOfAssignment,
        topic: chosenTopic, // from materialAnalyzer API
        temperature: ChosenTemperature,
      };
    } else if (typeOfExercisePanel === 'Multiple Choice') {
      temp = {
        macroSubject: macroSubject, // from materialAnalyzer API
        title: title, // from materialAnalyzer API
        level: chosenTargetLevel,
        typeOfActivity: chosenTypeOfExercise, //exerciseTypeNumber, // fill_in_the_blanks exercise
        learningObjective: `Teaching the students ${chosenTopic}. In particular ${description}`, // TODO: add a component in frontend to set the learning objective???
        bloomLevel: mapOptionToNumber(bloomLevelExercise, BloomLevelsEnum),
        // language: language, // English by default
        material: sourceText,
        correctAnswersNumber: correctAnswerQuiz,
        distractorsNumber: distractorsMultipleChoice,
        easilyDiscardableDistractorsNumber: easyDistractors,
        assignmentType: chosenTypeOfAssignment, // 0 is for theoretical assignment
        topic: chosenTopic, // from materialAnalyzer API
        temperature: ChosenTemperature,
      };
    }
    const requestData = temp;

    try {
      // Esegui la chiamata API
      const apiResponse = await axios.post(
        `${isAddContentModal !== undefined && isAddContentModal ? '..' : ''
        }/api/encore/genAI/generateActivity`,
        requestData,
        {
          headers: {
            ApiKey: apiKey,
            SetupModel: setupModel,
          },
        }
      );

      responseRef.current = apiResponse.data ?? null;
      // Gestisci la risposta
      setResponse(apiResponse.data ?? null);
    } catch (error) {
      console.error('Errore durante la chiamata API:', error);
      // Gestisci l'errore, mostra un messaggio o fai qualcos'altro
    } finally {
      setLoading(false);
      setResponse(responseRef.current ?? null);

      if (responseRef.current) {
        // setRispostaTipo(responseRef.current);
        // handleTextToJSON(responseRef.current);
        handleGeneratedExerciseData(
          responseRef.current.Assignment,
          responseRef.current.Plus,
          responseRef.current.Solutions,
          responseRef.current.Distractors,
          responseRef.current.EasilyDiscardableDistractors
        );
      } else {
        addToast({
          message: 'Error during the API call.',
          type: 'warning',
        });
      }
    }
  };

  useEffect(() => {
    handleOptionsComplete();
  }, [
    targetLevel,
    ChosenTemperature,
    bloomLevelExercise,
    questionType,
    assignmentType,
    temperature,
    learningObjective,
    chosenTopic,
  ]);

  const handleOptionsComplete = () => {
    if (typeOfExercisePanel === 'Fill the Gaps') {
      if (
        targetLevel !== null &&
        bloomLevelExercise !== null &&
        //length !== null &&
        temperature !== null &&
        learningObjective !== '' &&
        chosenTopic !== ''
      ) {
        setAreOptionsComplete(true);
      }
    } else if (typeOfExercisePanel === 'Open Question') {
      if (
        targetLevel !== null &&
        bloomLevelExercise !== null &&
        temperature !== null &&
        questionType !== null &&
        learningObjective !== '' &&
        chosenTopic !== ''
      ) {
        setAreOptionsComplete(true);
      }
    } else if (typeOfExercisePanel === 'Multiple Choice') {
      if (
        targetLevel !== null &&
        bloomLevelExercise !== null &&
        assignmentType !== null &&
        temperature !== null &&
        learningObjective !== '' &&
        chosenTopic !== ''
      ) {
        setAreOptionsComplete(true);
      }
    }
  };

  return (
    <>
      <Flex paddingTop="3rem" w="40%">
        <Button
          size="lg"
          colorScheme="yellow"
          border="solid 1px"
          borderRadius="lg"
          //isDisabled={sourceText === ''}
          onClick={() => {
            handleOptionsComplete();

            //handleTypeOfExercisePanel(1);
            if (areOptionsComplete) {
              if (sourceText !== '') {
                handleGenerateButtonClick();
              } else {
                handleIsGenerateButtonClicked(true);
                addToast({
                  message: 'Please add a resource for the exercise.',
                  type: 'warning',
                });
              }
            } else {
              addToast({
                message:
                  'Please ensure all required fields are filled out before proceeding.',
                type: 'warning',
              });
              handleIsGenerateButtonClicked(true);
            }
          }}
        >
          <Text as="b">Generate</Text>
        </Button>
        {loading && (
          <Box ml={4}>
            <CircularProgress isIndeterminate color="yellow.400" />
          </Box>
        )}
      </Flex>

      <Box w={isSmallerScreen ? '95%' : '90%'} paddingTop="2rem">
        <Flex paddingBottom="0.5rem">
          <Text as="b">Exercise preview</Text>
        </Flex>
        {loading ? (
          <Box>
            <Text>Loading...</Text>
          </Box>
        ) : (
          (response || apiGeneratedExerciseData.Assignment !== '') && (
            <GenerateExerciseResponseView response={response} />
          )
        )}
      </Box>
    </>
  );
}
