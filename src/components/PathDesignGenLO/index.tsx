import { Flex, Text } from '@chakra-ui/react';
import {
  Dispatch,
  SetStateAction,
  useState
} from 'react';
import { PiSmileySadLight } from 'react-icons/pi';
import { useGeneralContext } from '../../Contexts/GeneralContext';
import { Option, SkillItemProps } from '../../types/encoreElements';
import {
  useHasHydrated
} from '../../utils/utils';
import BoxGeneratedLO from '../Boxes/BoxGeneratedLO';
import ShowHideButton from '../Buttons/ShowHideButton';
import GenerateLOView from './GenerateLOView';

export interface PathDesignGenLOProps {
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
  isHighligted?: boolean;
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

  const { apiKey, setupModel, handleApiKey, handleSetupModel } =
    useGeneralContext();

  // Used to handle generated learning objectives
  const [selectedLO, setSelectedLO] = useState<boolean[]>([]); // Array to keep track of the selected learning objective
  const [isLessGeneratedLO, setIsLessGeneratedLO] = useState<boolean>(false); // State to check if the number of generated learning objectives is equal to the desired number

  // Show Generate Learning Objectives area
  const [showBox, setShowBox] = useState(false); // used to show the API setup boxes
  const [isClicked, setIsClicked] = useState(false); // used for the API setup button

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

  return (
    <Flex pt="3rem" direction="column" w="100%">
      {showBox && (
        <GenerateLOView
          apiKey={apiKey}
          handleApiKey={handleApiKey}
          setupModel={setupModel}
          handleSetupModel={handleSetupModel}
          setSelectedLO={setSelectedLO}
          selectedContext={selectedContext}
          selectedSkillConceptsTags={selectedSkillConceptsTags}
          selectedOptions={selectedOptions}
          learningTextContext={learningTextContext}
          generatedLOs={generatedLOs}
          setGeneratedLOs={setGeneratedLOs}
          setIsLessGeneratedLO={setIsLessGeneratedLO}
          setIsNextButtonClicked={setIsNextButtonClicked}
          bloomLevelIndex={bloomLevelIndex}
          selectedBloomLevel={selectedBloomLevel}
          handleSelectedLearningObjectiveIndexChange={handleSelectedLearningObjectiveIndexChange}

        />
      )}
      <Flex justifyContent="center" py="10px">
        <ShowHideButton
          isClicked={isClicked}
          setIsClicked={setIsClicked}
          showBox={showBox}
          setShowBox={setShowBox}
          showButtonName="Generate Learning Objectives"
          hideButtonName="Hide"
        />
      </Flex>
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
