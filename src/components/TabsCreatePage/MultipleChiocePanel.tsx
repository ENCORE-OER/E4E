import { Box, Button, CircularProgress, Flex, Text } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useCreateOERsContext } from '../../Contexts/CreateOERsContext';
import { CustomToast } from '../../utils/Toast/CustomToast';
import SegmentedButton from '../Buttons/ButtonsDesignPage/SegmentedButton';
import SliderInput from '../NumberInput/SliderNumberInput';
//import { useLocalStorage } from 'usehooks-ts';
//import { useHasHydrated } from '../../utils/utils';

type MultipleChoicePanelProps = {
  isSmallerScreen?: boolean;
};

//todo: mettere un valore massimo anche per questi distractors

export default function MultipleChoicePanel({
  isSmallerScreen,
}: MultipleChoicePanelProps) {
  const {
    isGenerateButtonClicked,
    handleIsGenerateButtonClicked,

    targetLevelOptions,
    temperatureOptions,
    questionCategoryOptions,
    exerciseTypeOptions,

    temperatureMultipleChoice,
    handleTemperatureMultipleChoice,

    targetLevelMultipleChoice,
    handleTargetLevelMultipleChoice,

    exerciseType,
    handleExerciseType,

    questionCategoryMultipleChoice,
    handleQuestionCategoryMultipleChoice,

    correctAnswer,
    handleCorrectAnswer,

    easyDistractors,
    handleEasyDistractors,

    distractorsMultipleChoice,
    handleDistractorsMultipleChoice,

    temperature,
    sourceText,
    chosenTargetLevel,
    chosenType,
    chosenCategory,
    handleExercise,

    apiMultipleChiocesData: apiData,
    handleTextToJSONMultipleChoice: handleTextToJSON,
  } = useCreateOERsContext();

  const [areOptionsComplete, setAreOptionsComplete] = useState(false);
  const { addToast } = CustomToast();
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const responseRef = useRef(null);
  //const hydrated = useHasHydrated();

  //const [rispostaTipo, setRispostaTipo] = useLocalStorage<string | null>('rispostaTipo', '');

  const handleGenerateButtonClick = async () => {
    setLoading(true);
    console.log('sourceText:', sourceText);
    // Costruisci l'oggetto di dati da inviare nella richiesta
    const requestData = {
      language: 'English',
      type: chosenType,
      text: sourceText,
      level: chosenTargetLevel,
      category: chosenCategory,
      temperature: temperature,
      n_o_ca: correctAnswer,
      nedd: easyDistractors,
      n_o_d: distractorsMultipleChoice,
    };

    try {
      // Esegui la chiamata API
      const apiResponse = await axios.post(
        '/api/encore/multipleChoiceExercise',
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
        //setRispostaTipo(responseRef.current);
        handleTextToJSON(responseRef.current);
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
      targetLevelMultipleChoice != null &&
      exerciseType != null &&
      questionCategoryMultipleChoice != null
    ) {
      setAreOptionsComplete(true);
    }
  };

  useEffect(() => {
    handleOptionsComplete();
  }, [targetLevelMultipleChoice, exerciseType, questionCategoryMultipleChoice]);

  return (
    <>
      <Flex w={'100%'}>
        <Box w={'70%'}>
          <Flex paddingBottom="0.5rem">
            <Text as="b">Target level</Text>
          </Flex>
          <SegmentedButton
            isHighlighted={
              isGenerateButtonClicked && targetLevelMultipleChoice == null
            }
            options={targetLevelOptions}
            selected={targetLevelMultipleChoice}
            preselectedTitle={targetLevelMultipleChoice?.title}
            onChange={handleTargetLevelMultipleChoice}
            isSmallerScreen={isSmallerScreen || false}
            fontSize={'md'}
          />
        </Box>
      </Flex>
      <Flex w={'100%'} paddingTop={'2rem'}>
        <Box w={'40%'}>
          <Flex paddingBottom="0.5rem">
            <Text as="b">Exercise Type</Text>
          </Flex>
          <SegmentedButton
            isHighlighted={isGenerateButtonClicked && exerciseType == null}
            options={exerciseTypeOptions}
            selected={exerciseType}
            preselectedTitle={exerciseType?.title}
            onChange={handleExerciseType}
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
      </Flex>
      <Flex w={'100%'} paddingTop={'2rem'}>
        <Box w={'90%'}>
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
      </Flex>
      <Flex w={'100%'} paddingTop={'2rem'}>
        <Box w={'30%'}>
          <Flex paddingBottom="0.5rem">
            <Text as="b">Number Of Correct Answers</Text>
          </Flex>
          <SliderInput
            min={1}
            max={chosenType ? 1 : 3}
            value={correctAnswer}
            onChange={handleCorrectAnswer}
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
            // console.log(sourceText);
            // console.log(chosenTargetLevel);
            // console.log(temperature);
            // console.log(chosenType);
            // console.log(chosenCategory);
            // console.log(correctAnswer);
            // console.log(easyDistractors);
            // console.log(distractorsMultipleChoice);
            handleOptionsComplete();
            handleExercise(2);
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
                {apiData.level} <br />
                {apiData.temperature} <br />
                {apiData.nedd} <br />
                {apiData.n_o_d} <br />
                {apiData.category} <br />
                {apiData.question} <br />
                {apiData.correctAnswer} <br />
                {/* {apiData.answers} <br /> */}
                {apiData.solution} <br />
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
          {apiData.level} <br />
          {apiData.temperature} <br />
          {apiData.nedd} <br />
          {apiData.n_o_d} <br />
          {apiData.category} <br />
          {apiData.question} <br />
          {apiData.correctAnswer} <br />

          {apiData.solution} <br />
          <br />
          risposta: <br />
          {hydrated && rispostaTipo}
        </Text>
      </div>
      <Button
        onClick={() => {
          console.log('response:', response);
          if (response) setRispostaTipo(response);
          if (rispostaTipo) handleTextToJSON(rispostaTipo);
          console.log('rispostaTipo:', rispostaTipo);
        }
        }>
        setRispostaTipo
      </Button> */}
    </>
  );
}
