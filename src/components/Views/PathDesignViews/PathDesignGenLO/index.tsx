import { Flex, Text } from '@chakra-ui/react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { PiSmileySadLight } from 'react-icons/pi';
import { useGeneralContext } from '../../../../Contexts/GeneralContext';
import {
  ObjectLearningObjectiveProps,
  Option,
  SkillItemProps,
} from '../../../../types/encoreElements';
import { CustomToast } from '../../../../utils/Toast/CustomToast';
import { useHasHydrated } from '../../../../utils/utils';
import BoxLearningObjective from '../../../Boxes/BoxLearningObjective';
import LoadingSpinner from '../../../LoadingSpinner/LoadingSpinner';
import DeleteLOAlertDialog from '../../../Modals/AlertDialogs/DeleteAlertDialog/DeleteLOAlertDialog';
import InfoGenAITextBox from '../../../TextBox/InfoGenAITextBox';
import GenerateLOView from './GenerateLOView';

export interface PathDesignGenLOProps {
  bloomLevelIndex: number;
  selectedBloomLevel: string;
  selectedContext: Option | null;
  selectedSkillConceptsTags: SkillItemProps[];
  selectedOptions: string[];
  // selectedGroupDimension: Option | null;
  // selectedLearnerExperience: Option | null;
  // selectedEducatorExperience: Option | null;
  learningTextContext: string;
  MAX_LO: number;
  MIN_LO: number;
  numberOfLO: number;
  setNumberOfLO: Dispatch<SetStateAction<number>>;
  learningObjectiveObjects: ObjectLearningObjectiveProps[];
  setLearningObjectiveObjects: Dispatch<
    SetStateAction<ObjectLearningObjectiveProps[]>
  >;
  // handleSelectedLearningObjectiveIndexChange: (index: number) => void;
  isNextButtonClicked: boolean;
  setIsNextButtonClicked: Dispatch<SetStateAction<boolean>>;
  isGenerateLOClicked?: boolean;
  setIsGenerateLOClicked?: Dispatch<SetStateAction<boolean>>;
  isHighligted?: boolean;
  isSmallerScreen?: boolean | undefined;
  isEmptyLearningObjectivesPresent: boolean;
}

