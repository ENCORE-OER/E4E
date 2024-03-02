import { Button, Flex, Text, Textarea, Tooltip } from '@chakra-ui/react';
import axios from 'axios';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { Option, SkillItemProps } from '../../types/encoreElements';
import {
  EducationContextEnum,
  YourExperienceEnum as EducatorExperienceEnum,
  GroupDimensionEnum,
  LearnerExperienceEnum,
} from '../../types/encoreElements/PathDesignElement/enums';
import { CustomToast } from '../../utils/Toast/CustomToast';
import { useHasHydrated } from '../../utils/utils';
import BoxGeneratedLO from '../Boxes/BoxGeneratedLO';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

type PathDesignGenLOProps = {
  LANGUAGE_GEN_LO_API: string;
  TEMPERATURE_GEN_LO_API: number;
  bloomLevelIndex: number;
  //learningObjectives,
  selectedContext: Option | null;
  selectedSkillConceptsTags: SkillItemProps[];
  selectedOptions: string[];
  selectedGroupDimension: Option | null;
  selectedLearnerExperience: Option | null;
  selectedEducatorExperience: Option | null;
  learningTextContext: string;
  generatedLOs: string[];
  setGeneratedLOs: Dispatch<SetStateAction<string[]>>;
  handleSelectedLearningObjectiveIndexChange: (index: number) => void;
  setIsNextButtonClicked: Dispatch<SetStateAction<boolean>>;
  isHighligted: boolean;
};

