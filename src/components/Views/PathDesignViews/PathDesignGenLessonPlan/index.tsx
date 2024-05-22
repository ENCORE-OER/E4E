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
  // const [selectedAssessmentActivities, setSelectedAssessmentActivities] = useState<boolean>(false);
  const [assessmentActivitiesIndex, setAssessmentActivitiesIndex] = useState<
    number[][]
  >([]);

  const RememberActivities: ArrayProps[] = [
    { name: 'Create a list of keywords' },
    { name: 'Memorise a list of keywords' },
    { name: 'Read material' },
    { name: 'Watch a video' },
  ];

  const UnderstandActivities: ArrayProps[] = [
    { name: 'Mind map' },
    { name: 'Summary' },
  ];

  const dataLearningActivities: MultipleArrayProps[] = [
    {
      activities: RememberActivities,
      title: 'Remember',
    },
    {
      activities: UnderstandActivities,
      title: 'Understand',
    },
  ];

  const EvaluateActivities: ArrayProps[] = [
    { name: 'Multiple choice questions' },
    { name: 'Short answer questions' },
    { name: 'True or false questions' },
    { name: 'Matching questions' },
    { name: 'Fill in the blanks' },
    { name: 'Essay questions' },
  ];

  const dataAssessmentActivities: MultipleArrayProps[] = [
    {
      activities: EvaluateActivities,
      title: 'Evaluate',
    },
  ];

  const handleActivitySelection = () => {
    setSelectedLearningActivities(true);
  };

  const handleActivityChange = (
    newIndexBloomActivity: number,
    newIndexActivity: number
  ) => {
    if (newIndexBloomActivity <= -1 && newIndexActivity <= -1) {
      setLearningActivitiesIndex([]);
      setAssessmentActivitiesIndex([]);
    } else {
      // Populate the learning activities index array until the new index bloom activity with empty arrays
      while (learningActivitiesIndex.length <= newIndexBloomActivity) {
        setLearningActivitiesIndex((prevIndex) => [...prevIndex, []]);
      }

      // Check if the learning activities index array already contains the new index bloom activity
      const updatedActivitiesIndex = learningActivitiesIndex[
        newIndexBloomActivity
      ]?.includes(newIndexActivity)
        ? learningActivitiesIndex[newIndexBloomActivity].filter(
            (index) => index !== newIndexActivity
          ) // If YES, remove the new index activity from the array
        : [...learningActivitiesIndex[newIndexBloomActivity], newIndexActivity]; // If NO, add the new index activity to the array

      // Update the learning activities index array with the new index activity
      setLearningActivitiesIndex((prevIndex) => {
        const updatedIndex = [...prevIndex];
        updatedIndex[newIndexBloomActivity] = updatedActivitiesIndex;
        return updatedIndex;
      });

      // if (learningActivitiesIndex[newIndexBloomActivity] !== undefined && learningActivitiesIndex[newIndexBloomActivity].length > 0 && learningActivitiesIndex[newIndexBloomActivity]?.includes(newIndexActivity)) {
      //     const updatedActivitiesIndex = learningActivitiesIndex[newIndexBloomActivity]?.filter(
      //         (index: number) => index !== newIndexActivity
      //     );
      //     setLearningActivitiesIndex([updatedActivitiesIndex]);
      // } else {
      //     setLearningActivitiesIndex((prevIndex: number[][]) => [
      //         ...prevIndex,
      //         [newIndexActivity],
      //     ]);
      // }
    }
  };

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
    <Flex direction="column" rowGap={3} pt="3rem" w="80%">
      <Flex>
        <ShowHideButton
          showBox={showBox}
          setShowBox={setShowBox}
          // isUpDown={false}
          showButtonName="Specify the number of activities in the lesson plan"
          fontWeight="bold"
          color="primary"
          border="none"
        />
      </Flex>
      {showBox && (
        <Flex direction="column" rowGap={3} w="100%">
          <Flex border={selectedLearningActivities ? '1px' : 'none'}>
            <RowBoxGenLessonPlan
              numberInput={numberOfLearningActivities}
              setNumberInput={setNumberOfLearningActivities}
              isNumberZero={isNumberOfLAZero}
              setIsNumberZero={setIsNumberOfLAZero}
              defaultMenuTitle="Choose types of learning activities..."
              description="in class activities"
              dataMenu={dataLearningActivities}
              onDataMenu={handleActivitySelection}
              onSelectionChangeMenu={handleActivityChange}
              itemIndexMenu={learningActivitiesIndex}
            />
          </Flex>
          <Flex>
            <RowBoxGenLessonPlan
              numberInput={numberOfAssessmentActivities}
              setNumberInput={setNumberOfAssessmentActivities}
              isNumberZero={isNumberOfAAZero}
              setIsNumberZero={setIsNumberOfAAZero}
              defaultMenuTitle="Choose types of assessment activities..."
              description="assessment activities"
              dataMenu={dataAssessmentActivities}
              onDataMenu={handleActivitySelection}
              onSelectionChangeMenu={handleActivityChange}
              itemIndexMenu={assessmentActivitiesIndex}
            />
          </Flex>
        </Flex>
      )}
      <Flex w="100%" justifyContent="flex-end">
        <GenerateLessonPlanButton
          handleGenerateLessonPlan={handleGenerateLessonPlan}
        />
      </Flex>
    </Flex>
  );
}
