import { Flex } from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { useCreateOERsContext } from '../../../../Contexts/CreateOERsContext';
import {
  ArrayProps,
  MainTopicProps,
  MultipleArrayProps,
  OutputLessonPlanProps,
} from '../../../../types/encoreElements';
import GenerateLessonPlanButton from '../../../Buttons/ButtonsDesignPage/GenerateLessoPlanButton';
import ShowHideButton from '../../../Buttons/ShowHideButton';
import IconInfoCircleTooltip from '../../../Icons/IconInfoCircle/IconInfoCircleTooltip';
import RowBoxGenLessonPlan from './RowBoxGenLessonPlan';

export default function PathDesignGenLessonPlan() {
  const { chosenTargetLevel } = useCreateOERsContext();

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
    apiKey: string,
    setupModel: string,
    maintopics: MainTopicProps[],
    language: string,
    macroSubjects: string,
    title: string,
    level: number,
    learningobjective: string,
    bloomLevel: number,
    context: string,
    temperature: number
  ): Promise<OutputLessonPlanProps[]> => {
    try {
      const resp = await axios.post(
        '/api/encore/genAI/generateLessonPlan',
        {
          mainTopics: maintopics,
          language: language,
          macroSubjects: macroSubjects,
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

  const handleGenerateLessonPlan = async () => {
    const resp = await postGenerateLessonPlan(
      'apiKey',
      'setupModel',
      [{ Topic: 'maintopics', Type: 2, Description: '' }],
      'language',
      'macroSubjects',
      'title',
      chosenTargetLevel || 0,
      'learningobjective',
      0,
      'context',
      0.3
    );

    console.log('Generate lesson plan', resp);
  };

  return (
    <Flex direction="column" rowGap={3} pt="3rem" w="100%">
      <Flex direction="row" align="center" gap={1} wrap="wrap" w="100%"
      >
        <ShowHideButton
          showBox={showBox}
          setShowBox={setShowBox}
          // isUpDown={false}
          showButtonName="Specify the number of activities in the lesson plan"
          fontWeight="bold"
          color="primary"
          border="none"
          letterSpacing={0}
        />
        <IconInfoCircleTooltip
          label_tooltip={`If no activities are selected, all activities will be considered as possible choices.`}
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
          handleGenerateLessonPlan={handleGenerateLessonPlan}
        />
      </Flex>
    </Flex>
  );
}