export default function PathDesignGenLO({
  LANGUAGE_GEN_LO_API,
  TEMPERATURE_GEN_LO_API,
  bloomLevelIndex,
  //learningObjectives,
  selectedContext,
  selectedSkillConceptsTags,
  selectedOptions,
  selectedGroupDimension,
  selectedLearnerExperience,
  selectedEducatorExperience,
  learningTextContext,
  generatedLOs,
  setGeneratedLOs,
  handleSelectedLearningObjectiveIndexChange,
  setIsNextButtonClicked,
  isHighligted,
}: PathDesignGenLOProps) {
  const hydrated = useHasHydrated();
  const { addToast } = CustomToast();
  const [numberOfLO, setNumberOfLO] = useState<number>(0); // Number of learning objectives to generate
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state
  const [selectedLO, setSelectedLO] = useState<boolean[]>([]); // Array to keep track of the selected learning objective
  const [isInvalid, setIsInvalid] = useState<boolean>(false); // State to check if the number of learning objectives is invalid (zero)

  const handleNumberChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let newNumber = Number(e.target.value);
    console.log('newNumber', newNumber);

    // Limit the number of learning objectives to 5
    newNumber = Math.min(newNumber, 5);
    console.log('number modified', newNumber);
    setNumberOfLO(newNumber);
    if (newNumber > 0) {
      setIsInvalid(false);
    }
  };

  // Function to map the selected option to the corresponding index to give to the API
  const mapOptionToNumber = (
    option: Option | null,
    enumObject: any
  ): number => {
    if (!option) return -1; // TODO: before to call the API, check if the options are not null
    return enumObject[option.title];
  };

  const handleGenerateLO = async (e: any) => {
    e.preventDefault();
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
          const learningObjectives: any[] = [];
          console.log('Generate learning objectives');
          console.log('Educator experience: ', selectedEducatorExperience);
          console.log('Learner experience: ', selectedLearnerExperience);
          console.log('Group dimension: ', selectedGroupDimension);
          console.log('Education context: ', selectedContext);
          console.log('Bloom level: ', bloomLevelIndex);
          console.log('Verbs: ', selectedOptions);
          console.log(
            'Skills: ',
            selectedSkillConceptsTags
              ?.map((skill: SkillItemProps) => skill.label)
              .join(', ')
          );
          console.log('Text: ', learningTextContext);

          for (let i = 0; i < numberOfLO; i++) {
            console.log('LO number ' + i);

            const resp = await postGenerateLearningObjective(
              LANGUAGE_GEN_LO_API, // language
              mapOptionToNumber(
                selectedEducatorExperience,
                EducatorExperienceEnum
              ), // educatorExperience
              mapOptionToNumber(
                selectedLearnerExperience,
                LearnerExperienceEnum
              ), // learnerExperience
              mapOptionToNumber(selectedGroupDimension, GroupDimensionEnum), // dimension
              mapOptionToNumber(selectedContext, EducationContextEnum), // educationContext
              learningTextContext, // learningContext
              selectedSkillConceptsTags
                .map((skill: SkillItemProps) => skill.label)
                .join(', '), // skills
              bloomLevelIndex, // bloomLevel
              selectedOptions, // verbs
              TEMPERATURE_GEN_LO_API // temperature
            );

            console.log('resp', resp);

            if (!resp) {
              console.log('No response');
              learningObjectives.push('');
            } else {
              const textLO = cutResponse(resp);
              learningObjectives.push(textLO);
            }

            console.log('learningObjectives', learningObjectives);
          }
          setGeneratedLOs(learningObjectives || []);
          addToast({
            message: 'Learning objectives generated!',
            type: 'info',
          });
        } else {
          setIsInvalid(true);
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
    language: string,
    educatorExperience: number,
    learnerExperience: number,
    dimension: number,
    educationContext: number,
    learningContext: string,
    skills: string,
    bloomLevel: number,
    verbs: string[],
    temperature: number
  ): Promise<string | undefined> => {
    try {
      const resp = await axios.post('/api/encore/generateLearningObjective', {
        language: language,
        educatorExperience: educatorExperience,
        learnerExperience: learnerExperience,
        dimension: dimension,
        educationContext: educationContext,
        learningContext: learningContext,
        skills: skills,
        bloomLevel: bloomLevel,
        verbs: verbs,
        temperature: temperature,
      });

      console.log('Success:', resp?.data);
      return resp?.data;
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // function to cut the response of the API to get only the significant learning objective text
  const cutResponse = (resp: string) => {
    // TODO: modify the API response to get receive only the text of the learning objective
    // AT THE MOMENT: the response is a string with the config and the learning objective,
    // so i have to cut the string to get only the learning objective

    // Find the index of the start of the learning objective in the string
    const startIndex =
      resp.indexOf(`Temperature: ${TEMPERATURE_GEN_LO_API}`) +
      `Temperature: ${TEMPERATURE_GEN_LO_API}`.length +
      1;

    // Extract only the learning objective
    const textLO = resp?.substring(startIndex);

    // const endIndex = textLO.indexOf('\n\n');

    // // Extract main text until the first double newline
    // textLO = textLO.substring(0, endIndex).trim();

    console.log(textLO);

    return textLO;
  };

  const handleUpdateLO = (index: number, updatedText: string) => {
    console.log('Update learning objective');
    const updatedGeneratedLOs = [...generatedLOs];
    console.log('GeneratedLOs', updatedGeneratedLOs);
    updatedGeneratedLOs[index] = updatedText; // Update the learning objective
    console.log('updatedGeneratedLOs', updatedGeneratedLOs);
    setGeneratedLOs(updatedGeneratedLOs);
  };

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
    if (isLoading && generatedLOs.length > 0) setIsLoading(false);
  }, [generatedLOs]);

  return (
    <>
      <Flex flexDirection="row" align="center" pt="50px" pb="5">
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
              border={isInvalid ? '1.5px solid #bf5521ff' : '1px solid'}
              borderRadius="lg"
              rows={1}
              flexWrap="nowrap"
              overflowWrap={'break-word'}
              typeof="number"
              errorBorderColor={
                numberOfLO === 0 ? '1.5px solid #bf5521ff' : 'none'
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
        {generatedLOs.length > 0 &&
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
          ))}
      </Flex>
    </>
  );
}
