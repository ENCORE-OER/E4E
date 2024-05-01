import { Button, Flex, Text, Textarea, Tooltip } from '@chakra-ui/react';
import axios from 'axios';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { PiSmileySadLight } from 'react-icons/pi';
import { useGeneralContext } from '../../Contexts/GeneralContext';
import { Option, SkillItemProps } from '../../types/encoreElements';
import { EducationContextEnum } from '../../types/encoreElements/PathDesignElement/enums';
import { CustomToast } from '../../utils/Toast/CustomToast';
import {
  mapOptionToNumber,
  mapStringToString,
  useHasHydrated,
} from '../../utils/utils';
import BoxGeneratedLO from '../Boxes/BoxGeneratedLO';
import InputsGenerateAI from '../Inputs/InputsGenerateAI';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

type PathDesignGenLOProps = {
  // LANGUAGE_GEN_LO_API: string;
  // TEMPERATURE_GEN_LO_API: number;
  bloomLevelIndex: number;
  selectedBloomLevel: string;
  //learningObjectives,
  selectedContext: Option | null;
  selectedSkillConceptsTags: SkillItemProps[];
  selectedOptions: string[];
  // selectedGroupDimension: Option | null;
  // selectedLearnerExperience: Option | null;
  // selectedEducatorExperience: Option | null;
  learningTextContext: string;
  generatedLOs: string[];
  setGeneratedLOs: Dispatch<SetStateAction<string[]>>;
  handleSelectedLearningObjectiveIndexChange: (index: number) => void;
  setIsNextButtonClicked: Dispatch<SetStateAction<boolean>>;
  isHighligted: boolean;
};

enum BloomLevelString {
  Remember = 'Remembering',
  Understand = 'Understanding',
  Apply = 'Applying',
  Analyze = 'Analyzing',
  Evaluate = 'Evaluating',
  Create = 'Creating',
}

