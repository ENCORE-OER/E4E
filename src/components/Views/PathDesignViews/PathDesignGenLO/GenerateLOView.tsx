import { Flex, Text } from '@chakra-ui/react';
import axios from 'axios';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { PathDesignGenLOProps } from '.';
import {
  BloomLevelString,
  EducationContextEnum,
  ObjectLearningObjectiveProps,
  Option,
  SkillItemProps,
} from '../../../../types/encoreElements';
import { CustomToast } from '../../../../utils/Toast/CustomToast';
import { mapOptionToNumber, mapStringToString } from '../../../../utils/utils';
import GenerateLOButton from '../../../Buttons/ButtonsDesignPage/GenerateLOButton';
import IconInfoCircleTooltip from '../../../Icons/IconInfoCircle/IconInfoCircleTooltip';
import OverwriteLOAlertDialog from '../../../Modals/AlertDialogs/OverwriteAlertDialog/OverwriteLOAlertDialog';
import NumberInputWithButtons from '../../../TextBox/NumberInputWithButtons';

interface GenerateLOViewProps extends PathDesignGenLOProps {
  apiKey: string | undefined;
  handleApiKey: (value: string) => void;
  setupModel: string | undefined;
  handleSetupModel: (value: string) => void;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  bloomLevelIndex: number;
  selectedOptions: string[];
  selectedContext: Option | null;
  selectedSkillConceptTags: SkillItemProps[];
  learningTextContext: string;
  defaultLearningContext: string;
  handleDefaultLearningContext: () => void;
  MAX_LO: number;
  MIN_LO: number;
  numberOfLO: number;
  setNumberOfLO: Dispatch<SetStateAction<number>>;
  learningObjectiveObjects: ObjectLearningObjectiveProps[];
  setLearningObjectiveObjects: Dispatch<
    SetStateAction<ObjectLearningObjectiveProps[]>
  >;
  handleUpdateLO: (updatedText: string, index?: number) => void;
  handleDeleteLO: (indexLO: number) => void;
  isEmptyLearningObjectivesPresent: boolean;
  setIsGenerateLOClicked?: Dispatch<SetStateAction<boolean>>;
  isAtLeastOneLOGenerated: boolean;
}

