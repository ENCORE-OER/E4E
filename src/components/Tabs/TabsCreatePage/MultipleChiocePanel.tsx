import { Box, Button, CircularProgress, Flex, Text } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useCreateOERsContext } from '../../../Contexts/CreateOERsContext';
import { useGeneralContext } from '../../../Contexts/GeneralContext';
import {
  AnalyzedMaterialProps,
  BloomLevelsEnum,
  GeneratedExerciseProps,
} from '../../../types/encoreElements';
import { CustomToast } from '../../../utils/Toast/CustomToast';
import { mapOptionToNumber } from '../../../utils/utils';
// import SegmentedButton from '../../Buttons/ButtonsDesignPage/SegmentedButton';
import SliderInput from '../../NumberInput/SliderNumberInput';
import GenerateExerciseResponseView from '../../Views/ApiResponseViews/GenerateExerciseResponseView';

type MultipleChoicePanelProps = {
  isSmallerScreen?: boolean;
  analyzeMaterial: (material: string) => Promise<AnalyzedMaterialProps>;
};

export default function MultipleChoicePanel({
  isSmallerScreen,
  analyzeMaterial,
}: MultipleChoicePanelProps) {
  const {
    // isGenerateButtonClicked,
    handleIsGenerateButtonClicked,

    // targetLevelOptions,
    // temperatureOptions,
    // questionCategoryOptions,
    // assignmentTypeOptions,
    // bloomLevelOptions,

    handleTitle,
    handleDescription,

    bloomLevelExercise,
    // handleBloomLevelExercise,

    temperature,
    // handleTemperatureMultipleChoice,

    targetLevel,
    // handleTargetLevelMultipleChoice,

    assignmentType,
    // handleAssignmentType,

    //questionCategoryMultipleChoice,
    // handleQuestionCategoryMultipleChoice,

    correctAnswerQuiz,
    handleCorrectAnswerQuiz,

    easyDistractors,
    handleEasyDistractors,

    distractorsMultipleChoice,
    handleDistractorsMultipleChoice,

    ChosenTemperature,
    sourceText,
    chosenTargetLevel,
    chosenTypeOfExercise,
    chosenTypeOfAssignment,
    // chosenCategory,
    // handleTypeOfExercisePanel,

    // apiGeneratedExerciseData: apiData, // is used in the GenerateExerciseResponseView component
    // handleTextToJSONMultipleChoice: handleTextToJSON,
    handleGeneratedExerciseData,
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
    //   type: chosenType,
    //   text: sourceText,
    //   level: chosenTargetLevel,
    //   category: chosenCategory,
    //   temperature: temperature,
    //   n_o_ca: correctAnswer,
    //   nedd: easyDistractors,
    //   n_o_d: distractorsMultipleChoice,
    // };

    // analyze the material (url or text) to take the macroSubject, title, topic, assignmentType
    const analyzedMaterial = await analyzeMaterial(sourceText);
    handleTitle(analyzedMaterial.Title);
    handleDescription(analyzedMaterial.MainTopics[0].Description);

    // const exerciseTypeNumber =
    //   correctAnswerQuiz === 1
    //     ? mapOptionToNumber({ title: 'single_choice' }, TypeOfExerciseEnum)
    //     : mapOptionToNumber({ title: 'multiple_choice' }, TypeOfExerciseEnum);

    const requestData = {
      macroSubject: analyzedMaterial.MacroSubject, // from materialAnalyzer API
      title: analyzedMaterial.Title, // from materialAnalyzer API
      level: chosenTargetLevel,
      typeOfExercise: chosenTypeOfExercise, //exerciseTypeNumber, // fill_in_the_blanks exercise
      learningObjective: `Teaching the students ${analyzedMaterial.MainTopics[0].Topic}. In particular ${analyzedMaterial.MainTopics[0].Description}`, // TODO: add a component in frontend to set the learning objective???
      bloomLevel: mapOptionToNumber(bloomLevelExercise, BloomLevelsEnum),
      // language: language, // English by default
      material: sourceText,
      correctAnswersNumber: correctAnswerQuiz,
      distractorsNumber: distractorsMultipleChoice,
      easilyDiscardableDistractorsNumber: easyDistractors,
      assignmentType: analyzedMaterial.MainTopics[0].Type, // 0 is for theoretical assignment
      topic: analyzedMaterial.MainTopics[0].Topic, // from materialAnalyzer API
      temperature: ChosenTemperature,
    };

    try {
      // Esegui la chiamata API
      const apiResponse = await axios.post(
        // '/api/encore/genAI/multipleChoiceExercise',
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
      setResponse(responseRef.current ?? null);

      if (responseRef.current) {
        //setRispostaTipo(responseRef.current);
        //handleTextToJSON(responseRef.current);
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
      assignmentType !== null &&
      // questionCategoryMultipleChoice !== null &&
      temperature !== null &&
      bloomLevelExercise !== null
    ) {
      setAreOptionsComplete(true);
    }
  };

  useEffect(() => {
    handleOptionsComplete();
  }, [
    targetLevel,
    assignmentType,
    //questionCategoryMultipleChoice,
    bloomLevelExercise,
    temperature,
  ]);

  return (
    <>
      {/* <Flex w={'100%'}>
        <Box w={'80%'}>
          <Flex paddingBottom="0.5rem">
            <Text as="b">Target level</Text>
          </Flex>
          <SegmentedButton
            isHighlighted={
              isGenerateButtonClicked && targetLevelMultipleChoice === null
            }
            options={targetLevelOptions}
            selected={targetLevelMultipleChoice}
            preselectedTitle={targetLevelMultipleChoice?.title}
            onChange={handleTargetLevelMultipleChoice}
            isSmallerScreen={isSmallerScreen || false}
            fontSize={'md'}
          />
        </Box>
      </Flex> */}
      {/* <Flex w={'100%'} paddingTop={'2rem'}>
        <Box w={'40%'}>
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
        </Box>
        <Box w={'42%'} paddingLeft={'2%'}>
          <Flex paddingBottom="0.5rem">
            <Text as="b">Creativity of AI</Text>
          </Flex>
          <SegmentedButton
            isHighlighted={
              isGenerateButtonClicked && temperatureMultipleChoice == null
            }
            options={temperatureOptions}
            selected={temperatureMultipleChoice}
            preselectedTitle={temperatureMultipleChoice?.title}
            onChange={handleTemperatureMultipleChoice}
            isSmallerScreen={isSmallerScreen || false}
            fontSize={'md'}
          />
        </Box>
      </Flex> */}
      {/* <Flex w={'100%'} paddingTop={'2rem'}>
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
        </Box> */}
      {/* <Box w={'90%'}>
          <Flex paddingBottom="0.5rem">
            <Text as="b">Question Category</Text>
          </Flex>
          <SegmentedButton
            isHighlighted={
              isGenerateButtonClicked && questionCategoryMultipleChoice == null
            }
            options={questionCategoryOptions}
            selected={questionCategoryMultipleChoice}
            preselectedTitle={questionCategoryMultipleChoice?.title}
            onChange={handleQuestionCategoryMultipleChoice}
            isSmallerScreen={isSmallerScreen || false}
            fontSize={'md'}
          />
        </Box>
      </Flex> */}
      <Flex w={'100%'}>
        <Box w={'30%'}>
          <Flex paddingBottom="0.5rem">
            <Text as="b">Number Of Correct Answers</Text>
          </Flex>
          <SliderInput
            min={1}
            max={chosenTypeOfAssignment === 0 ? 3 : 1} // 0 = theoretical assignment, 2 = practical assignment
            value={correctAnswerQuiz}
            onChange={handleCorrectAnswerQuiz}
          />
        </Box>
        <Box w={'30%'} marginLeft="2rem">
          <Flex paddingBottom="0.5rem">
            <Text as="b">Number Of Easy Distractors</Text>
          </Flex>
          <SliderInput
            min={0}
            max={distractorsMultipleChoice}
            value={easyDistractors}
            onChange={handleEasyDistractors}
          />
        </Box>
        <Box w={'30%'} marginLeft="2rem">
          <Flex paddingBottom="0.5rem">
            <Text as="b">Number Of Distractors</Text>
          </Flex>
          <SliderInput
            min={0}
            max={8}
            value={distractorsMultipleChoice}
            onChange={handleDistractorsMultipleChoice}
          />
        </Box>
      </Flex>
      <Flex paddingTop="3rem" w="40%">
        <Button
          size="lg"
          colorScheme="yellow"
          border="solid 1px"
          borderRadius="lg"
          //isDisabled={sourceText === ''}
          onClick={() => {
            handleOptionsComplete();
            //handleTypeOfExercisePanel(2);
            if (areOptionsComplete) {
              if (sourceText != '') {
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