export default function PathDesignGenLO({
  bloomLevelIndex,
  selectedBloomLevel,
  selectedContext,
  selectedSkillConceptsTags,
  selectedOptions,
  // selectedGroupDimension,
  // selectedLearnerExperience,
  // selectedEducatorExperience,
  learningTextContext,
  MAX_LO,
  MIN_LO,
  numberOfLO,
  setNumberOfLO,
  learningObjectiveObjects,
  setLearningObjectiveObjects,
  // handleSelectedLearningObjectiveIndexChange,
  isNextButtonClicked,
  setIsNextButtonClicked,
  isGenerateLOClicked,
  setIsGenerateLOClicked,
  isHighligted,
  isSmallerScreen,
  isEmptyLearningObjectivesPresent,
}: PathDesignGenLOProps) {
  const hydrated = useHasHydrated();
  const { addToast } = CustomToast();

  const { apiKey, setupModel, handleApiKey, handleSetupModel } =
    useGeneralContext();

  // Used to handle generated learning objectives
  const [isLessGeneratedLO, setIsLessGeneratedLO] = useState<boolean>(false); // State to check if the number of generated learning objectives is equal to the desired number
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state
  // const [numberOfLO, setNumberOfLO] = useState<number>(1); // Number of learning objectives to generate. Default and min number is 1
  // const [isGenerateLOClicked, setIsGenerateLOClicked] = useState<boolean>(false); // State to know when the "Generate learning objective" button is clicked
  const [isAtLeastOneLOGenerated, setIsAtLeastOneLOGenerated] =
    useState<boolean>(false); // State to check in real time if there is at least one generated learning objective

  // =========================================
  // handle deleting last learning objective
  const [isDeleteAlertDialogOpen, setIsDeleteAlertDialogOpen] =
    useState<boolean>(false);

  const onCloseDeleteAlertDialog = () => {
    setIsDeleteAlertDialogOpen(false);
  };

  const onOpenDeleteAlertDialog = () => {
    setIsDeleteAlertDialogOpen(true);
  };
  // =========================================

  // Show Generate Learning Objectives area
  // const [showBox, setShowBox] = useState(false); // used to show the API setup boxes
  // const [isClicked, setIsClicked] = useState(false); // used for the API setup button

  // Function to update the learning objective when the user edits it
  const handleUpdateLO = (updatedText: string, index?: number) => {
    if (index != undefined) {
      console.log('Update learning objective');

      // const updatedGeneratedLOs = [...totalLearningObjectives];
      // // console.log('GeneratedLOs', updatedGeneratedLOs);
      // updatedGeneratedLOs[index] = updatedText; // Update the learning objective
      // setTotalLearningObjectives(updatedGeneratedLOs);

      // ... Update using the <ObjectLearningObjectiveProps> array ...
      const updatedObjectLOs = [...learningObjectiveObjects];
      updatedObjectLOs[index].learningObjective = updatedText;
      if (updatedObjectLOs[index].isGenerated) {
        updatedObjectLOs[index].isGenerated = false;
      }
      // console.log('OBJECTS UPDATED: ', updatedObjectLOs);
      // console.log('updatedGeneratedLOs', updatedGeneratedLOs);
      setLearningObjectiveObjects(updatedObjectLOs);
    }
  };

  // // Function to handle the click on the checkbox to select the learning objectives
  // const handleCheckBoxClick = (index: number) => {
  //   console.log('Checkbox clicked');
  //   try {
  //     console.log(
  //       'selected LOs',
  //       learningObjectiveObjects.map(
  //         (objectLO: ObjectLearningObjectiveProps) => objectLO.isSelected
  //       )
  //     );

  //     // Updating object LO selection
  //     const updatedSelectedLOsObj = [...learningObjectiveObjects];
  //     updatedSelectedLOsObj[index].isSelected =
  //       !updatedSelectedLOsObj[index].isSelected;
  //     console.log(
  //       'updated Selected LOs',
  //       learningObjectiveObjects.map(
  //         (objectLO: ObjectLearningObjectiveProps) => objectLO.isSelected
  //       )
  //     );

  //     setLearningObjectiveObjects(updatedSelectedLOsObj);

  //     handleSelectedLearningObjectiveIndexChange(index);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // Function to create/add a custom learning objective
  const handleAddLearningObjective = () => {
    console.log('Add new learning objective');
    try {
      setLearningObjectiveObjects(
        (prevObjectLOs: ObjectLearningObjectiveProps[]) => [
          ...prevObjectLOs,
          {
            learningObjective: '',
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
    const updatedObjectLOs = learningObjectiveObjects.filter(
      (objectLO: ObjectLearningObjectiveProps, index: number) =>
        indexLO !== index
    );
    setLearningObjectiveObjects(updatedObjectLOs);
    if (numberOfLO > updatedObjectLOs.length) {
      setNumberOfLO(numberOfLO - 1);
    }

    addToast({
      message: `Learning objective successfully deleted!`,
      type: 'success',
    });
  };

  useEffect(() => {
    // Starting with at least one learning objective
    if (learningObjectiveObjects.length < numberOfLO) {
      // Add objectives until the desired number is reached
      const difference = numberOfLO - learningObjectiveObjects.length;
      for (let i = 0; i < difference; i++) {
        handleAddLearningObjective();
      }
      // Handle the change value of numberOfLO when decrease it
    } else if (numberOfLO < learningObjectiveObjects.length) {
      // Remove empty objectives
      const difference = learningObjectiveObjects.length - numberOfLO;
      let count = 0;
      const updatedObjectives = learningObjectiveObjects.filter((obj) => {
        if (count < difference && obj.learningObjective === '') {
          count++;
          return false;
        }
        return true;
      });

      // Update the number of objectives
      const newNumberOfLO = learningObjectiveObjects.length - count;
      setLearningObjectiveObjects(updatedObjectives);
      setNumberOfLO(newNumberOfLO);
    } else if (learningObjectiveObjects.length === 0) {
      setIsAtLeastOneLOGenerated(false);
      handleAddLearningObjective();
    }
  }, [numberOfLO, learningObjectiveObjects.length]);

  useEffect(() => {
    const update = learningObjectiveObjects.some(
      (learningObjectiveObject: ObjectLearningObjectiveProps) =>
        learningObjectiveObject.isGenerated
    );
    if (update !== isAtLeastOneLOGenerated) {
      setIsAtLeastOneLOGenerated(update);
    }
  }, [learningObjectiveObjects]);

  return (
    <Flex pt="1.5rem" direction="column" w="100%">
      {/* {showBox && ( */}
      <GenerateLOView
        apiKey={apiKey}
        handleApiKey={handleApiKey}
        setupModel={setupModel}
        handleSetupModel={handleSetupModel}
        selectedContext={selectedContext}
        selectedSkillConceptsTags={selectedSkillConceptsTags}
        selectedOptions={selectedOptions}
        learningTextContext={learningTextContext}
        setIsLessGeneratedLO={setIsLessGeneratedLO}
        isNextButtonClicked={isNextButtonClicked}
        setIsNextButtonClicked={setIsNextButtonClicked}
        bloomLevelIndex={bloomLevelIndex}
        selectedBloomLevel={selectedBloomLevel}
        // handleSelectedLearningObjectiveIndexChange={
        //   handleSelectedLearningObjectiveIndexChange
        // }
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        learningObjectiveObjects={learningObjectiveObjects}
        setLearningObjectiveObjects={setLearningObjectiveObjects}
        MAX_LO={MAX_LO}
        MIN_LO={MIN_LO}
        numberOfLO={numberOfLO}
        setNumberOfLO={setNumberOfLO}
        isEmptyLearningObjectivesPresent={isEmptyLearningObjectivesPresent}
        setIsGenerateLOClicked={setIsGenerateLOClicked}
        isAtLeastOneLOGenerated={isAtLeastOneLOGenerated}
      />

      {isGenerateLOClicked && isAtLeastOneLOGenerated && (
        <Flex>
          <InfoGenAITextBox isSmallerScreen={isSmallerScreen} />
        </Flex>
      )}

      <Flex
        py="1rem"
        direction="column"
        border={
          isHighligted &&
          learningObjectiveObjects.length > 0 &&
          learningObjectiveObjects.filter(
            (objectLO: ObjectLearningObjectiveProps) => !objectLO.isSelected
          ).length === 0
            ? '2.5px solid #bf5521ff'
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

        <Flex direction="column" rowGap={3}>
          {
            // numberOfLO > 0 &&
            // !isLoading &&
            learningObjectiveObjects.length > 0 &&
              hydrated &&
              learningObjectiveObjects.map(
                (objectLO: ObjectLearningObjectiveProps, index: number) => (
                  <BoxLearningObjective
                    key={index}
                    textLearningObjective={objectLO.learningObjective}
                    isGenerated={objectLO.isGenerated}
                    index={index}
                    handleUpdateLO={handleUpdateLO}
                    handleDeleteLO={() => {
                      if (learningObjectiveObjects.length > 1) {
                        handleDeleteLO(index);
                      } else {
                        onOpenDeleteAlertDialog();
                      }
                    }}
                    isSmallerScreen={isSmallerScreen}
                    label_tooltip_delete="Delete"
                    isNextButtonClicked={isNextButtonClicked}
                    isDisabled={
                      isLoading &&
                      (objectLO.isGenerated ||
                        objectLO.learningObjective.trim().length === 0)
                    }
                  />
                )
              )
          }
        </Flex>
        {isLoading && (
          <LoadingSpinner textLoading="Generating Learning Objectives..." />
        )}
      </Flex>
      <DeleteLOAlertDialog
        isDeleteAlertDialogOpen={isDeleteAlertDialogOpen}
        onCloseDeleteAlertDialog={onCloseDeleteAlertDialog}
        handleDeleteLO={handleDeleteLO}
        index={0} // Will be always the first and last of the array because we want to open this dialog when there is only one learning objective
      />
    </Flex>
  );
}
