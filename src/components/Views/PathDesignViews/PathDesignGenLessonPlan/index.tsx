import { Box, CircularProgress, Flex } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useCollectionsContext } from '../../../../Contexts/CollectionsContext/CollectionsContext';
import { useGeneralContext } from '../../../../Contexts/GeneralContext';
import { useLearningPathDesignContext } from '../../../../Contexts/LearningPathDesignContext/LearningPathDesignContext';
import {
  ArrayProps,
  BloomLevelsEnum,
  LessonProps,
  MainTopicProps,
  MultipleArrayProps,
  ObjectLearningObjectiveProps,
  OerInCollectionProps,
  OutputLessonPlanProps,
  RespAnalyzedMaterialProps,
  TypeOfActivityEnum,
} from '../../../../types/encoreElements';
import { CustomToast } from '../../../../utils/Toast/CustomToast';
import { mapNumberToString, mapOptionToNumber } from '../../../../utils/utils';
import GenerateLessonPlanButton from '../../../Buttons/ButtonsDesignPage/GenerateLessoPlanButton';
import ShowHideButton from '../../../Buttons/ShowHideButton';
import IconInfoCircleTooltip from '../../../Icons/IconInfoCircle/IconInfoCircleTooltip';
import RowBoxGenLessonPlan from './RowBoxGenLessonPlan';

type PathDesignGenLessonPlanProps = {
  handleNextClick: ({
    handleGenerationFunction,
  }: {
    handleGenerationFunction?: () => Promise<boolean>;
  }) => Promise<void>;
};