export default function PathDesignGenLO({
  // LANGUAGE_GEN_LO_API,
  // TEMPERATURE_GEN_LO_API,
  bloomLevelIndex,
  selectedBloomLevel,
  //learningObjectives,
  selectedContext,
  selectedSkillConceptsTags,
  selectedOptions,
  // selectedGroupDimension,
  // selectedLearnerExperience,
  // selectedEducatorExperience,
  learningTextContext,
  generatedLOs,
  setGeneratedLOs,
  handleSelectedLearningObjectiveIndexChange,
  setIsNextButtonClicked,
  isHighligted,
}: PathDesignGenLOProps) {
  const hydrated = useHasHydrated();
  const { addToast } = CustomToast();

  const { apiKey, setupModel, handleApiKey, handleSetupModel } =
    useGeneralContext();

  const [numberOfLO, setNumberOfLO] = useState<number>(0); // Number of learning objectives to generate
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state
  const [selectedLO, setSelectedLO] = useState<boolean[]>([]); // Array to keep track of the selected learning objective
  const [isNumberOfLOZero, setIsNumberOfLOZero] = useState<boolean>(false); // State to check if the number of learning objectives is invalid (zero)
  const [isApiKeyInvalid, setIsApiKeyInvalid] = useState<boolean>(false); // State to check if the API response is empty
  const [isLessGeneratedLO, setIsLessGeneratedLO] = useState<boolean>(false); // State to check if the number of generated learning objectives is equal to the desired number

  const handleNumberChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let newNumber = Number(e.target.value);
    console.log('newNumber', newNumber);

    // Limit the number of learning objectives to 5
    newNumber = Math.min(newNumber, 5);
    console.log('number modified', newNumber);
    setNumberOfLO(newNumber);
    if (newNumber > 0) {
      setIsNumberOfLOZero(false);
    }
  };

  const handleGenerateLO = async (e: any) => {
    e.preventDefault();
    // if (apiKey === undefined || apiKey === '') {
    //   addToast({
    //     message: 'Please enter your OpenAI API Key.',
    //     type: 'warning',
    //   });
    // } else
    setIsLessGeneratedLO(false);

    if (
      bloomLevelIndex === -1 ||
      selectedSkillConceptsTags.length === 0 ||
      selectedOptions.length === 0 ||
      learningTextContext === ''
    ) {
      addToast({
        message:
          'Please fill out all the required fields before generating learning objectives.',
        type: 'warning',
      });
      setIsNextButtonClicked(true);
      // return;
    } else {
      try {
        console.log('Previous learning objectives: ', generatedLOs);
        // Reset the selected learning objective index (to -1)
        if (numberOfLO > 0) {
          setIsLoading(true);
          setGeneratedLOs([]);
          setSelectedLO([]);
          handleSelectedLearningObjectiveIndexChange(-1);
          const learningObjectives: string[] = [];
          console.log('Generate learning objectives');
          console.log('Education context: ', selectedContext);
          console.log('Bloom level: ', selectedBloomLevel);
          console.log(
            'Skills: ',
            selectedSkillConceptsTags
              ?.map((skill: SkillItemProps) => skill.label)
              .join(', ')
          );
          console.log('Text: ', learningTextContext);

          // The API returns an array of 2 learning objectives for each bloom level,
          // so I have to call the API only half the number of learning objectives
          let i = 0;
          const MAX_API_CALL = 5; // Maximum number of API calls. This for limit the number of API calls to avoid infinite loop
          // Call the API until the number of learning objectives is reached.
          while (learningObjectives.length < numberOfLO && i < MAX_API_CALL) {
            //for (let i = 0; i < Math.round(numberOfLO / 2); i++) {
            console.log('LO number ' + i);

            const resp = await postGenerateLearningObjective(
              apiKey, // apiKey
              setupModel, // setupModel
              mapOptionToNumber(selectedContext, EducationContextEnum), // educationContext // TODO: before to call the API, check if the options are not null
              learningTextContext, // learningContext
              selectedSkillConceptsTags
                .map((skill: SkillItemProps) => skill.label)
                .join(', '), // skills
              mapStringToString(selectedBloomLevel, BloomLevelString) // bloomLevel // TODO: before to call the API, check if the options are not null
            );

            console.log('resp', resp);

            if (!resp) {
              console.log('No response');
              //learningObjectives.push('');
              setIsApiKeyInvalid(true);
              setIsLoading(false);
            } else {
              // const textLO = cutResponse(resp);
              // learningObjectives.push(textLO);

              // The API returns an array of 2 learning objectives
              for (const textLO of resp) {
                // Check if the learning objective is not already in the list
                // and if the number of learning objectives is not reached
                // Avoid duplicates
                if (
                  !learningObjectives.includes(textLO) &&
                  learningObjectives.length < numberOfLO
                ) {
                  learningObjectives.push(textLO);
                  //console.log('textLO', textLO);
                }
              }
              setIsApiKeyInvalid(false);
            }

            console.log('learningObjectives', learningObjectives);
            i++;
          }
          if (learningObjectives.length < numberOfLO) {
            setIsLessGeneratedLO(true);
          }
          setGeneratedLOs(learningObjectives || []);

          if (isApiKeyInvalid) {
            addToast({
              message: 'Invalid API Key. Please enter a valid OpenAI API Key.',
              type: 'error',
            });
          } else {
            addToast({
              message: 'Learning objectives generated!',
              type: 'info',
            });
          }
        } else {
          setIsNumberOfLOZero(true);
          console.log('Number of learning objectives is 0');
          addToast({
            message:
              'Please enter the number of learning objectives to generate.',
            type: 'warning',
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsNextButtonClicked(false);
      }
    }
  };

  const postGenerateLearningObjective = async (
    apiKey: string | undefined,
    setupModel: string | undefined,
    educationContext: number,
    learningContext: string,
    skills: string,
    bloomLevel: string
  ): Promise<string[] | undefined> => {
    try {
      //console.log('apiKey', apiKey);
      const resp = await axios.post(
        '/api/encore/genAI/generateLearningObjective',
        {
          topic: skills,
          context: learningContext,
          level: educationContext,
        },
        {
          headers: {
            ApiKey: apiKey,
            SetupModel: setupModel,
          },
        }
      );

      // console.log('Success - resp.data.error:', resp?.data?.error);
      console.log('Success - resp.data:', resp?.data);
      // console.log('Success - resp:', resp);

      return resp?.data[bloomLevel]; // The API returns an array of 2 learning objectives for each bloom level, so I have to select the one corresponding to the selected bloom level
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Function to update the learning objective when the user edits it
  const handleUpdateLO = (index: number, updatedText: string) => {
    console.log('Update learning objective');
    const updatedGeneratedLOs = [...generatedLOs];
    // console.log('GeneratedLOs', updatedGeneratedLOs);
    updatedGeneratedLOs[index] = updatedText; // Update the learning objective
    // console.log('updatedGeneratedLOs', updatedGeneratedLOs);
    setGeneratedLOs(updatedGeneratedLOs);
  };

  // Function to handle the click on the checkbox to select the learning objective
  const handleCheckBoxClick = (index: number) => {
    console.log('Checkbox clicked');
    try {
      const updatedSelectedLOs = new Array(generatedLOs.length).fill(false);
      updatedSelectedLOs[index] = true;
      console.log('updatedSelectedLOs', updatedSelectedLOs);
      setSelectedLO(updatedSelectedLOs);
      handleSelectedLearningObjectiveIndexChange(index);
    } catch (error) {
      console.log(error);
    }
  };

  // Update the loading state to false when the learning objectives are generated
  useEffect(() => {
    if (isLoading && generatedLOs.length > 0) {
      setIsLoading(false);
    }
  }, [generatedLOs]);

  return (
    <Flex pt="30px" direction="column">
      <InputsGenerateAI
        apiKey={apiKey}
        handleApiKey={handleApiKey}
        setupModel={setupModel}
        handleSetupModel={handleSetupModel}
      />
      <Flex flexDirection="row" align="center" py="5">
        <Text pr="5">Desired number of learning objective(s)</Text>
        <Flex pr="10%" align="center">
          <Tooltip
            label="You can generate maximum 5 learning objectives at a time."
            bg={'accent.900'}
            color="black"
            placement={'top'}
            borderRadius={'md'}
          >
            <Textarea
              display="flex"
              textAlign={'center'}
              justifyContent={'center'}
              variant="solid"
              resize="none"
              //size="sm"
              w="70px"
              //h='50px'
              border={isNumberOfLOZero ? '2.5px solid #bf5521ff' : '1px solid'}
              borderRadius="lg"
              rows={1}
              flexWrap="nowrap"
              overflowWrap={'break-word'}
              typeof="number"
              errorBorderColor={
                numberOfLO === 0 ? '2.5px solid #bf5521ff' : 'none'
              }
              value={numberOfLO}
              onChange={handleNumberChange}
            />
          </Tooltip>
        </Flex>
        <Button variant="primary" onClick={handleGenerateLO}>
          Generate
        </Button>
      </Flex>

      {isLoading && (
        <LoadingSpinner textLoading="Generating Learning Objectives..." />
      )}

      <Flex
        p="15px"
        direction="column"
        border={
          isHighligted && generatedLOs.length > 0 && selectedLO.length === 0
            ? '1.5px solid #bf5521ff'
            : 'null'
        }
        borderRadius={'lg'}
      >
        {isLessGeneratedLO && (
          <Flex direction={'row'} align={'center'} pb={5}>
            <PiSmileySadLight />
            <Text
              pl={2}
              fontSize={'md'}
              fontWeight={'bold'}
              textColor={'orange.300'}
            >
              {' '}
              {`Sorry, but we were unable to generate N different required learning objectives.`}{' '}
            </Text>
          </Flex>
        )}
        {
          //numberOfLO > 0 &&
          generatedLOs.length > 0 &&
            hydrated &&
            generatedLOs.map((lo: string, index: number) => (
              <BoxGeneratedLO
                key={index}
                textLearningObjective={lo}
                index={index}
                selectedLO={selectedLO}
                handleCheckBoxClick={handleCheckBoxClick}
                handleUpdateLO={handleUpdateLO}
              />
            ))
        }
      </Flex>
    </Flex>
  );
}
