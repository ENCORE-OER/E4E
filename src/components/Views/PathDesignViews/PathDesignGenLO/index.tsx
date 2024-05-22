import { Flex, Text } from '@chakra-ui/react';
import { Dispatch, SetStateAction, useState } from 'react';
import { PiSmileySadLight } from 'react-icons/pi';
import { useGeneralContext } from '../../../../Contexts/GeneralContext';
import {
  ObjectLearningObjectiveProps,
  Option,
  SkillItemProps,
} from '../../../../types/encoreElements';
import { CustomToast } from '../../../../utils/Toast/CustomToast';
import { useHasHydrated } from '../../../../utils/utils';
import BoxGeneratedLO from '../../../Boxes/BoxGeneratedLO';
import AddLearningObjectiveButton from '../../../Buttons/ButtonsDesignPage/AddLearningObjectiveButton';
import ShowHideButton from '../../../Buttons/ShowHideButton';
import LoadingSpinner from '../../../LoadingSpinner/LoadingSpinner';
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
  // totalLearningObjectives: string[];
  // setTotalLearningObjectives: Dispatch<SetStateAction<string[]>>;
  learningObjectiveObjects: ObjectLearningObjectiveProps[];
  setLearningObjectiveObjects: Dispatch<
    SetStateAction<ObjectLearningObjectiveProps[]>
  >;
  handleSelectedLearningObjectiveIndexChange: (index: number) => void;
  setIsNextButtonClicked: Dispatch<SetStateAction<boolean>>;
  isHighligted?: boolean;
  isSmallerScreen?: boolean | undefined;
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
  // totalLearningObjectives,
  // setTotalLearningObjectives,
  learningObjectiveObjects,
  setLearningObjectiveObjects,
  handleSelectedLearningObjectiveIndexChange,
  setIsNextButtonClicked,
  isHighligted,
  isSmallerScreen,
}: PathDesignGenLOProps) {
  const hydrated = useHasHydrated();
  const { addToast } = CustomToast();

  const { apiKey, setupModel, handleApiKey, handleSetupModel } =
    useGeneralContext();

  // Used to handle generated learning objectives
  const [isLessGeneratedLO, setIsLessGeneratedLO] = useState<boolean>(false); // State to check if the number of generated learning objectives is equal to the desired number
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state

  // Show Generate Learning Objectives area
  const [showBox, setShowBox] = useState(false); // used to show the API setup boxes
  // const [isClicked, setIsClicked] = useState(false); // used for the API setup button

  // Function to update the learning objective when the user edits it
  const handleUpdateLO = (index: number, updatedText: string) => {
    console.log('Update learning objective');

    // const updatedGeneratedLOs = [...totalLearningObjectives];
    // // console.log('GeneratedLOs', updatedGeneratedLOs);
    // updatedGeneratedLOs[index] = updatedText; // Update the learning objective
    // setTotalLearningObjectives(updatedGeneratedLOs);

    // ... Update using the <ObjectLearningObjectiveProps> array ...
    const updatedObjectLOs = [...learningObjectiveObjects];
    updatedObjectLOs[index].learningObjective = updatedText;
    // console.log('OBJECTS UPDATED: ', updatedObjectLOs);
    // console.log('updatedGeneratedLOs', updatedGeneratedLOs);
    setLearningObjectiveObjects(updatedObjectLOs);
  };

  // Function to handle the click on the checkbox to select the learning objectives
  const handleCheckBoxClick = (index: number) => {
    console.log('Checkbox clicked');
    try {
      console.log(
        'selected LOs',
        learningObjectiveObjects.map(
          (objectLO: ObjectLearningObjectiveProps) => objectLO.isSelected
        )
      );

      // Updating object LO selection
      const updatedSelectedLOsObj = [...learningObjectiveObjects];
      updatedSelectedLOsObj[index].isSelected =
        !updatedSelectedLOsObj[index].isSelected;
      console.log(
        'updated Selected LOs',
        learningObjectiveObjects.map(
          (objectLO: ObjectLearningObjectiveProps) => objectLO.isSelected
        )
      );

      setLearningObjectiveObjects(updatedSelectedLOsObj);

      handleSelectedLearningObjectiveIndexChange(index);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to create/add a custom learning objective
  const handleAddLearningObjective = () => {
    console.log('Add new learning objective');
    try {
      // const updatedGeneratedLOs = [...generatedLOs];
      // updatedGeneratedLOs.push('');
      // setGeneratedLOs(updatedGeneratedLOs);

      setLearningObjectiveObjects(
        (prevObjectLOs: ObjectLearningObjectiveProps[]) => [
          ...prevObjectLOs,
          {
            learningObjective: `${selectedBloomLevel} - ${selectedSkillConceptsTags
              .map(
                (selectedSkillConceptsTag: SkillItemProps) =>
                  selectedSkillConceptsTag.label
              )
              .join(', ')} - ${learningTextContext}`,
            isSelected: false,
            isGenerated: false,
          },
        ]
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteLO = (indexLO: number) => {
    const updatedObjectLOs = [...learningObjectiveObjects].filter(
      (objectLO: ObjectLearningObjectiveProps, index: number) =>
        indexLO !== index
    );
    setLearningObjectiveObjects(updatedObjectLOs);

    addToast({
      message: `Learning objective successfully deleted!`,
      type: 'success',
    });
  };

  return (
    <Flex pt="3rem" direction="column" w="100%">
      {showBox && (
        <GenerateLOView
          apiKey={apiKey}
          handleApiKey={handleApiKey}
          setupModel={setupModel}
          handleSetupModel={handleSetupModel}
          selectedContext={selectedContext}
          selectedSkillConceptsTags={selectedSkillConceptsTags}
          selectedOptions={selectedOptions}
          learningTextContext={learningTextContext}
          // totalLearningObjectives={totalLearningObjectives}
          // setTotalLearningObjectives={setTotalLearningObjectives}
          setIsLessGeneratedLO={setIsLessGeneratedLO}
          setIsNextButtonClicked={setIsNextButtonClicked}
          bloomLevelIndex={bloomLevelIndex}
          selectedBloomLevel={selectedBloomLevel}
          handleSelectedLearningObjectiveIndexChange={
            handleSelectedLearningObjectiveIndexChange
          }
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          learningObjectiveObjects={learningObjectiveObjects}
          setLearningObjectiveObjects={setLearningObjectiveObjects}
        />
      )}
      <Flex justifyContent="center" py="10px">
        <ShowHideButton
          // isClicked={isClicked}
          // setIsClicked={setIsClicked}
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
          isHighligted &&
          learningObjectiveObjects.length > 0 &&
          learningObjectiveObjects.filter(
            (objectLO: ObjectLearningObjectiveProps) => !objectLO.isSelected
          ).length === 0
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
              {`Sorry, but we were unable to generate the requested number of learning objectives.`}{' '}
            </Text>
          </Flex>
        )}

        <Flex direction="column">
          {
            //numberOfLO > 0 &&
            learningObjectiveObjects.length > 0 &&
              hydrated &&
              learningObjectiveObjects.map(
                (objectLO: ObjectLearningObjectiveProps, index: number) => (
                  <BoxGeneratedLO
                    key={index}
                    textLearningObjective={objectLO.learningObjective}
                    isGenerated={objectLO.isGenerated}
                    isSelected={objectLO.isSelected}
                    // objectLOs={updatedSelectedLOs}
                    index={index}
                    //selectedLO={selectedLO}
                    handleCheckBoxClick={handleCheckBoxClick}
                    handleUpdateLO={handleUpdateLO}
                    handleDeleteLO={handleDeleteLO}
                    isSmallerScreen={isSmallerScreen}
                  />
                )
              )
          }
          {isLoading && (
            <LoadingSpinner textLoading="Generating Learning Objectives..." />
          )}
          {!isLoading && (
            <Flex justifyContent="center" pt="3rem">
              <AddLearningObjectiveButton
                textButton="Add new learning objective"
                w="fit-content"
                handleClick={handleAddLearningObjective}
              />
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}