export default function GenerateLOView({
  apiKey,
  setupModel,
  bloomLevelIndex,
  selectedBloomLevel,
  selectedContext,
  selectedSkillConceptTags: selectedSkillConceptsTags,
  selectedOptions,
  learningTextContext,
  isNextButtonClicked,
  setIsNextButtonClicked,
  isLoading,
  setIsLoading,
  learningObjectiveObjects,
  setLearningObjectiveObjects,
  MAX_LO,
  MIN_LO,
  numberOfLO,
  setNumberOfLO,
  isEmptyLearningObjectivesPresent,
  setIsGenerateLOClicked,
  isAtLeastOneLOGenerated,
  handleDefaultLearningContext,
  defaultLearningContext,
}: GenerateLOViewProps) {
  const { addToast } = CustomToast();

  // const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state
  const [isNumberOfLOZero, setIsNumberOfLOZero] = useState<boolean>(false); // State to check if the number of learning objectives is invalid (zero)

  // =========================================
  // Handle alert dialog when re-generate learning objectives

  const [isOverwriteAlertDialogOpen, setIsOverwriteAlertDialogOpen] =
    useState<boolean>(false);

  const onCloseOverwriteAlertDialog = () => {
    setIsOverwriteAlertDialogOpen(false);
  };

  const onOpenOverwriteAlertDialog = () => {
    setIsOverwriteAlertDialogOpen(true);
  };

  // =========================================

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

      // The API returns an array of 2 learning objectives for each bloom level,
      // so I have to select the one corresponding to the selected bloom level
      return resp?.data[bloomLevel];
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleGenerateLO = async () => {
    // if (apiKey === undefined || apiKey === '') {
    //   addToast({
    //     message: 'Please enter your OpenAI API Key.',
    //     type: 'warning',
    //   });
    // } else
    // setIsLessGeneratedLO(false);
    console.log('objectLOs: ', learningObjectiveObjects?.map((obj) => obj));

    //  // Number of the learning objectives to generate
    const numberLOToGenerate = learningObjectiveObjects
      ?.filter(
        // We filter counting the previously or empty learning objectives
        (objectLO: ObjectLearningObjectiveProps) =>
          objectLO.learningObjective === '' || objectLO.isGenerated
      )
      .map((objectLO: ObjectLearningObjectiveProps) => objectLO).length;

    if (!isEmptyLearningObjectivesPresent && numberLOToGenerate === 0) {
      addToast({
        message:
          'In order to generate new learning objectives, there must be empty learning objectives or at least one previously generate learning objective!',
        type: 'error',
      });
    } else if (
      bloomLevelIndex === -1 ||
      selectedSkillConceptsTags.length === 0 ||
      selectedOptions.length === 0 // Bloom's verbs
      // || learningTextContext === '' // If empty we'll set automatically the default one
    ) {
      addToast({
        message:
          'Please fill out all the required fields before generating learning objectives.',
        type: 'warning',
      });
      // Set isNextButtonClicked to 'true' in order to trigger the 'isHighlighted' parameter and highlight the empty values necessary to generate LOs
      // setIsNextButtonClicked(true);
      if (setIsGenerateLOClicked !== undefined) {
        setIsGenerateLOClicked(true);
      }
      // return;
    } else {
      try {
        // console.log('Previous learning objectives: ', totalLearningObjectives);
        console.log(
          'Previous OBJECT learning objectives: ',
          learningObjectiveObjects
        );

        if (numberOfLO > 0) {
          setIsLoading(true);

          // We filter the learning objectives deleting the previous generated learning objectives or empty learning objectives
          setLearningObjectiveObjects(
            learningObjectiveObjects
              ?.filter(
                (objectLO: ObjectLearningObjectiveProps) =>
                  !objectLO.isGenerated || objectLO.learningObjective === ''
              )
              .map((objectLO: ObjectLearningObjectiveProps) => objectLO) || []
          );

          // handleSelectedLearningObjectiveIndexChange(-1);
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
          let noResponse = false;
          let isLessGeneratedLO = false;
          // Call the API until the number of learning objectives is reached.
          while (
            learningObjectives.length < numberLOToGenerate &&
            i < MAX_API_CALL &&
            !noResponse
          ) {
            //for (let i = 0; i < Math.round(numberOfLO / 2); i++) {
            console.log('LO number ' + i);

            let resp: string[] | undefined = [];
            try {
              resp = await postGenerateLearningObjective(
                apiKey, // apiKey
                setupModel, // setupModel
                mapOptionToNumber(selectedContext, EducationContextEnum), // educationContext // TODO: before to call the API, check if the options are not null
                learningTextContext || defaultLearningContext, // learningContext
                selectedSkillConceptsTags
                  .map((skill: SkillItemProps) => skill.label)
                  .join(', '), // skills
                mapStringToString(selectedBloomLevel, BloomLevelString) // bloomLevel // TODO: before to call the API, check if the options are not null
              );
            } catch (error) {
              console.log(error);
            }

            console.log('resp', resp);

            // If there is not response
            if (!resp) {
              console.log('No response');
              //learningObjectives.push('');
              noResponse = true;
            } else {
              // The API returns an array of 2 learning objectives
              for (const textLO of resp) {
                // Check if the learning objective is not already in the list
                // and if the number of learning objectives is not reached
                // Avoid duplicates
                if (
                  !learningObjectives.includes(textLO) &&
                  learningObjectives.length < numberLOToGenerate
                ) {
                  learningObjectives.push(textLO);
                  //console.log('textLO', textLO);
                }
              }
              noResponse = false;
            }

            console.log('learningObjectives', learningObjectives);
            i++;
          }
          // Check if there are less generated learning objectives
          if (learningObjectives.length < numberLOToGenerate) {
            isLessGeneratedLO = true;
          }
          // Repopulate the learning objectives array
          setLearningObjectiveObjects(
            (prevLearningObjectives: ObjectLearningObjectiveProps[]) => [
              ...prevLearningObjectives,
              ...learningObjectives.map((lo: string) => ({
                learningObjective: lo,
                isSelected: false,
                isGenerated: true,
              })),
            ]
          );

          if (noResponse) {
            //TODO: specify better the error
            // addToast({
            //   message: 'Invalid API Key. Please enter a valid OpenAI API Key.',
            //   type: 'error',
            // });
            addToast({
              message: 'Error during learning objectives generation.',
              type: 'error',
            });
          } else if (isLessGeneratedLO) {
            addToast({
              message:
                'Sorry, but we were unable to generate the requested number of learning objectives.',
              type: 'warning',
            });
          } else {
            addToast({
              message: 'Learning objectives succesfully generated!',
              type: 'success',
            });
          }
        } else {
          setIsNumberOfLOZero(true);
          // console.log('Number of learning objectives is 0');
          addToast({
            message:
              'Please enter the number of learning objectives to generate.',
            type: 'warning',
          });
        }
      } catch (error) {
        console.error(error);
        // Set isNextButtonClicked to 'false' in order to don't trigger anymore 'isHighlighted' parameter if an Educator is for example editing a value
      } finally {
        setIsLoading(false);
        if (isNextButtonClicked) {
          setIsNextButtonClicked(false);
        }
        if (setIsGenerateLOClicked !== undefined) {
          setIsGenerateLOClicked(false);
        }
      }
    }
  };

  const handleGenerationLONoContext = async () => {
    if (learningTextContext?.trim() === '') {
      console.log('setting default learning context');
      handleDefaultLearningContext();
    }

    await handleGenerateLO();
  };

  const handleClickOnGenerateLOButton = async () => {
    // Before we check if there are some empty fields needed for the generation
    if (
      bloomLevelIndex === -1 ||
      selectedSkillConceptsTags.length === 0 ||
      selectedOptions.length === 0 // Bloom's verbs
      // || learningTextContext === '' // If empty we'll set automatically the default one
    ) {
      addToast({
        message:
          'Please fill out all the required fields before generating learning objectives.',
        type: 'warning',
      });
      // Set isNextButtonClicked to 'true' in order to trigger the 'isHighlighted' parameter and highlight the empty values necessary to generate LOs
      // setIsNextButtonClicked(true);
      if (setIsGenerateLOClicked !== undefined) {
        setIsGenerateLOClicked(true);
      }
      // return;
    } else {
      if (isAtLeastOneLOGenerated) {
        onOpenOverwriteAlertDialog();
      } else {
        // await handleGenerateLO();
        await handleGenerationLONoContext();
      }
    }
  };

  // Update the loading state to false when the learning objectives are generated
  useEffect(() => {
    if (
      isLoading &&
      learningObjectiveObjects.length -
      learningObjectiveObjects.filter(
        (objectLO: ObjectLearningObjectiveProps) => !objectLO.isGenerated
      ).length >
      0
    ) {
      setIsLoading(false);
    }
    // else if (numberOfLO > learningObjectiveObjects.length && numberOfLO > MIN_LO) {
    //   setNumberOfLO(numberOfLO - 1);
    // }
  }, [learningObjectiveObjects.length]);

  return (
    <Flex direction="column" w="100%">
      {/* <InputsGenAISetup
            apiKey={apiKey}
            handleApiKey={handleApiKey}
            setupModel={setupModel}
            handleSetupModel={handleSetupModel}
          /> */}
      {/* <InputsGenerateAI
        apiKey={apiKey}
        handleApiKey={handleApiKey}
        setupModel={setupModel}
        handleSetupModel={handleSetupModel}
      /> */}
      <Flex
        w="100%"
        direction="row"
        align="center"
        py="5"
        flexWrap={'wrap'}
        gap="5"
      >
        <Text fontWeight={'bold'}>
          Desired number of learning objective(s):
        </Text>
        <NumberInputWithButtons
          numberInput={numberOfLO}
          setNumberInput={setNumberOfLO}
          minNumber={MIN_LO}
          maxNumber={MAX_LO}
          isNumberZero={isNumberOfLOZero}
          label_tooltip={`You can generate maximum ${MAX_LO} learning objectives at a time.`}
          min_label_tooltip={
            !isEmptyLearningObjectivesPresent
              ? `No empty learning objectives available.`
              : `You must have at least ${MIN_LO} learning objective.`
          }
          max_label_tooltip={`You can generate maximum ${MAX_LO} learning objectives at a time.`}
          isEmptyLearningObjectivesPresent={isEmptyLearningObjectivesPresent}
          isLoading={isLoading}
          pr="10%"
        />
        <Flex
          flex="1"
          justify="flex-end"
          direction="row"
          align="center"
          gap={1}
        >
          <IconInfoCircleTooltip label_tooltip="This button allows you to automatically generate learning objectvies using AI. Generation will only occur if you have empty or previously generated learning objectives. The colored texts are those generated by AI." />
          <GenerateLOButton
            handleGenerateLO={handleClickOnGenerateLOButton}
            numberOfLO={numberOfLO}
          />
        </Flex>
      </Flex>

      <OverwriteLOAlertDialog
        isOpen={isOverwriteAlertDialogOpen}
        onClose={onCloseOverwriteAlertDialog}
        onConfirm={handleGenerationLONoContext}
      />

      {/* {isLoading && (
        <LoadingSpinner textLoading="Generating Learning Objectives..." />
      )} */}
    </Flex>
  );
}
