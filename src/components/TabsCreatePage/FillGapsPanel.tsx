import { Box, Button, CircularProgress, Flex, Text } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useCreateOERsContext } from '../../Contexts/CreateOERsContext';
import { CustomToast } from '../../utils/Toast/CustomToast';
import SegmentedButton from '../Buttons/ButtonsDesignPage/SegmentedButton';
import SliderInput from '../NumberInput/SliderNumberInput';
// import { useLocalStorage } from 'usehooks-ts';

type FillGapsPanelProps = {
  isSmallerScreen?: boolean;
};

export default function FillGapsPanel({ isSmallerScreen }: FillGapsPanelProps) {
  const {
    isGenerateButtonClicked,
    handleIsGenerateButtonClicked,

    targetLevelOptions,
    temperatureOptions,
    lengthOptions,

    temperatureFillGaps,
    handleTemperatureFillGaps,

    targetLevelFillGaps,
    handleTargetLevelFillGaps,

    length,
    handleLength,

    distractorsFillGaps,
    handleDistractorsFillGaps,

    blanks,
    handleBlanks,

    sourceText,
    maxValue,

    chosenTargetLevel,
    chosenLenght,
    temperature,

    handleExercise,

    apiFillGapsData: apiData,
    handleTextToJSONFillGaps: handleTextToJSON,
  } = useCreateOERsContext();
  const [areOptionsComplete, setAreOptionsComplete] = useState(false);
  const { addToast } = CustomToast();
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const responseRef = useRef(null);

  // const [rispostaTipo, setRispostaTipo] = useLocalStorage<string | null>('rispostaTipo', '');

  //console.log(FillGapsPrototipo);

  const handleOptionsComplete = () => {
    if (targetLevelFillGaps != null && length != null) {
      setAreOptionsComplete(true);
    }
  };

  const handleGenerateButtonClick = async () => {
    setLoading(true);
    console.log('sourceText:', sourceText);
    // Costruisci l'oggetto di dati da inviare nella richiesta
    const requestData = {
      language: 'English',
      text: sourceText,
      level: chosenTargetLevel,
      n_o_w: chosenLenght,
      n_o_g: blanks,
      n_o_d: distractorsFillGaps,
      temperature: temperature,
    };

    try {
      // Esegui la chiamata API
      const apiResponse = await axios.post(
        '/api/encore/fillGapsExercise',
        requestData
      );

      responseRef.current = apiResponse.data;
      // Gestisci la risposta
      setResponse(apiResponse.data);
    } catch (error) {
      console.error('Errore durante la chiamata API:', error);
      // Gestisci l'errore, mostra un messaggio o fai qualcos'altro
    } finally {
      setLoading(false);
      setResponse(responseRef.current);

      if (responseRef.current) {
        // setRispostaTipo(responseRef.current);
        handleTextToJSON(responseRef.current);
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
  }, [targetLevelFillGaps, length]);

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
        <Box w={'40%'}>
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
        <Box w={'42%'} paddingLeft="2%">
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
              {console.log(apiData)}
              <Text>Risposta API:</Text>
              <Text>
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
              </Text>
            </div>
          )
        )}
      </Box>
      {/* <div>
        {console.log(apiData)}
        <Text>Risposta API:</Text>
        <Text>
          ============================================== <br />
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
        </Text>
      </div>
      <Button
        onClick={() => {
          console.log('response:', response);
          if (response) setRispostaTipo(response);
          if (rispostaTipo) handleTextToJSON(rispostaTipo);
          console.log('apiData:', apiData);
          console.log('rispostaTipo:', rispostaTipo);
        }
        }>
        setRispostaTipo
      </Button>  */}
    </>
  );
}