export default function PathDesignGenLessonPlan({
  handleNextClick,
}: PathDesignGenLessonPlanProps) {
  // const { chosenTargetLevel } = useCreateOERsContext();

  const {
    collectionIndex,
    resourcesIndex,
    learningObjectiveObjects,
    bloomLevelIndex,
    bloomLevels,
    learningTextContext,
    defaultLearningContext,
    handleTitleLearningPath,
    lessonActivities,
    setLessonActivities,
  } = useLearningPathDesignContext();
  const { collections } = useCollectionsContext();
  const { apiKey, setupModel, MAX_CHARS_TEXT_TO_ANALYZE } = useGeneralContext();
  const { addToast } = CustomToast();

  // Show Generate Lesson Plan area
  const [showBox, setShowBox] = useState(false); // used to show the generate lesson plan

  // const [lessonPlan, setLessonPlan] = useState<LessonProps[]>([]);  // State for store the lessonPlanFrom
  const [numberOfLearningActivities, setNumberOfLearningActivities] =
    useState<number>(2); // Number of learning activities to generate for the lesson plan
  const [numberOfAssessmentActivities, setNumberOfAssessmentActivities] =
    useState<number>(2); // Number of assessment activities to generate for the lesson plan
  const [totalNumberLessonActivities, setTotalNumberLessonActivities] =
    useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state
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
    console.log('Generating lesson plan...');
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
      addToast({
        message: `Error during lesson plan generation.`,
        type: 'error',
      });
      return [];
    }
  };

  const postAnalyzeMaterial = async (
    apiKey: string | undefined,
    setupModel: string | undefined,
    material: string
  ): Promise<RespAnalyzedMaterialProps | undefined> => {
    console.log('Analyzing material...');

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
      console.error('Error during the API call', error);
      addToast({
        message: `Error during material analyzation.`,
        type: 'error',
      });
    }
  };

  const generationLessonPlan = async (analyzedMaterial: RespAnalyzedMaterialProps): Promise<boolean> => {
    let isPlanGenerated = false;

    // Set the title of the lesson plan
    handleTitleLearningPath(analyzedMaterial.Title || '');

    // Generate a lesson plan based on the selected resources
    const learninObjective = learningObjectiveObjects
      .map(
        (objectLO: ObjectLearningObjectiveProps) =>
          objectLO.learningObjective
      )
      .join(' & ');
    console.log(learninObjective);

    const bloomLevel = mapOptionToNumber(
      bloomLevels[bloomLevelIndex],
      BloomLevelsEnum
    );
    console.log(bloomLevel);

    const generatedLessonPlan: OutputLessonPlanProps[] =
      (await postGenerateLessonPlan(
        apiKey, // apiKey
        setupModel, // setupModel
        analyzedMaterial.MainTopics, // mainTopics
        analyzedMaterial.Language, // language
        analyzedMaterial.MacroSubject, // macroSubject
        analyzedMaterial.Title, // title
        analyzedMaterial.PerceivedDifficulty, // level
        learninObjective, // learning objective
        bloomLevel, // bloom level enum
        learningTextContext || defaultLearningContext, // learning context
        0.3 // temperature
      )) || [];

    // generatedLessonPlan?.map((generatedLesson: OutputLessonPlanProps) => {
    //   const lesson: LessonProps = {
    //     lessonTitle: `${generatedLesson.Type ? '' : 'Frontal lecture'} activity`,
    //     lessonType: generatedLesson.Type ? 'Assessment' : 'Learning',
    //     activityType: `${generatedLesson.Type ? mapNumberToString(Number(generatedLesson.Details), TypeOfActivityEnum) : 'Frontal lecture'}`,
    //     activityDescription: `${generatedLesson.Type ? '' : generatedLesson.Details}`,
    //     topic: generatedLesson.Topic,
    //     timeDuration: Number(generatedLesson.Duration),
    //     passFailConditions: [],
    //   }

    //   setLessonPlan((prevLessons: LessonProps[]) => [...prevLessons, lesson])
    // })

    if (generatedLessonPlan !== undefined && generatedLessonPlan?.length > 0) {
      console.log("GENERATED LESSON PLAN");
      setLessonActivities(
        generatedLessonPlan?.map(
          (generatedLesson: OutputLessonPlanProps) => ({
            lessonTitle: `${generatedLesson.Type ? '' : 'Frontal lecture'
              } activity`,
            lessonType: generatedLesson.Type
              ? 'Assessment'
              : 'Learning',
            activityType: `${generatedLesson.Type
              ? mapNumberToString(
                Number(generatedLesson.Details),
                TypeOfActivityEnum
              )
              : 'Frontal lecture'
              }`,
            activityDescription: `${generatedLesson.Type ? generatedLesson.Topic : generatedLesson.Details
              }`,
            topic: generatedLesson.Topic,
            timeDuration: Number(generatedLesson.Duration),
            passFailConditions: [],
          })
        ) || []
      );

      isPlanGenerated = true;  // This means that 
    }

    return isPlanGenerated;
  }

  const analyzeAndPlan = async (material: string, isPossibleToContinue: boolean): Promise<boolean> => {
    let tempIsPossibleToContinue = isPossibleToContinue;
    try {
      // Analyze the url material
      const analyzedMaterial = await postAnalyzeMaterial(
        apiKey,
        setupModel,
        material
      );

      console.log(analyzedMaterial);

      // In the case the material analyzer had worked
      if (analyzedMaterial !== undefined) {
        tempIsPossibleToContinue = await generationLessonPlan(analyzedMaterial);
        console.log(tempIsPossibleToContinue);
      } else {
        throw console.error("Error with the analyzed material.")
      }
    } catch (error) {
      console.error(error);
      if (tempIsPossibleToContinue) {
        tempIsPossibleToContinue = false;
      }
    }

    return tempIsPossibleToContinue;
  }

  // const getUrlOERs = (oers: OerInCollectionProps[]): OerInCollectionProps => {
  //   console.log("SONO IN GET URL OERS");
  //   let tempOer: OerInCollectionProps = {
  //     id: 0,
  //     title: '',
  //     description: '',
  //     concepts: [],
  //     urlSource: [],
  //     generated_by_ai: false,
  //   };
  //   let index = 0;
  //   if (resourcesIndex.length > 0) {
  //     while (
  //       (tempOer.urlSource.length === 0 || tempOer.urlSource === undefined) &&   // If a OER is found we'll have at least an URL
  //       index < resourcesIndex.length
  //     ) {
  //       const tempUrlSource = oers[resourcesIndex[index]].urlSource;
  //       if (tempUrlSource !== undefined && tempUrlSource.length > 0) {
  //         tempOer = oers[resourcesIndex[index]] // At the moment take the first OER with an URL Source
  //       }
  //       index++;
  //       console.log("OER fo the GEN: ", tempOer);
  //     }
  //   } else {
  //     while (
  //       (tempOer.urlSource.length === 0 || // Only length because also if is a string the length=0 means that is an empty string
  //         tempOer.urlSource === undefined) &&
  //       index < oers.length
  //     ) {
  //       if (oers[index].urlSource !== undefined && oers[index].urlSource.length > 0) {
  //         tempOer = oers[index];
  //       }
  //       index++;
  //     }
  //   }
  //   return tempOer;
  // }

  // To get the URL of a OER.
  const getUrlOER = (oers: OerInCollectionProps[], index: number): OerInCollectionProps => {
    // To take from selected oers pass to this function ResourcesIndexes[index], otherwise only index
    console.log("SONO IN GET URL OERS");
    let tempOer: OerInCollectionProps = {
      id: 0,
      title: '',
      description: '',
      concepts: [],
      urlSource: [],
      generated_by_ai: false,
    };

    const tempUrlSource = oers[index].urlSource;
    if (tempUrlSource !== undefined && tempUrlSource.length > 0) {
      tempOer = oers[index];
    }

    return tempOer;
  }

  const getDescriptionOERs = (oers: OerInCollectionProps[]): string => {
    console.log("SONO IN GET DESCRIPTION");

    let indexDescription = 0;
    let tempDescription = '';

    // // To take only one description
    // while (
    //   oer.description === '' ||   // If an OER is found we'll have at least a description
    //   oer.description === undefined &&
    //   indexDescription < resourcesIndex.length
    // ) {
    //   const tempDescription = oers[resourcesIndex[indexDescription]].description
    //   if (tempDescription !== '' && tempDescription !== undefined) {
    //     (oer = oers[resourcesIndex[indexDescription]]) // At the moment take the first OER with a description
    //   }
    //   indexDescription++;
    //   console.log("OER for the GEN: ", oer);
    // }

    if (resourcesIndex.length > 0) {
      // Take a Text with all the descriptions
      while (
        indexDescription < resourcesIndex.length
      ) {
        const description = oers[resourcesIndex[indexDescription]]?.description;
        if (description !== '' && description !== undefined) {
          // If it is the first description to add
          if (tempDescription === '' || tempDescription === undefined) {
            // Check if chars length for AnalyzeMaterial API is respected
            if (tempDescription.length + description.length > MAX_CHARS_TEXT_TO_ANALYZE) {
              console.log("TEXT TOO BIG. EXIT FROM LOOP");
              indexDescription = resourcesIndex.length;  // Exit from the loop 
            } else {
              tempDescription = oers[resourcesIndex[indexDescription]].description;
              indexDescription++;
            }
            // If it's not the first description to add
          } else {
            const newDescription = " & " + description;
            // Check if chars length for AnalyzeMaterial API is respected
            if (tempDescription.length + newDescription.length > MAX_CHARS_TEXT_TO_ANALYZE) {
              indexDescription = resourcesIndex.length;  // Exit from the loop 
            } else {
              tempDescription += " & " + oers[resourcesIndex[indexDescription]].description; // Add every description
              indexDescription++;
            }
          }
        }
        console.log("DESCRIPTIONS TEXT: ", tempDescription);
        indexDescription++
      }

    } else {
      // No selected resources

      while (
        indexDescription < oers.length
      ) {
        const description = oers[indexDescription]?.description;
        if (description !== '' && description !== undefined) {
          // If it is the first description to add
          if (tempDescription === '' || tempDescription === undefined) {
            // Check if chars length for AnalyzeMaterial API is respected
            if (tempDescription.length + description.length > MAX_CHARS_TEXT_TO_ANALYZE) {
              console.log("TEXT TOO BIG. EXIT FROM LOOP");
              indexDescription = oers.length;  // Exit from the loop 
            } else {
              tempDescription = oers[indexDescription].description;
              indexDescription++;
            }
            // If it's not the first description to add
          } else {
            const newDescription = " & " + description;
            // Check if chars length for AnalyzeMaterial API is respected
            if (tempDescription.length + newDescription.length > MAX_CHARS_TEXT_TO_ANALYZE) {
              indexDescription = oers.length;  // Exit from the loop 
            } else {
              tempDescription += " & " + oers[indexDescription].description; // Add every description
              indexDescription++;
            }
          }
        }
        console.log("DESCRIPTIONS TEXT: ", tempDescription);
        indexDescription++
      }
    }

    return tempDescription;
  }

  const getUrlAnalyzeAndPlan = async (oers: OerInCollectionProps[], selectedResources?: number[]): Promise<boolean> => {
    let isPossibleToContinue = false;
    let indexAnalyzeMaterial = 0;
    const maxLength = selectedResources !== undefined ? selectedResources.length : oers.length;
    try {
      // Try one by one if there is an URl that works
      while (isPossibleToContinue === undefined && indexAnalyzeMaterial < maxLength) {

        // Get the URL of the OER
        const oer = getUrlOER(oers, selectedResources !== undefined ? selectedResources[indexAnalyzeMaterial] : indexAnalyzeMaterial);

        // If an URL is been found
        if (oer !== undefined && oer.urlSource.length > 0 && oer.urlSource !== undefined) {
          console.log(oer.urlSource);
          console.log("Oer not undefined!");

          // If generated, it only has an URL string, otherwhise it may have an array of URL
          const urlSource = Array.isArray(oer.urlSource)
            ? oer.urlSource[0]
            : oer.urlSource;

          console.log(urlSource);

          isPossibleToContinue = await analyzeAndPlan(urlSource, isPossibleToContinue);
        }

        indexAnalyzeMaterial++;
      }

      // If no oers url useful for analyze the material try with the descriptions
      if (!isPossibleToContinue) {

        let descriptionsTextToAnalyze = '';

        // Get the descriptions
        descriptionsTextToAnalyze = getDescriptionOERs(oers);
        console.log("SONO USCITO DA GET DESCRIPTION");

        // If the getted descriptions string is not empty
        if (descriptionsTextToAnalyze !== '' && descriptionsTextToAnalyze !== undefined) {

          console.log("Descriptions Text to Analyze is not EMPTY!");

          isPossibleToContinue = await analyzeAndPlan(descriptionsTextToAnalyze, isPossibleToContinue);
        }
      }
    } catch (error) {
      console.error(error);
      if (isPossibleToContinue) {
        isPossibleToContinue = false;
      }
    }

    return isPossibleToContinue;
  }

  // TODO: take only a description from an OER if it useful
  // const getDescriptionOER = (oer: OerInCollectionProps, oers: OerInCollectionProps[], indexDescription: number): string => {
  //   let tempDescription = '';

  //   return tempDescription
  // }

  const generationEmptyLessonPlan = () => {
    const tempLessonsActivities: LessonProps[] = [];
    for (let i = 0; i < numberOfLearningActivities; i++) {
      tempLessonsActivities.push({
        lessonTitle: '',
        lessonType: 'Learning',
        activityType: '',
        activityDescription: '',
        topic: '',
        timeDuration: 0,
        passFailConditions: [],
      });
    }
    for (let i = 0; i < numberOfAssessmentActivities; i++) {
      tempLessonsActivities.push({
        lessonTitle: '',
        lessonType: 'Assessment',
        activityType: '',
        activityDescription: '',
        topic: '',
        timeDuration: 0,
        passFailConditions: [],
      });
    }
    setLessonActivities(tempLessonsActivities);
  }

  const handleGenerateLessonPlan = async (): Promise<boolean> => {
    console.log('SONO IN HANDLE GENERATE LESSON PLAN');
    let isPossibleToContinue = false;
    try {
      const oers = collections[collectionIndex]?.oers;
      // Analyze selected resources
      // let oer: OerInCollectionProps = {
      //   id: 0,
      //   title: '',
      //   description: '',
      //   concepts: [],
      //   urlSource: [],
      //   generated_by_ai: false,
      // };

      // let descriptionsTextToAnalyze: string = '';
      // let analyzedMaterial: RespAnalyzedMaterialProps | undefined = undefined;
      // let indexAnalyzeMaterial = 0;

      // If at least a resource is selected
      if (resourcesIndex.length > 0) {
        console.log("RESOURCES SELECTED");

        isPossibleToContinue = await getUrlAnalyzeAndPlan(oers, resourcesIndex);

      } else {
        // If no resources are selected takes directly from the collection
        console.log("NO RESOURCES SELECTED!");
        isPossibleToContinue = await getUrlAnalyzeAndPlan(oers);

      }

      // // If there is oer with url
      // if (oer !== undefined && oer.urlSource.length > 0 && oer.urlSource !== undefined) {
      //   console.log(oer.urlSource);
      //   console.log("Oer not undefined!");

      //   // If generated it only has an URL string, otherwhise it may have an array of URL
      //   const urlSource = Array.isArray(oer.urlSource)
      //     ? oer.urlSource[0]
      //     : oer.urlSource;

      //   console.log(urlSource);

      //   try {
      //     const analyzedMaterial = await postAnalyzeMaterial(
      //       apiKey,
      //       setupModel,
      //       urlSource
      //     );

      //     console.log(analyzedMaterial);

      //     if (analyzedMaterial !== undefined) {
      //       isPossibleToContinue = await generationLessonPlan(analyzedMaterial);
      //     } else {
      //       throw console.error("Error with the analyzed material.")
      //     }
      //   } catch (error) {
      //     console.error(error);
      //     if (isPossibleToContinue) {
      //       isPossibleToContinue = false;
      //     }
      //   }
      //   // Try using the oers descriptions
      // } else 
      // if (descriptionsTextToAnalyze !== '' && descriptionsTextToAnalyze !== undefined) {

      //   console.log("Descriptions Text to Analyze is not EMPTY!");

      //   try {
      //     const analyzedMaterial = await postAnalyzeMaterial(
      //       apiKey,
      //       setupModel,
      //       descriptionsTextToAnalyze
      //     );

      //     console.log(analyzedMaterial);

      //     if (analyzedMaterial !== undefined) {
      //       isPossibleToContinue = await generationLessonPlan(analyzedMaterial);
      //     } else {
      //       throw console.error("Error with the analyzed material.")
      //     }
      //   } catch (error) {
      //     console.error(error);
      //     if (isPossibleToContinue) {
      //       isPossibleToContinue = false;
      //     }
      //   }
      // } else {
      //   console.error('No OERs usable to generate a Lesson Plan!');
      //   if (isPossibleToContinue) {
      //     isPossibleToContinue = false;
      //   }
      //   addToast({
      //     message: 'No OERs usable to generate a Lesson Plan.',
      //     type: 'error',
      //   });
      // }

    } catch (error) {
      console.error(error);
      if (isPossibleToContinue) {
        isPossibleToContinue = false;
      }
      addToast({
        message: `Error during lesson plan generation.`,
        type: 'error',
      });
    } finally {
      if (!isPossibleToContinue) {
        generationEmptyLessonPlan();
      }
      return isPossibleToContinue;
    }
  };

  const handleGenerateLessonPlanClick = async () => {
    setIsLoading(true);
    try {
      // const textURL = handleExtractText("http://www.mdpi.com/books/pdfview/book/745");
      // console.log('Extracted Text:', textURL);
      await handleNextClick({
        handleGenerationFunction: () => handleGenerateLessonPlan(),
      });
      // await handleGenerateLessonPlan();
    } catch (error) {
      console.error('Error generating the lesson plan:', error);
      addToast({
        message: `Error generating the lesson plan: ${error}.`,
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (
      numberOfAssessmentActivities + numberOfLearningActivities !=
      totalNumberLessonActivities
    ) {
      setTotalNumberLessonActivities(
        numberOfAssessmentActivities + numberOfLearningActivities
      );
    }
  }, [numberOfAssessmentActivities, numberOfLearningActivities]);

  useEffect(() => {
    console.log(lessonActivities);
  }, [lessonActivities]);

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
      <Flex w="100%" justifyContent="flex-start" pt={3} direction="row">
        <GenerateLessonPlanButton
          handleGenerateLessonPlan={handleGenerateLessonPlanClick}
          isDisabled={isLoading}
        />
        {isLoading && (
          <Box ml={4}>
            <CircularProgress isIndeterminate color="yellow.400" />
          </Box>
        )}
      </Flex>
    </Flex>
  );
}
