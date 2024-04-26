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

type FillGapsPanelProps = {
  isSmallerScreen?: boolean;
  analyzeMaterial: (material: string) => Promise<AnalyzedMaterialProps>;
};

export default function FillGapsPanel({
  isSmallerScreen,
  analyzeMaterial,
}: FillGapsPanelProps) {
  const {
    //isGenerateButtonClicked,
    handleIsGenerateButtonClicked,

    // bloomLevelOptions,
    // targetLevelOptions,
    // temperatureOptions,
    // lengthOptions,

    handleTitle,
    handleDescription,

    bloomLevelExercise,
    // handleBloomLevelExercise,

    temperature,
    // handleTemperatureFillGaps,

    targetLevel,
    // handleTargetLevelFillGaps,

    // length,
    // handleLength,

    distractorsFillGaps,
    handleDistractorsFillGaps,

    easyDistractorsFillGaps,
    handleEasyDistractorsFillGaps,

    blanks,
    handleBlanks,

    sourceText, // material
    maxValue,

    chosenTargetLevel,
    // chosenLenght,
    ChosenTemperature,

    // handleTypeOfExercisePanel,
    chosenTypeOfExercise,

    // apiGeneratedExerciseData: apiData, // is used in the GenerateExerciseResponseView component
    //handleTextToJSONFillGaps: handleTextToJSON,
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
    // Costruisci l'oggetto di dati da inviare nella richiesta
    // const requestData = {
    //   language: 'English',
    //   text: sourceText,
    //   level: chosenTargetLevel,
    //   n_o_w: chosenLenght,
    //   n_o_g: blanks,
    //   n_o_d: distractorsFillGaps,
    //   temperature: temperature,
    // };

    // analyze the material (url or text) to take the macroSubject, title, topic, assignmentType
    const analyzedMaterial = await analyzeMaterial(sourceText);
    handleTitle(analyzedMaterial.Title);
    handleDescription(analyzedMaterial.MainTopics[0].Description);

    const requestData = {
      macroSubject: analyzedMaterial.MacroSubject, // from materialAnalyzer API
      title: analyzedMaterial.Title, // from materialAnalyzer API
      level: chosenTargetLevel,
      // typeOfExercise: mapOptionToNumber(
      //   { title: 'fill_in_the_blanks' },
      //   TypeOfExerciseEnum
      // ), // fill_in_the_blanks exercise
      typeOfExercise: chosenTypeOfExercise,
      learningObjective: `Teaching the students ${analyzedMaterial.MainTopics[0].Topic}. In particular ${analyzedMaterial.MainTopics[0].Description}`, // TODO: add a component in frontend to set the learning objective???
      bloomLevel: mapOptionToNumber(bloomLevelExercise, BloomLevelsEnum),
      // language: language, // English by default
      material: sourceText,
      correctAnswersNumber: blanks,
      distractorsNumber: distractorsFillGaps,
      easilyDiscardableDistractorsNumber: easyDistractorsFillGaps,
      assignmentType: analyzedMaterial.MainTopics[0].Type, // 0 is for theoretical assignment
      topic: analyzedMaterial.MainTopics[0].Topic, // from materialAnalyzer API
      temperature: ChosenTemperature,
    };

    try {
      // Esegui la chiamata API
      const apiResponse = await axios.post(
        //'/api/encore/genAI/fillGapsExercise',
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
        // setRispostaTipo(responseRef.current);
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
      bloomLevelExercise !== null &&
      //length !== null &&
      temperature !== null
    ) {
      setAreOptionsComplete(true);
    }
  };

  useEffect(() => {
    handleOptionsComplete();
  }, [
    targetLevel,
    ChosenTemperature,
    bloomLevelExercise,
    // length
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
              isGenerateButtonClicked && targetLevelFillGaps === null
            }
            options={targetLevelOptions}
            selected={targetLevelFillGaps}
            preselectedTitle={targetLevelFillGaps?.title}
            onChange={handleTargetLevelFillGaps}
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
        </Box>
      </Flex> */}
      {/*<Flex w={'100%'} paddingTop={'2rem'}>
        {/* <Box w={'40%'}>
          <Flex paddingBottom="0.5rem">
            <Text as="b">Lenght</Text>
          </Flex>
          <SegmentedButton
            isHighlighted={isGenerateButtonClicked && length == null}
            options={lengthOptions}
            selected={length}
            preselectedTitle={length?.title}
            onChange={handleLength}
            isSmallerScreen={isSmallerScreen || false}
            fontSize={'md'}
          />
        </Box> 
        <Box w={'80%'}>
          <Flex paddingBottom="0.5rem">
            <Text as="b">Creativity of AI</Text>
          </Flex>
          <SegmentedButton
            isHighlighted={
              isGenerateButtonClicked && temperatureFillGaps == null
            }
            options={temperatureOptions}
            selected={temperatureFillGaps}
            preselectedTitle={temperatureFillGaps?.title}
            onChange={handleTemperatureFillGaps}
            isSmallerScreen={isSmallerScreen || false}
            fontSize={'md'}
          />
        </Box>
      </Flex>*/}
      <Flex w={'100%'} >
        <Box w={'30%'}>
          <Flex paddingBottom="0.5rem">
            <Text as="b">Number Of Blanks</Text>
          </Flex>
          <SliderInput
            value={blanks}
            onChange={handleBlanks}
            min={1}
            max={maxValue}
          />
        </Box>
        <Box w={'30%'} marginLeft="2rem">
          <Flex paddingBottom="0.5rem">
            <Text as="b">Number Of Easy Distractors</Text>
          </Flex>
          <SliderInput
            value={easyDistractorsFillGaps}
            onChange={handleEasyDistractorsFillGaps}
            min={0}
            max={blanks}
          />
        </Box>
        <Box w={'30%'} marginLeft="2rem">
          <Flex paddingBottom="0.5rem">
            <Text as="b">Number Of Distractors</Text>
          </Flex>
          <SliderInput
            value={distractorsFillGaps}
            onChange={handleDistractorsFillGaps}
            min={0}
            max={blanks}
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

            //handleTypeOfExercisePanel(1);
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
