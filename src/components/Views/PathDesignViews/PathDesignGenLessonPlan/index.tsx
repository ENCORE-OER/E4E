import { Flex } from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { useCollectionsContext } from '../../../../Contexts/CollectionsContext/CollectionsContext';
import { useGeneralContext } from '../../../../Contexts/GeneralContext';
import { useLearningPathDesignContext } from '../../../../Contexts/LearningPathDesignContext';
import {
  ArrayProps,
  BloomLevelsEnum,
  MainTopicProps,
  MultipleArrayProps,
  ObjectLearningObjectiveProps,
  OerInCollectionProps,
  OutputLessonPlanProps,
  RespAnalyzedMaterialProps
} from '../../../../types/encoreElements';
import { mapOptionToNumber } from '../../../../utils/utils';
import GenerateLessonPlanButton from '../../../Buttons/ButtonsDesignPage/GenerateLessoPlanButton';
import ShowHideButton from '../../../Buttons/ShowHideButton';
import IconInfoCircleTooltip from '../../../Icons/IconInfoCircle/IconInfoCircleTooltip';
import RowBoxGenLessonPlan from './RowBoxGenLessonPlan';

type PathDesignGenLessonPlanProps = {
  handleNextClick: () => void;
}

export default function PathDesignGenLessonPlan({
  handleNextClick
}: PathDesignGenLessonPlanProps) {
  // const { chosenTargetLevel } = useCreateOERsContext();

  const { collectionIndex, resourcesIndex, learningObjectiveObjects, bloomLevelIndex, bloomLevels, learningTextContext } = useLearningPathDesignContext();
  const { collections } = useCollectionsContext();
  const { apiKey, setupModel } = useGeneralContext();

  // Show Generate Lesson Plan area
  const [showBox, setShowBox] = useState(false); // used to show the generate lesson plan

  const [numberOfLearningActivities, setNumberOfLearningActivities] =
    useState<number>(2); // Number of learning activities to generate for the lesson plan
  const [numberOfAssessmentActivities, setNumberOfAssessmentActivities] =
    useState<number>(2); // Number of assessment activities to generate for the lesson plan
  // const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state
  const [isNumberOfLAZero, setIsNumberOfLAZero] = useState<boolean>(false); // State to check if the number of learning activities is invalid (zero)
  const [isNumberOfAAZero, setIsNumberOfAAZero] = useState<boolean>(false); // State to check if the number of assessment activities is invalid (zero)

  const [selectedLearningActivities, setSelectedLearningActivities] =
    useState<boolean>(false);
  const [learningActivitiesIndex, setLearningActivitiesIndex] = useState<
    number[][]
  >([]);
  const [selectedAssessmentActivities, setSelectedAssessmentActivities] =
    useState<boolean>(false);
  const [assessmentActivitiesIndex, setAssessmentActivitiesIndex] = useState<
    number[][]
  >([]);

  const RememberLearningActivities: ArrayProps[] = [
    { name: 'Abstract Node' },
    { name: 'Create a list of keywords' },
    { name: 'Memorise a list of keywords' },
    { name: 'Read material' },
    { name: 'Watch a video' },
  ];

  const UnderstandLearningActivities: ArrayProps[] = [
    { name: 'Mind map' },
    { name: 'Summary' },
  ];

  const ApplyLearningActivities: ArrayProps[] = [
    { name: 'Problem Solving' },
    { name: 'Prompt Engineering' },
  ];

  const CreateLearningActivities: ArrayProps[] = [{ name: 'Find Solution' }];

  const dataLearningActivities: MultipleArrayProps[] = [
    {
      activities: RememberLearningActivities,
      title: 'Remember',
    },
    {
      activities: UnderstandLearningActivities,
      title: 'Understand',
    },
    {
      activities: ApplyLearningActivities,
      title: 'Apply',
    },
    {
      activities: CreateLearningActivities,
      title: 'Create',
    },
  ];

  // const EvaluateAssessmentActivities: ArrayProps[] = [
  //   { name: 'Multiple choice questions' },
  //   { name: 'Short answer questions' },
  //   { name: 'True or false questions' },
  //   { name: 'Matching questions' },
  //   { name: 'Fill in the blanks' },
  //   { name: 'Essay questions' },
  // ];

  const RememberAssessmentActivities: ArrayProps[] = [
    { name: 'Close Ended Question' },
    { name: 'Multiple choice questions' },
    { name: 'Open Question' },
    { name: 'True or false questions' },
  ];

  const UnderstandAssessmentActivities: ArrayProps[] = [
    { name: 'Cases Evaluation' },
    { name: 'Collaborative Modeling' },
    { name: 'Flow Chart' },
  ];

  const ApplyAssessmentActivities: ArrayProps[] = [
    { name: 'Analyzing-Plotting Data' },
    { name: 'Calculation' },
    { name: 'Image Evaluation' },
  ];

  const CreateAssessmentActivities: ArrayProps[] = [
    { name: 'Brainstorming' },
    { name: 'Coding Question' },
    { name: 'Innovation Pitch' },
    { name: 'Simulation' },
  ];

  const dataAssessmentActivities: MultipleArrayProps[] = [
    // {
    //   activities: EvaluateAssessmentActivities,
    //   title: 'Evaluate',
    // },
    {
      activities: RememberAssessmentActivities,
      title: 'Remember',
    },
    {
      activities: UnderstandAssessmentActivities,
      title: 'Understand',
    },
    {
      activities: ApplyAssessmentActivities,
      title: 'Apply',
    },
    {
      activities: CreateAssessmentActivities,
      title: 'Create',
    },
  ];

  // const handleActivityChange = (
  //   newIndexBloomActivity: number,
  //   newIndexActivity: number
  // ) => {
  //   if (newIndexBloomActivity <= -1 && newIndexActivity <= -1) {
  //     setLearningActivitiesIndex([]);
  //     setAssessmentActivitiesIndex([]);
  //   } else {
  //     // Populate the learning activities index array until the new index bloom activity with empty arrays
  //     while (learningActivitiesIndex.length <= newIndexBloomActivity) {
  //       setLearningActivitiesIndex((prevIndex) => [...prevIndex, []]);
  //     }

  //     // Check if the learning activities index array already contains the new index bloom activity
  //     const updatedActivitiesIndex = learningActivitiesIndex[
  //       newIndexBloomActivity
  //     ]?.includes(newIndexActivity)
  //       ? learningActivitiesIndex[newIndexBloomActivity].filter(
  //         (index) => index !== newIndexActivity
  //       ) // If YES, remove the new index activity from the array
  //       : [...learningActivitiesIndex[newIndexBloomActivity], newIndexActivity]; // If NO, add the new index activity to the array

  //     // Update the learning activities index array with the new index activity
  //     setLearningActivitiesIndex((prevIndex) => {
  //       const updatedIndex = [...prevIndex];
  //       updatedIndex[newIndexBloomActivity] = updatedActivitiesIndex;
  //       return updatedIndex;
  //     });

  //     // if (learningActivitiesIndex[newIndexBloomActivity] !== undefined && learningActivitiesIndex[newIndexBloomActivity].length > 0 && learningActivitiesIndex[newIndexBloomActivity]?.includes(newIndexActivity)) {
  //     //     const updatedActivitiesIndex = learningActivitiesIndex[newIndexBloomActivity]?.filter(
  //     //         (index: number) => index !== newIndexActivity
  //     //     );
  //     //     setLearningActivitiesIndex([updatedActivitiesIndex]);
  //     // } else {
  //     //     setLearningActivitiesIndex((prevIndex: number[][]) => [
  //     //         ...prevIndex,
  //     //         [newIndexActivity],
  //     //     ]);
  //     // }
  //   }
  // };

  const postGenerateLessonPlan = async (
    apiKey: string | undefined,
    setupModel: string | undefined,
    maintopics: MainTopicProps[],
    language: string,
    macroSubject: string,
    title: string,
    level: number,
    learningobjective: string,
    bloomLevel: number,
    context: string,
    temperature: number
  ): Promise<OutputLessonPlanProps[]> => {
    console.log("Generating lesson plan...");
    try {
      const resp = await axios.post(
        '../api/encore/genAI/generateLessonPlan',
        {
          mainTopics: maintopics,
          language: language,
          macroSubject: macroSubject,
          title: title,
          level: level,
          learningObjective: learningobjective,
          bloomLevel: bloomLevel,
          context: context,
          temperature: temperature,
        },
        {
          headers: {
            ApiKey: apiKey,
            SetupModel: setupModel,
          },
        }
      );

      return resp?.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const postAnalyzeMaterial = async (
    apiKey: string | undefined,
    setupModel: string | undefined,
    material: string
  ): Promise<RespAnalyzedMaterialProps | undefined> => {
    console.log('Analyzing material: ');

    try {
      const resp = await axios.post(
        '../api/encore/genAI/materialAnalyzer',
        {
          material: material,
        },
        {
          headers: {
            ApiKey: apiKey,
            SetupModel: setupModel,
          },
        }
      );

      return resp.data;
    } catch (error) {
      console.error('Error during the API call:', error);
    }
  }

  const handleGenerateLessonPlan = async () => {

    handleNextClick();

    const oers = collections[collectionIndex].oers;
    // Analyze selected resources
    let oer: OerInCollectionProps = {
      id: 0,
      title: '',
      description: '',
      concepts: [],
      urlSource: [],
      generated_by_ai: false,
    };

    // If at least a resources are selected
    if (resourcesIndex.length > 0) {
      let index = 0;
      while ((oer.urlSource.length === 0 || oer.urlSource === '') && index < resourcesIndex.length) {
        oers[resourcesIndex[index]].urlSource !== (undefined || [] || '')
          ? oer = oers[resourcesIndex[index]]
          : undefined
        index++;
      }
      // If no resources are selected takes directly from the collection
    } else {
      let index = 0;
      while ((oer.urlSource.length === 0 || oer.urlSource === '') && index < oers.length) {
        oers[index].urlSource !== (undefined || [] || '')
          ? oer = oers[index]
          : undefined
        index++;
      }
    }

    // If 
    if (oer !== undefined) {
      // If generated it only has an URL string, otherwhise it may have an array of URL
      const urlSource = Array.isArray(oer.urlSource) ? oer.urlSource[0] : oer.urlSource;

      try {
        const analyzedMaterial = await postAnalyzeMaterial(
          apiKey,
          setupModel,
          urlSource,
        );

        if (analyzedMaterial) {

          // Generate a lesson plan based on the selected resources
          const learninObjective = learningObjectiveObjects.map((objectLO: ObjectLearningObjectiveProps) => objectLO.learningObjective).join(' & ')
          console.log(learninObjective);

          const bloomLevel = mapOptionToNumber(bloomLevels[bloomLevelIndex], BloomLevelsEnum)
          console.log(bloomLevel);

          const resp = await postGenerateLessonPlan(
            apiKey, // apiKey
            setupModel, // setupModel
            analyzedMaterial.MainTopics,  // mainTopics
            analyzedMaterial.Language, // language 
            analyzedMaterial.MacroSubject,  // macroSubject
            analyzedMaterial.Title, // title
            analyzedMaterial.PerceivedDifficulty, // level
            learninObjective, // learning objective
            bloomLevel, // bloom level enum
            learningTextContext,  // learning context
            0.3 // temperature
          );

          console.log('Generate lesson plan', resp);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error("Oer is undefined!")
    }
  };

  const handleGenerateLessonPlanClick = async () => {
    try {
      // const textURL = handleExtractText("http://www.mdpi.com/books/pdfview/book/745");
      // console.log('Extracted Text:', textURL);

      await handleGenerateLessonPlan();
    } catch (error) {
      console.error('Error extracting text:', error);
    }
  }

  return (
    <Flex direction="column" rowGap={3} pt="3rem" w="100%">
      <Flex direction="row" align="center" gap={1} wrap="wrap" w="100%">
        <ShowHideButton
          showBox={showBox}
          setShowBox={setShowBox}
          // isUpDown={false}
          showButtonName="Specify the number and type of learning activities"
          fontWeight="bold"
          color="primary"
          border="none"
          letterSpacing={0}
        />
        <IconInfoCircleTooltip
          label_tooltip={`By default the number of activities is set to 4 (2 in class activities, 2 assessment activities). If no activitiy is selected, all types of exercises will be considered as possible choices.`}
        />
      </Flex>
      {showBox && (
        <Flex direction="column" rowGap={3} w="100%" pt={3}>
          <RowBoxGenLessonPlan
            numberInput={numberOfLearningActivities}
            setNumberInput={setNumberOfLearningActivities}
            isNumberZero={isNumberOfLAZero}
            setIsNumberZero={setIsNumberOfLAZero}
            defaultMenuTitle="Choose types of learning activities..."
            description="in class activities"
            dataMenu={dataLearningActivities}
            // onDataMenu={handleLearningActivitySelection}
            // onSelectionChangeMenu={handleLearningActivityChange}
            itemIndexMenu={learningActivitiesIndex}
            setItemIndexMenu={setLearningActivitiesIndex}
            isAtleastItemSelected={selectedLearningActivities}
            SetIsAtleastItemSelected={setSelectedLearningActivities}
          />
          <RowBoxGenLessonPlan
            numberInput={numberOfAssessmentActivities}
            setNumberInput={setNumberOfAssessmentActivities}
            isNumberZero={isNumberOfAAZero}
            setIsNumberZero={setIsNumberOfAAZero}
            defaultMenuTitle="Choose types of assessment activities..."
            description="assessment activities"
            dataMenu={dataAssessmentActivities}
            // onDataMenu={handleAssessmentActivitySelection}
            // onSelectionChangeMenu={handleAssessmentActivityChange}
            itemIndexMenu={assessmentActivitiesIndex}
            setItemIndexMenu={setAssessmentActivitiesIndex}
            isAtleastItemSelected={selectedAssessmentActivities}
            SetIsAtleastItemSelected={setSelectedAssessmentActivities}
          />
        </Flex>
      )}
      <Flex w="100%" justifyContent="flex-start" pt={3}>
        <GenerateLessonPlanButton
          handleGenerateLessonPlan={handleGenerateLessonPlanClick}
        // isDisabled={true}
        />
      </Flex>
    </Flex>
  );
}
