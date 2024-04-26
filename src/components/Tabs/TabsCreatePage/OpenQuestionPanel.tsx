import { Box, Button, CircularProgress, Flex, Text } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
// import { useLocalStorage } from 'usehooks-ts';
import { useCreateOERsContext } from '../../../Contexts/CreateOERsContext';
import { useGeneralContext } from '../../../Contexts/GeneralContext';
import {
  AnalyzedMaterialProps,
  BloomLevelsEnum,
  GeneratedExerciseProps,
  questionTypeOptions,
} from '../../../types/encoreElements';
import { CustomToast } from '../../../utils/Toast/CustomToast';
import { mapOptionToNumber } from '../../../utils/utils';
import SegmentedButton from '../../Buttons/ButtonsDesignPage/SegmentedButton';
import GenerateExerciseResponseView from '../../Views/ApiResponseViews/GenerateExerciseResponseView';
//import TextBox from '../TextBox/TextBox';

type OpenQuestionPanelProps = {
  isSmallerScreen?: boolean;
  analyzeMaterial: (material: string) => Promise<AnalyzedMaterialProps>;
};

export default function OpenQuestionPanel({
  isSmallerScreen,
  analyzeMaterial,
}: OpenQuestionPanelProps) {
  const {
    isGenerateButtonClicked,
    handleIsGenerateButtonClicked,

    //targetLevelOptions,
    //temperatureOptions,
    // questionCategoryOptions,
    //assignmentTypeOptions,
    //bloomLevelOptions,

    handleTitle,
    handleDescription,

    ChosenTemperature,

    bloomLevelExercise,
    //handleBloomLevelExercise,

    //handleTemperatureOpenQuestion,
    // questionTypeOptions,

    targetLevel,
    //handleTargetLevelOpenQuestion,

    questionType,
    handleQuestionType,

    //assignmentType,
    //handleAssignmentType,

    // questionCategoryOpenQuestion,
    // handleQuestionCategoryOpenQuestion,

    ChosenTemperature: temperature,
    sourceText,
    chosenTargetLevel,
    // chosenCategory,
    chosenTypeOfExercise,
    chosenTypeOfAssignment,
    // handleTypeOfExercisePanel,
    // apiGeneratedExerciseData: apiData, // is used in the GenerateExerciseResponseView component
    handleGeneratedExerciseData,
    // handleTextToJSONOpenQuestion: handleTextToJSON,
  } = useCreateOERsContext();
  const { apiKey, setupModel } = useGeneralContext();
  const [areOptionsComplete, setAreOptionsComplete] = useState(false);
  const { addToast } = CustomToast();
  const [response, setResponse] = useState<GeneratedExerciseProps | null>(null);
  const [loading, setLoading] = useState(false);
  const responseRef = useRef<GeneratedExerciseProps | null>(null);

  const handleGenerateButtonClick = async () => {
    setLoading(true);
    // // Costruisci l'oggetto di dati da inviare nella richiesta
    // const requestData = {
    //   language: 'English',
    //   text: sourceText,
    //   level: chosenTargetLevel,
    //   type: chosenType,
    //   category: chosenCategory,
    //   temperature: temperature,
    // };

    const analyzedMaterial = await analyzeMaterial(sourceText);
    handleTitle(analyzedMaterial.Title);
    handleDescription(analyzedMaterial.MainTopics[0].Description);

    const requestData = {
      macroSubject: analyzedMaterial.MacroSubject, // from materialAnalyzer API
      title: analyzedMaterial.Title, // from materialAnalyzer API
      level: chosenTargetLevel,
      typeOfExercise: chosenTypeOfExercise, // 0 = open question, 1 = short answer, 2 = true or false
      learningObjective: `Teaching the students ${analyzedMaterial.MainTopics[0].Topic}. In particular ${analyzedMaterial.MainTopics[0].Description}`, // TODO: add a component in frontend to set the learning objective???
      bloomLevel: mapOptionToNumber(bloomLevelExercise, BloomLevelsEnum),
      // language: language, // English by default
      material: sourceText,
      // correctAnswersNumber: 1,
      // distractorsNumber: 0,
      // easilyDiscardableDistractorsNumber: 0,
      // assignmentType: analyzedMaterial.MainTopics[0].Type, // 0 is for theoretical assignment
      assignmentType: chosenTypeOfAssignment,
      topic: analyzedMaterial.MainTopics[0].Topic, // from materialAnalyzer API
      temperature: temperature,
    };

    try {
      // Esegui la chiamata API
      const apiResponse = await axios.post(
        // '/api/encore/genAI/openQuestionExercise',
        '/api/encore/genAI/generateExercise',
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
      setResponse(responseRef.current);

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

  const handleOptionsComplete = () => {
    if (
      targetLevel !== null &&
      questionType !== null &&
      // questionCategoryOpenQuestion !== null &&
      bloomLevelExercise !== null &&
      ChosenTemperature !== null
    ) {
      setAreOptionsComplete(true);
    }
  };

  useEffect(() => {
    handleOptionsComplete();
  }, [targetLevel, questionType, bloomLevelExercise, ChosenTemperature]);

  return (
    <>
      {/* <Flex w={'100%'}>
        <Box w={'80%'}>
          <Flex paddingBottom="0.5rem">
            <Text as="b">Target level</Text>
          </Flex>
          <SegmentedButton
            isHighlighted={
              isGenerateButtonClicked && targetLevelOpenQuestion == null
            }
            options={targetLevelOptions}
            selected={targetLevelOpenQuestion}
            preselectedTitle={targetLevelOpenQuestion?.title}
            onChange={handleTargetLevelOpenQuestion}
            isSmallerScreen={isSmallerScreen || false}
            fontSize={'md'}
          />
        </Box>
      </Flex> */}
      <Flex w={'100%'}>
        <Box w={'60%'}>
          <Flex paddingBottom="0.5rem">
            <Text as="b">Question Type</Text>
          </Flex>
          <SegmentedButton
            isHighlighted={isGenerateButtonClicked && questionType == null}
            options={questionTypeOptions}
            selected={questionType}
            preselectedTitle={questionType?.title}
            onChange={handleQuestionType}
            isSmallerScreen={isSmallerScreen || false}
            fontSize={'md'}
          />
        </Box>
        {/* <Box w={'42%'} paddingLeft={'2%'}>
          <Flex paddingBottom="0.5rem">
            <Text as="b">Exercise Type</Text>
          </Flex>
          <SegmentedButton
            isHighlighted={isGenerateButtonClicked && assignmentType === null}
            options={assignmentTypeOptions}
            selected={assignmentType}
            preselectedTitle={assignmentType?.title}
            onChange={handleAssignmentType}
            isSmallerScreen={isSmallerScreen || false}
            fontSize={'md'}
          />
        </Box> */}
      </Flex>
      {/* <Flex w={'100%'} paddingTop={'2rem'}>
        {/* <Box w={'90%'}>
          <Flex paddingBottom="0.5rem">
            <Text as="b">Question Category</Text>
          </Flex>
          <SegmentedButton
            isHighlighted={
              isGenerateButtonClicked && questionCategoryOpenQuestion == null
            }
            options={questionCategoryOptions}
            selected={questionCategoryOpenQuestion}
            preselectedTitle={questionCategoryOpenQuestion?.title}
            onChange={handleQuestionCategoryOpenQuestion}
            isSmallerScreen={isSmallerScreen || false}
            fontSize={'md'}
          />
        </Box> 
        <Box w={'90%'}>
          <Flex paddingBottom="0.5rem">
            <Text as="b">Bloom Level</Text>
          </Flex>
          <SegmentedButton
            isHighlighted={
              isGenerateButtonClicked && bloomLevelExercise == null
            }
            options={bloomLevelOptions}
            selected={bloomLevelExercise}
            preselectedTitle={bloomLevelExercise?.title}
            onChange={handleBloomLevelExercise}
            isSmallerScreen={isSmallerScreen || false}
            fontSize={'md'}
          />
        </Box>
      </Flex> */}
      {/* <Flex w={'100%'} paddingTop={'2rem'}>
        <Box w={'80%'}>
          <Flex paddingBottom="0.5rem">
            <Text as="b">Creativity of AI</Text>
          </Flex>
          <SegmentedButton
            isHighlighted={
              isGenerateButtonClicked && temperatureOpenQuestion == null
            }
            options={temperatureOptions}
            selected={temperatureOpenQuestion}
            preselectedTitle={temperatureOpenQuestion?.title}
            onChange={handleTemperatureOpenQuestion}
            isSmallerScreen={isSmallerScreen || false}
            fontSize={'md'}
          />
        </Box>
      </Flex> */}
      <Flex paddingTop="3rem" w="40%">
        <Button
          size="lg"
          colorScheme="yellow"
          border="solid 1px"
          borderRadius="lg"
          //isDisabled={sourceText === ''}
          onClick={() => {
            // handleTypeOfExercisePanel(0);
            handleOptionsComplete();
            if (areOptionsComplete) {
              if (sourceText !== '') {
                handleIsGenerateButtonClicked(true);
                handleGenerateButtonClick();
              } else {
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
          <Text as="b">Output</Text>
        </Flex>
        {loading ? (
          <Box>
            <Text>Loading...</Text>
          </Box>
        ) : (
          response && <GenerateExerciseResponseView response={response} />
        )}
      </Box>
    </>
  );
}
