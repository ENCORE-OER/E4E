import { Box, Button, CircularProgress, Flex, Text } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useCreateOERsContext } from '../../Contexts/CreateOERsContext';
import { useGeneralContext } from '../../Contexts/GeneralContext';
import { GeneratedExerciseProps } from '../../types/encoreElements';
import { CustomToast } from '../../utils/Toast/CustomToast';
import { mapOptionToNumber } from '../../utils/utils';
import SegmentedButton from '../Buttons/ButtonsDesignPage/SegmentedButton';
import SliderInput from '../NumberInput/SliderNumberInput';

type FillGapsPanelProps = {
  isSmallerScreen?: boolean;
};

export default function FillGapsPanel({ isSmallerScreen }: FillGapsPanelProps) {
  const {
    isGenerateButtonClicked,
    handleIsGenerateButtonClicked,

    bloomLevelOptions,
    targetLevelOptions,
    temperatureOptions,
    // lengthOptions,

    bloomLevelExercise,
    handleBloomLevelExercise,

    temperatureFillGaps,
    handleTemperatureFillGaps,

    targetLevelFillGaps,
    handleTargetLevelFillGaps,

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
    temperature,

    handleExercise,

    apiFillGapsData: apiData,
    //handleTextToJSONFillGaps: handleTextToJSON,
    handleFillGapsData
  } = useCreateOERsContext();
  const { apiKey } = useGeneralContext();
  const [areOptionsComplete, setAreOptionsComplete] = useState(false);
  const { addToast } = CustomToast();
  const [response, setResponse] = useState<GeneratedExerciseProps | null>(null);
  const [loading, setLoading] = useState(false);
  const responseRef = useRef<GeneratedExerciseProps | null>(null);

  const handleOptionsComplete = () => {
    if (
      targetLevelFillGaps != null &&
      bloomLevelExercise != null &&
      //length != null &&
      temperatureFillGaps != null
    ) {
      setAreOptionsComplete(true);
    }
  };

  // Use this function to analyze the material and get the macroSubject, title, topic, assignmentType
  const analyzeMaterial = async (material: string) => {
    console.log("Analyzing material: ");

    try {
      const resp = await axios.post('api/encore/genAI/materialAnalyzer',
        {
          material: material
        },
        {
          headers: {
            ApiKey: apiKey,
          },
        }
      );

      return resp.data;
    } catch (error) {
      console.error('Error during the API call:', error);
    }
  }


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

    const requestData = {
      macroSubject: analyzedMaterial.MacroSubject, // from materialAnalyzer API
      title: analyzedMaterial.Title, // from materialAnalyzer API
      level: chosenTargetLevel,
      typeOfExercise: 3,  // fill_in_the_blanks exercise
      learningObjective: `Teaching the students ${analyzedMaterial.MainTopics[0].Topic}. In particular ${analyzedMaterial.MainTopics[0].Description}`,  // TODO: add a component in frontend to set the learning objective???
      bloomLevel: mapOptionToNumber(bloomLevelExercise, bloomLevelOptions),
      // language: language, // English by default
      material: sourceText,
      correctAnswersNumber: blanks,
      distractorsNumber: distractorsFillGaps,
      easilyDiscardableDistractorsNumber: easyDistractorsFillGaps,
      assignmentType: analyzedMaterial.MainTopics[0].Type,  // 0 is for theoretical assignment
      topic: analyzedMaterial.MainTopics[0].Topic,  // from materialAnalyzer API
      temperature: temperature,
    }

    try {
      // Esegui la chiamata API
      const apiResponse = await axios.post(
        //'/api/encore/genAI/fillGapsExercise',
        '/api/encore/genAI/generateExercise',
        requestData,
        {
          headers: {
            ApiKey: apiKey,
          },
        }
      );

      responseRef.current = apiResponse?.data;
      // Gestisci la risposta
      setResponse(apiResponse?.data);
    } catch (error) {
      console.error('Errore durante la chiamata API:', error);
      // Gestisci l'errore, mostra un messaggio o fai qualcos'altro
    } finally {
      setLoading(false);
      setResponse(responseRef.current);

      if (responseRef.current) {
        // setRispostaTipo(responseRef.current);
        //handleTextToJSON(responseRef.current);
        handleFillGapsData(
          responseRef.current.Assignment,
          responseRef.current.Plus,
          responseRef.current.Solutions,
          responseRef.current.Distractors,
          responseRef.current.EasilyDiscardableDistractors);
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
    targetLevelFillGaps,
    // length
  ]);

  return (
    <>
      <Flex w={'100%'}>
        <Box w={'70%'}>
          <Flex paddingBottom="0.5rem">
            <Text as="b">Target level</Text>
          </Flex>
          <SegmentedButton
            isHighlighted={
              isGenerateButtonClicked && targetLevelFillGaps == null
            }
            options={targetLevelOptions}
            selected={targetLevelFillGaps}
            preselectedTitle={targetLevelFillGaps?.title}
            onChange={handleTargetLevelFillGaps}
            isSmallerScreen={isSmallerScreen || false}
            fontSize={'md'}
          />
        </Box>
      </Flex>
      <Flex w={'100%'} paddingTop={'2rem'}>
        <Box w={'70%'}>
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
      </Flex>
      <Flex w={'100%'} paddingTop={'2rem'}>
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
        </Box> */}
        <Box w={'70%'}>
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
      </Flex>
      <Flex w={'100%'} paddingTop={'2rem'}>
        <Box w={'40%'}>
          <Flex margin="0.4rem">
            <Text as="b">Number Of Blanks</Text>
          </Flex>
          <SliderInput
            value={blanks}
            onChange={handleBlanks}
            min={1}
            max={maxValue}
          />
        </Box>
        <Box w={'42%'} paddingLeft="2rem">
          <Flex margin="0.4rem">
            <Text as="b">Number Of Easy Distractors</Text>
          </Flex>
          <SliderInput
            value={easyDistractorsFillGaps}
            onChange={handleEasyDistractorsFillGaps}
            min={0}
            max={blanks}
          />
        </Box>
        <Box w={'42%'} paddingLeft="2rem">
          <Flex margin="0.4rem">
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

            handleExercise(0);
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
          response && (
            <div>
              <Text fontSize={"lg"} fontWeight={"bold"}>Risposta API:</Text>
              {/* <Text>
                {apiData.language} <br />
                {apiData.date} <br />
                {apiData.temperature} <br />
                {apiData.level} <br />
                {apiData.text} <br />
                {apiData.textWithGaps} <br />
                {apiData.wordsAndAnswers} <br />
                <br />
                risposta: <br />
                {response}
              </Text> */}
              <Text>
                Assignment: <br />
                {apiData.Assignment} <br />
                Plus: <br />
                {apiData.Plus} <br />
                Solutions: <br />
                {apiData.Solutions} <br />
                Distractors: <br />
                {apiData.Distractors} <br />
                Easily Discardable Distractors: <br />
                {apiData.EasilyDiscardableDistractors} <br />
                <br />
                risposta: <br />
                {JSON.stringify(response)}
              </Text>
            </div>
          )
        )}
      </Box>
    </>
  );
}
