import { Box, Button, CircularProgress, Flex, Text } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
// import { useLocalStorage } from 'usehooks-ts';
import { useCreateOERsContext } from '../../Contexts/CreateOERsCotext';
import { CustomToast } from '../../utils/Toast/CustomToast';
import SegmentedButton from '../Buttons/ButtonsDesignPage/SegmentedButton';
//import TextBox from '../TextBox/TextBox';

type OpenQuestionPanelProps = {
  isSmallerScreen?: boolean;
};

export default function OpenQuestionPanel({
  isSmallerScreen,
}: OpenQuestionPanelProps) {
  const {
    isGenerateButtonClicked,
    handleIsGenerateButtonClicked,

    targetLevelOptions,
    temperatureOptions,
    questionCategoryOptions,
    temperatureOpenQuestion,

    handleTemperatureOpenQuestion,
    questionTypeOptions,

    targetLevelOpenQuestion,
    handleTargetLevelOpenQuestion,

    questionType,
    handleQuestionType,

    questionCategoryOpenQuestion,
    handleQuestionCategoryOpenQuestion,

    temperature,
    sourceText,
    chosenTargetLevel,
    chosenCategory,
    chosenType,
    handleExercise,
    apiOpenQuestionData: apiData,
    handleTextToJSONOpenQuestion: handleTextToJSON,
  } = useCreateOERsContext();

  const [areOptionsComplete, setAreOptionsComplete] = useState(false);
  const { addToast } = CustomToast();
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const responseRef = useRef(null);

  // const [rispostaTipo, setRispostaTipo] = useLocalStorage<string | null>('rispostaTipo', '');

  const handleGenerateButtonClick = async () => {
    setLoading(true);
    console.log('sourceText:', sourceText);
    console.log('temperature:', temperature);
    console.log('chosenTargetLevel:', chosenTargetLevel);
    console.log('chosenType:', chosenType);
    console.log('chosenCategory:', chosenCategory);

    // Costruisci l'oggetto di dati da inviare nella richiesta
    const requestData = {
      language: 'English',
      text: sourceText,
      level: chosenTargetLevel,
      type: chosenType,
      category: chosenCategory,
      temperature: temperature,
    };

    try {
      // Esegui la chiamata API
      const apiResponse = await axios.post(
        '/api/encore/openQuestionExercise',
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

  const handleOptionsComplete = () => {
    if (
      targetLevelOpenQuestion != null &&
      questionType != null &&
      questionCategoryOpenQuestion != null
    ) {
      setAreOptionsComplete(true);
    }
  };

  useEffect(() => {
    handleOptionsComplete();
  }, [targetLevelOpenQuestion, questionType, questionCategoryOpenQuestion]);

  return (
    <>
      <Flex w={'100%'}>
        <Box w={'70%'}>
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
      </Flex>
      <Flex w={'100%'} paddingTop={'2rem'}>
        <Box w={'40%'}>
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
        <Box w={'42%'} paddingLeft={'2%'}>
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
      </Flex>
      <Flex w={'100%'} paddingTop={'2rem'}>
        <Box w={'90%'}>
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
      </Flex>
      <Flex paddingTop="3rem" w="40%">
        <Button
          size="lg"
          colorScheme="yellow"
          border="solid 1px"
          borderRadius="lg"
          //isDisabled={sourceText === ''}
          onClick={() => {
            // console.log('sourceText:', sourceText);
            // console.log('chosenTargetLevel:', chosenTargetLevel);
            // console.log('chosenType:', chosenType);
            // console.log('chosenCategory:', chosenCategory);
            // console.log('temperature:', temperature);
            handleExercise(1);
            handleOptionsComplete();
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
                {apiData.type_of_question} <br />
                {apiData.category} <br />
                {apiData.temperature} <br />
                {apiData.question} <br />
                {apiData.correctAnswer} <br />
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
          {apiData.type_of_question} <br />
          {apiData.category} <br />
          {apiData.temperature} <br />
          {apiData.question} <br />
          {apiData.correctAnswer} <br />
          <br />
          risposta: <br />
          {rispostaTipo}
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
