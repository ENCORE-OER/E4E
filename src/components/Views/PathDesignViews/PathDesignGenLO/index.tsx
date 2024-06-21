import { Flex } from '@chakra-ui/react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useGeneralContext } from '../../../../Contexts/GeneralContext';
import { useLearningPathDesignContext } from '../../../../Contexts/LearningPathDesignContext/LearningPathDesignContext';
import { ObjectLearningObjectiveProps } from '../../../../types/encoreElements';
import { useHasHydrated } from '../../../../utils/utils';
import BoxLearningObjective from '../../../Boxes/BoxLearningObjective';
import LoadingSpinner from '../../../LoadingSpinner/LoadingSpinner';
import DeleteLOAlertDialog from '../../../Modals/AlertDialogs/DeleteAlertDialog/DeleteLOAlertDialog';
import InfoGenAITextBox from '../../../TextBox/InfoTextBox/InfoGenAITextBox';
import GenerateLOView from './GenerateLOView';

export interface PathDesignGenLOProps {
  selectedBloomLevel: string;
  isNextButtonClicked: boolean;
  setIsNextButtonClicked: Dispatch<SetStateAction<boolean>>;
  isGenerateLOClicked?: boolean;
  setIsGenerateLOClicked?: Dispatch<SetStateAction<boolean>>;
  isHighligted?: boolean;
  isSmallerScreen?: boolean | undefined;
  isEmptyLearningObjectivesPresent: boolean;
}

export default function PathDesignGenLO({
  selectedBloomLevel,
  isNextButtonClicked,
  setIsNextButtonClicked,
  // isGenerateLOClicked,
  setIsGenerateLOClicked,
  isHighligted,
  isSmallerScreen,
  isEmptyLearningObjectivesPresent,
}: PathDesignGenLOProps) {
  const hydrated = useHasHydrated();
  // const { addToast } = CustomToast();

  const { apiKey, setupModel, handleApiKey, handleSetupModel } =
    useGeneralContext();

  const {
    bloomLevelIndex,
    // takes the value of the selected option in "Educational Scenario"
    selectedOptions,
    selectedContext, // used for the api call
    selectedSkillConceptTags,
    learningTextContext, // used for the api call (learning context)
    defaultLearningContext,
    handleDefaultLearningContext,
    // ----- Learning Objective Objects -----
    learningObjectiveObjects,
    setLearningObjectiveObjects,
    handleUpdateLO,
    handleDeleteLO,
    MAX_LO,
    MIN_LO,
    numberOfLO,
    setNumberOfLO,
  } = useLearningPathDesignContext();

  // Used to handle generated learning objectives
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

  // -----
  // See useEffect in LearningPathDesignContext
  // -----

  useEffect(() => {
    const update = learningObjectiveObjects.some(
      (learningObjectiveObject: ObjectLearningObjectiveProps) =>
        learningObjectiveObject.isGenerated
    );
    if (update !== isAtLeastOneLOGenerated) {
      setIsAtLeastOneLOGenerated(update);
    }
  }, [learningObjectiveObjects]);

  useEffect(() => {
    if (learningObjectiveObjects.length === 0) {
      setIsAtLeastOneLOGenerated(false);
    }
  }, []);

  return (
    <Flex pt="1.5rem" direction="column" w="100%">
      {/* {showBox && ( */}
      <GenerateLOView
        apiKey={apiKey}
        handleApiKey={handleApiKey}
        setupModel={setupModel}
        handleSetupModel={handleSetupModel}
        selectedContext={selectedContext}
        selectedSkillConceptTags={selectedSkillConceptTags}
        selectedOptions={selectedOptions}
        learningTextContext={learningTextContext}
        // setIsLessGeneratedLO={setIsLessGeneratedLO}
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
        handleUpdateLO={handleUpdateLO}
        handleDeleteLO={handleDeleteLO}
        MAX_LO={MAX_LO}
        MIN_LO={MIN_LO}
        numberOfLO={numberOfLO}
        setNumberOfLO={setNumberOfLO}
        isEmptyLearningObjectivesPresent={isEmptyLearningObjectivesPresent}
        setIsGenerateLOClicked={setIsGenerateLOClicked}
        isAtLeastOneLOGenerated={isAtLeastOneLOGenerated}
        handleDefaultLearningContext={handleDefaultLearningContext}
        defaultLearningContext={defaultLearningContext}
      />

      {isAtLeastOneLOGenerated && (
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
        {/* {isLessGeneratedLO && (
          <Flex direction={'row'} align={'center'} pb={5}>
            <PiSmileySadLight />
            <Text
              pl={2}
              fontSize={'md'}
              fontWeight={'bold'}
              textColor={'orange.300'}
            >
              Sorry, but we were unable to generate the requested number of learning objectives.
            </Text>
          </Flex>
        )} */}

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
