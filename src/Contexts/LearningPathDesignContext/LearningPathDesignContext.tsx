import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import IconAnalytics from '../../components/Icons/IconAnalytics/IconAnalytics';
import IconFrontalLecture from '../../components/Icons/IconFrontalLecture/IconFrontalLecture';
import IconGroup from '../../components/Icons/IconGroups/IconGroup';
import IconPencilBrush from '../../components/Icons/IconPencilBrush/IconPencilBrush';
import IconPenToSquare from '../../components/Icons/IconPenToSquare/IconPenToSquare';
import IconProject from '../../components/Icons/IconProject/IconProject';
import IconQuiz from '../../components/Icons/IconQuiz/IconQuiz';
import {
  ArrayProps,
  LessonCardProps,
  LessonProps,
  ObjectLearningObjectiveProps,
  OerInCollectionProps,
  Option,
  OptionsTypeOfAssignmentProps,
  SkillItemProps,
  UploadedFilesProps,
  activityTypesObjectsProps,
} from '../../types/encoreElements/index';
import { getAllFilesByActivityIndex } from '../../utils/indexedDB';
import { CustomToast } from '../../utils/Toast/CustomToast';
import {
  isOerInCollectionProps,
  isUploadedFilesProps
} from '../../utils/utils';

// Context props
type LearnignPathDesignContextProps = {
  DIMENSION: number;
  SPACING: number;
  LANGUAGE_GEN_LO_API: string;
  TEMPERATURE_GEN_LO_API: number;
  bloomLevels: ArrayProps[];
  // apiKey: string | undefined;
  currentBloomOptions: string[];
  idLearningScenario: string;
  selectedEducatorExperience: Option | null;
  selectedContext: Option | null;
  selectedGroupDimension: Option | null;
  selectedLearnerExperience: Option | null;
  learningTextContext: string;
  defaultLearningContext: string; // Default learning context build with a prompt using selectedEducatorExperience, selectedContext, selectedGroupDimension, selectedLearnerExperience
  selectedSkillConceptTags: SkillItemProps[];
  selectedOptions: string[];
  bloomLevelIndex: number;
  step: number;
  selectedCollectionIndex: number; // Index of the selected collection in the "Learning Objective" page
  resourcesIndex: number[]; // Indexes of the selected resources in the collection
  learningObjectiveObjects: ObjectLearningObjectiveProps[];
  // selectedLearningObjectiveIndex: number; // Indexes of the selected learning
  resetCheckBoxOptions: boolean;
  MAX_LO: number; // Max number of learning objectives that an Educator can set
  MIN_LO: number; // Min number of learning objectives that an Educator can set
  numberOfLO: number; // Number of LO specified by the user
  selectedCustomLearningObjective: string; // selected and edited learning objective in step 2 and 3
  storedLearningObjective: string; // Learning Objective stored with save button
  resetAll: boolean;
  handleResetAll: (value: boolean) => void;
  // handleApiKey: (value: string) => void;
  handleIdLearningScenario: (id: string) => void;
  handleEducatorExperienceChange: (selected: Option | null) => void;
  handleContextChange: (selected: Option | null) => void;
  handleGroupDimensionChange: (selected: Option | null) => void;
  handleLearnerExperienceChange: (selected: Option | null) => void;
  handleSetLearningTextContext: (newText: string) => void;
  handleDefaultLearningContext: () => void;
  handleBloomLevelChange: (bloomLevelIndex: number) => void;
  setSelectedSkillConceptTags: React.Dispatch<
    React.SetStateAction<SkillItemProps[]>
  >;
  handleSkillsChange: (newSkills: SkillItemProps[]) => void;
  handleStepChange: (newStep: number) => void;
  handleOptionsChange: (newSelectedOptions: string[]) => void;
  setNumberOfLO: React.Dispatch<React.SetStateAction<number>>;
  setLearningObjectiveObjects: React.Dispatch<
    React.SetStateAction<ObjectLearningObjectiveProps[]>
  >;
  handleAddLearningObjective: () => void;
  handleUpdateLO: (updatedText: string, index?: number) => void;
  handleDeleteLO: (indexLO: number) => void;
  // handleSelectedLearningObjectiveIndexChange: (index: number) => void;
  handleCollectionIndexChange: (newCollectionIndex: number) => void;
  setResourcesIndex: React.Dispatch<React.SetStateAction<number[]>>;
  handleResourceChange: (newResourceIndex: number) => void;
  //handleResourceIndexChange: (resourceIndex: number) => void;
  handleSelectedCustomLearningObjectiveChange: (newValue: string) => void;
  handleStoredLearningObjective: () => void;
  handleLearningObjective: () => void;

  // ====================
  // Learning path
  titleLearningPath: string;
  setTitleLearningPath: React.Dispatch<React.SetStateAction<string>>;
  handleTitleLearningPath: (newTitle: string) => void;
  isEditLessonPlanClicked: boolean;
  handleEditLessonPlanClick: (isClicked: boolean) => void;
  handleSaveLessonPlanClick: () => void;
  editLessonIndex: number | null;
  handleEditLesson: (index: number) => void;
  handleSaveLesson: () => void;

  activityTypes: activityTypesObjectsProps[]; // Array of all the activity types
  optionsTypeOfAssignment: OptionsTypeOfAssignmentProps[]; // Array of all the lesson types
  // Lessons Activities
  totalNumberLessonActivities: number;
  // setTotalNumberLessonActivities: React.Dispatch<React.SetStateAction<number>>;
  handleNumberLessonActivities: (newNumber: number) => void;
  numberLearningActivities: number;
  // setNumberLearningActivities: React.Dispatch<React.SetStateAction<number>>;
  handleNumberLearningActivities: (newNumber: number) => void;
  numberAssessmentActivities: number;
  // setNumberAssessmentActivities: React.Dispatch<React.SetStateAction<number>>;
  handleNumberAssessmentActivities: (newNumber: number) => void;
  lessonActivities: LessonProps[];
  setLessonActivities: React.Dispatch<React.SetStateAction<LessonProps[]>>;
  addEmptyLessonActivity: () => void;
  removeLessonActivity: (index: number) => void;
  resetOersContent: (index: number) => void;
  resetFilesContent: (index: number) => void;
  handleUpdateActivityContent: (
    index: number,
    newContent: OerInCollectionProps[] | UploadedFilesProps[]
  ) => Promise<void>;

  // Add Content - Selected Oers
  resourcesSelectedAddContent: OerInCollectionProps[];
  addSelectedResourcesAddContent: (
    oers: OerInCollectionProps | OerInCollectionProps[]
  ) => void;
  removeSelectedResourceAddContent: (oer: OerInCollectionProps) => void;
  resetSelectedResourcesAddContent: () => void;

  // Add Content - Uploaded files
  uploadedFilesAddContent: UploadedFilesProps[];
  addUploadedFilesAddContent: (
    files: UploadedFilesProps | UploadedFilesProps[]
  ) => void;
  loadUploadedFiles: (activityIndex: number, isLessonView: boolean) => Promise<void>;
  removeUploadedFileAddContent: (file: UploadedFilesProps) => void;
  resetUploadedFilesAddContent: () => void;

  // Lessons Cards
  lessonCards: LessonCardProps[];
  setLessonCards: React.Dispatch<React.SetStateAction<LessonCardProps[]>>;
  handleLessonCards: (lessonCard: LessonCardProps | LessonCardProps[]) => void;

  // ====================
};

// Create the context and export it so that it can be used in other components
export const LearningPathDesignContext =
  createContext<LearnignPathDesignContextProps>(
    {} as LearnignPathDesignContextProps
  );

// Create a custom hook to use the context
export const useLearningPathDesignContext = () =>
  useContext(LearningPathDesignContext);

// Create a provider to wrap the app and provide the context to all its children
export const LearningPathDesignProvider = ({ children }: any) => {
  // const hydrated = useHasHydrated();
  const { addToast } = CustomToast();
  const DIMENSION = 30;
  const SPACING = 3;
  const LANGUAGE_GEN_LO_API = 'english';
  const TEMPERATURE_GEN_LO_API = 0.8;
  const bloomLevels = [
    { name: 'Remember' },
    { name: 'Understand' },
    { name: 'Apply' },
    { name: 'Analyze' },
    { name: 'Evaluate' },
    { name: 'Create' },
  ];

  // Data for the checkbox menu
  const Remember: string[] = ['List', 'Recognize', 'Recall', 'Identify'];
  const Understand: string[] = ['Summarise', 'Exemplify', 'Compare', 'Explain'];
  const Apply: string[] = ['Execute', 'Implement', 'Solve', 'Use'];
  const Analyze: string[] = [
    'Differentiate',
    'Organize',
    'Relate',
    'Deconstruct',
  ];
  const Evaluate: string[] = ['Check', 'Judge', 'Review', 'Test'];
  const Create: string[] = ['Build', 'Compose', 'Design', 'Develop'];

  // Use useLocalStorage to declare state variables with persistence

  // const [apiKey, setApiKey] = useLocalStorage<string | undefined>(
  //   'apiKey',
  //   undefined
  // );

  const [resetAll, setResetAll] = useLocalStorage<boolean>('resetAll', false);

  // Use to store the id of the last saved learning scenario
  const [idLearningScenario, setIdLearningScenario] = useLocalStorage<string>(
    'idLearningScenario',
    ''
  );

  // Use for storage of the collection, resource and bloom level indexes
  const [collectionIndex, setcollectionIndex] = useLocalStorage<number>(
    'collectionIndex',
    -1
  );

  // Indexes of the selected resources in the collection
  // An Educator can selected zero, one or more resources
  // This is used in LearningObective page to filter the skills and concepts
  const [resourcesIndex, setResourcesIndex] = useLocalStorage<number[]>(
    'resourceIndex',
    []
  );

  // Create this function in the LearningPathDesignContext??? This is also needed in LearningPath page???
  const handleResourceChange = (newResourceIndex: number) => {
    if (newResourceIndex > -1) {
      if (resourcesIndex.includes(newResourceIndex)) {
        const updatedResourcesIndex = resourcesIndex.filter(
          (index: number) => index !== newResourceIndex
        );
        setResourcesIndex(updatedResourcesIndex);
      } else {
        setResourcesIndex((prevIndex: number[]) => [
          ...prevIndex,
          newResourceIndex,
        ]);
      }
    } else {
      setResourcesIndex([]);
    }
  };

  const [bloomLevelIndex, setBloomLevelIndex] = useLocalStorage<number>(
    'bloomLevelIndex',
    -1
  );

  // Use for storage of the tags in the skill and concept selection
  const [selectedSkillConceptTags, setSelectedSkillConceptTags] =
    useLocalStorage<SkillItemProps[]>('selectedSkillConceptsTags', []);

  // Use for storage of the text in the text input
  const [learningTextContext, setLearningTextContext] = useLocalStorage<string>(
    'learningTextContext',
    ''
  );

  // Use for storage of the options in the verbs checkbox menu
  const [selectedOptions, setSelectedOptions] = useLocalStorage<string[]>(
    'selectedOptions',
    []
  );

  // Max and Min number of learning objectives that an Educator can hold
  const MAX_LO = 5;
  const MIN_LO = 1;

  // Number of learning objectives specified by the user with the numberInputTextBox
  const [numberOfLO, setNumberOfLO] = useLocalStorage<number>('numberOfLO', 1);

  // Array {learningObjective: string, isSelected: boolean, isGenerated: boolean} of to store all the learning objectives (generated + added empty)
  const [learningObjectiveObjects, setLearningObjectiveObjects] =
    useLocalStorage<ObjectLearningObjectiveProps[]>(
      'learningObjectiveObjects',
      []
    );

  // Function to create/add a custom learning objective
  const handleAddLearningObjective = () => {
    console.log('Adding new learning objective...');
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

  // Function to update the learning objective when the user edits it
  const handleUpdateLO = (updatedText: string, index?: number) => {
    if (index !== undefined) {
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

  const handleDeleteLO = (indexLO: number) => {
    try {
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
    } catch (error) {
      console.error(error);
    }
  };

  // const [selectedLearningObjectiveIndex, setSelectedLearningObjectiveIndex] =
  //   useLocalStorage<number>('selectedLearningObjectiveIndex', -1);

  // Used to store the learning objetive chosen by the Educator from the list of generated learning objectives
  const [selectedCustomLearningObjective, setCustomLearningObjective] =
    useLocalStorage<string>('customLearningObjective', '');

  // Learning Objective stored with save button in step 3 (learning path)
  const [storedLearningObjective, setStoredLearningObjective] =
    useLocalStorage<string>('storedLearningObjective', '');

  // Use for storage of the options in the segmented control
  const [selectedEducatorExperience, setSelectedEducatorExperience] =
    useLocalStorage<Option | null>('selectedYourExperience', null);
  const [selectedContext, setSelectedContext] = useLocalStorage<Option | null>(
    'selectedContext',
    null
  );
  const [selectedGroupDimension, setSelectedGroupDimension] =
    useLocalStorage<Option | null>('selectedGroupDimension', null);
  const [selectedLearnerExperience, setSelectedLearnerExperience] =
    useLocalStorage<Option | null>('selectedLeanerExperience', null);

  // Bloom options selection for checkboxes
  const [currentBloomOptions, setCurrentBloomOptions] = useState<string[]>([]);

  // Step selection for part of the learning objective page
  const [step, setStep] = useState<number>(0);

  // Reset checkbox options when bloom level is changed
  const [resetCheckBoxOptions, setResetCheckBoxOptions] =
    useState<boolean>(false);

  // const handleApiKey = (value: string) => {
  //   setApiKey(value);
  // };

  const resetState = () => {
    handleStepChange(0);
    // handleResourceIndexChange(-1);
    setResourcesIndex([]);
    setBloomLevelIndex(-1);
    setSelectedSkillConceptTags([]);
    setSelectedOptions([]);
    setLearningTextContext('');
    setLearningObjectiveObjects([]);
    setNumberOfLO(MIN_LO);
    setLessonActivities([]);
  };

  // Reset all the parameters. Use this with resetAll button
  const resetAllParams = () => {
    handleEducatorExperienceChange(null);
    handleLearnerExperienceChange(null);
    handleGroupDimensionChange(null);
    handleContextChange(null);
    handleCollectionIndexChange(-1); // this trigger resetState() fuction
  };

  const handleResetAll = (value: boolean) => {
    if (value) {
      // if resetAll is true, reset all the parameters
      resetAllParams();
      setResetAll(value);
    } else {
      // if resetAll is false, reset only the state of the current page
      setResetAll(value);
    }

    // resetState();
  };

  const handleIdLearningScenario = (id: string) => {
    setIdLearningScenario(id);
  };

  //handlers for segmented control
  const handleEducatorExperienceChange = (selected: Option | null) => {
    setSelectedEducatorExperience(selected);
  };
  const handleContextChange = (selected: Option | null) => {
    setSelectedContext(selected);
  };
  const handleGroupDimensionChange = (selected: Option | null) => {
    setSelectedGroupDimension(selected);
  };
  const handleLearnerExperienceChange = (selected: Option | null) => {
    setSelectedLearnerExperience(selected);
  };

  const handleOptionsChange = (newSelectedOptions: string[]) => {
    setSelectedOptions(newSelectedOptions);
  };

  // // To handle the learningObjectiveObjects
  // const handleLearningObjectiveObjects = (newLearningObjectiveObjects: ObjectLearningObjectiveProps[]) => {
  //   setLearningObjectiveObjects((prev: ObjectLearningObjectiveProps[]) => [...prev, ...newLearningObjectiveObjects])
  // }

  // const handleSelectedLearningObjectiveIndexChange = (index: number) => {
  //   // This is for the case to collect more indexes
  //   // if (index === -1) {
  //   //   setSelectedLearningObjectiveIndex([]);
  //   // }
  //   // setSelectedLearningObjectiveIndex(prevIndexes => [...prevIndexes, index]);

  //   setSelectedLearningObjectiveIndex(index);
  // };

  // Used to recover the learning objective to show from the stored learning objective
  const handleLearningObjective = () => {
    setCustomLearningObjective(storedLearningObjective);
  };

  const handleSelectedCustomLearningObjectiveChange = (newValue: string) => {
    setCustomLearningObjective(newValue);
  };

  // Used to store the learning objetive after that the Educator has clicked the save button in 'Learning Path Deisgn' page
  const handleStoredLearningObjective = () => {
    setStoredLearningObjective(selectedCustomLearningObjective);
  };

  const handleDefaultLearningContext = () => {
    handleSetLearningTextContext(defaultLearningContext);
  };

  //handlers for text input
  const handleSetLearningTextContext = (newText: string) => {
    setLearningTextContext(newText);
  };

  const handleCollectionIndexChange = (newCollectionIndex: number) => {
    setcollectionIndex(newCollectionIndex);
    resetState();
  };

  // const handleResourceIndexChange = (resourceIndex: number) => {
  //   setResourceIndex(resourceIndex);
  // };

  //handlers for bloom level selection
  const handleBloomLevelChange = (bloomLevelIndex: number) => {
    setBloomLevelIndex(bloomLevelIndex);
    setResetCheckBoxOptions(true); // Imposta il reset a true

    // Utilizza useEffect per eseguire l'effetto collaterale dopo l'aggiornamento di stato
  };

  //handlers for tags selection
  const handleSkillsChange = (newSkills: SkillItemProps[]) => {
    setSelectedSkillConceptTags(newSkills);
  };

  //handlers for step of learning objective page
  const handleStepChange = (newStep: number) => {
    setStep(newStep);
  };

  // =============================================================================================================
  // ----- Learning Path Design (Page 3) -----

  // Title learning path
  const [titleLearningPath, setTitleLearningPath] = useLocalStorage<string>(
    'titleLearningPath',
    ''
  );

  const handleTitleLearningPath = (newTitle: string) => {
    setTitleLearningPath(newTitle);
  };

  // Lesson plan Edit button click
  const [isEditLessonPlanClicked, setIsEditLessonPlanClicked] =
    useLocalStorage<boolean>('isLessonPlanEditClicked', false);

  const handleEditLessonPlanClick = (isClicked: boolean) => {
    // if (isClicked) {
    //   handleSaveLesson();
    // }
    setIsEditLessonPlanClicked(isClicked);
  };

  const handleSaveLessonPlanClick = () => {
    if (editLessonIndex !== null && !isEditLessonPlanClicked) {
      handleSaveLesson();
    } else if (isEditLessonPlanClicked) {
      if (editLessonIndex !== null) {
        handleSaveLesson();
      }
      setIsEditLessonPlanClicked(false);
    }
  };

  // State to track the index of the row currently in edit mode
  const [editLessonIndex, setEditLessonIndex] = useLocalStorage<number | null>(
    'editLessonIndex',
    null
  );

  // Function to handle initiating edit mode for a row
  const handleEditLesson = (index: number) => {
    // Set the index of the row in edit mode
    setEditLessonIndex(index);
  };

  // Function to handle saving changes and exit edit mode
  const handleSaveLesson = () => {
    // Save changes and disable edit mode
    setEditLessonIndex(null);
  };

  // Lesson

  // ========================================================
  // ----- Lessons -----

  // Data activity type
  // const activityTypes: string[] = Object.values(TypeOfActivityStringEnum);
  const activityTypes: activityTypesObjectsProps[] = [
    {
      lessonType: 'Assessment',
      activityType: 'Open Question',
      icon: <IconPenToSquare />,
    },
    {
      lessonType: 'Assessment',
      activityType: 'Short Answer Question',
      icon: <IconPenToSquare />,
    },
    {
      lessonType: 'Assessment',
      activityType: 'True or False',
      icon: <IconQuiz />,
    },
    {
      lessonType: 'Assessment',
      activityType: 'Fill in the Blanks',
      icon: <IconPenToSquare />,
    },
    {
      lessonType: 'Assessment',
      activityType: 'Single Choice',
      icon: <IconQuiz />,
    },
    {
      lessonType: 'Assessment',
      activityType: 'Multiple Choice',
      icon: <IconQuiz />,
    },
    {
      lessonType: 'Assessment',
      activityType: 'Essay',
      icon: <IconPenToSquare />,
    },
    {
      lessonType: 'Learning',
      activityType: 'Knowledge Exposition',
      icon: <IconFrontalLecture />,
    },
    { lessonType: 'Learning', activityType: 'Debate', icon: <IconGroup /> },
    {
      lessonType: 'Learning',
      activityType: 'Brainstorming',
      icon: <IconGroup />,
    },
    {
      lessonType: 'Learning',
      activityType: 'Group Discussion',
      icon: <IconGroup />,
    },
    {
      lessonType: 'Assessment',
      activityType: 'Simulation',
      icon: <IconPenToSquare />,
    },
    {
      lessonType: 'Learning',
      activityType: 'Inquiry-based Learning',
      icon: <IconGroup />,
    },
    {
      lessonType: 'Other',
      activityType: 'Non-written Material Analysis',
      icon: <IconAnalytics />,
    },
    {
      lessonType: 'Other',
      activityType: 'Non-written Material Production',
      icon: <IconPencilBrush />,
    },
    {
      lessonType: 'Assessment',
      activityType: 'Case Study Analysis',
      icon: <IconAnalytics />,
    },
    {
      lessonType: 'Learning',
      activityType: 'Project-based Learning',
      icon: <IconProject />,
    },
    {
      lessonType: 'Assessment',
      activityType: 'Problem-solving Activity',
      icon: <IconQuiz />,
    },
    {
      lessonType: 'Learning',
      activityType: 'Frontal Lecture',
      icon: <IconFrontalLecture />,
    },
  ];

  const optionsTypeOfAssignment: OptionsTypeOfAssignmentProps[] = [
    {
      name: 'Learning',
      colorBackground: 'blue.200',
    },
    {
      name: 'Assessment',
      colorBackground: 'blue.100',
    },
    {
      name: 'Other',
      colorBackground: 'gray.200',
    },
  ];

  // Pass Fail Conditions for each Lesson Card
  // const [passFailConditions, setPassFailConditions] = useLocalStorage<PassFailConditionsProps[]>('passFailConditions', []);

  const [totalNumberLessonActivities, setTotalNumberLessonActivities] =
    useLocalStorage<number>('totalNumberOfLessonActivities', 0);

  const handleNumberLessonActivities = (newNumber: number) => {
    setTotalNumberLessonActivities(newNumber);
  };

  const [numberAssessmentActivities, setNumberAssessmentActivities] =
    useLocalStorage<number>('numberAssessmentActivities', 0);

  const handleNumberAssessmentActivities = (newNumber: number) => {
    setNumberAssessmentActivities(newNumber);
  };

  const [numberLearningActivities, setNumberLearningActivities] =
    useLocalStorage<number>('numberLearningActivities', 0);

  const handleNumberLearningActivities = (newNumber: number) => {
    setNumberLearningActivities(newNumber);
  };

  // Lesson activities. General da used for both table and cards.
  const [lessonActivities, setLessonActivities] = useLocalStorage<
    LessonProps[]
  >('lessonsActivities', []);

  // Function to add a new activity
  const addEmptyLessonActivity = () => {
    const newLessonActivity: LessonProps = {
      lessonTitle: '',
      lessonType: '',
      activityType: '',
      activityDescription: '',
      timeDuration: 0,
      passFailConditions: [],
      content: {
        oers: [],
        uploadedFiles: []
      }
    };
    setLessonActivities((prevLessonActivities: LessonProps[]) => [
      ...prevLessonActivities,
      newLessonActivity,
    ]);
  };

  // Function to remove a lessonActivity from the lessonActivities array given the index
  const removeLessonActivity = (indexToRemove: number) => {
    setLessonActivities((prevLessonActivities: LessonProps[]) => {
      // Copy the array of lessonActivities excluding the element to remove
      const updatedLessonActivities = [...prevLessonActivities];
      updatedLessonActivities.splice(indexToRemove, 1);
      return updatedLessonActivities;
    });
  };

  //   function isOerInCollectionPropsArray(arr: any[]): arr is OerInCollectionProps[] {
  //     return arr.length === 0 || 'concepts' in arr[0];
  // }

  const resetOersContent = (activityIndex: number,) => {
    setLessonActivities((prevLessons: LessonProps[]) => {
      const updatedLessons = [...prevLessons];
      if (updatedLessons[activityIndex]) {
        updatedLessons[activityIndex].content.oers = []
      }
      return updatedLessons;
    });
  }

  const resetFilesContent = (activityIndex: number,) => {
    setLessonActivities((prevLessons: LessonProps[]) => {
      const updatedLessons = [...prevLessons];
      if (updatedLessons[activityIndex]) {
        updatedLessons[activityIndex].content.uploadedFiles = []
      }
      return updatedLessons;
    });
  }

  const handleUpdateActivityContent = async (
    activityIndex: number,
    newContent: OerInCollectionProps[] | UploadedFilesProps[]
  ) => {
    console.log('Updating lesson content');
    // Add new selected OERs
    if (isOerInCollectionProps(newContent)) {
      console.log('NEW CONTENT - Oers', newContent);
      try {
        setLessonActivities((prevLessons: LessonProps[]) => {
          const updatedLessons = [...prevLessons];
          if (updatedLessons[activityIndex]) {
            updatedLessons[activityIndex].content.oers = newContent
          }
          return updatedLessons;
        });
      } catch (error) {
        console.error(error);
      }
      // Add new uploaded files
    } else if (isUploadedFilesProps(newContent)) {
      console.log('Upload the file...');
      console.log('NEW CONTENT - Files', newContent);
      try {
        setLessonActivities((prevLessons: LessonProps[]) => {
          const updatedLessons = [...prevLessons];
          if (updatedLessons[activityIndex]) {
            updatedLessons[activityIndex].content.uploadedFiles = [
              // ...(updatedLessons[activityIndex].content.uploadedFiles || []),
              ...newContent.map((content: UploadedFilesProps) => ({
                fileUploaded: content.fileUploaded,
                fileName: content.fileUploaded.name,
                urlFile: content.urlFile
              }))
            ];
          }
          return updatedLessons;
        });
      } catch (error) {
        console.error(error);
      }
    }
    // else if (newContent.every((file) => file instanceof File)) {
    //   console.log('Upload the file...');
    //   console.log('NEW CONTENT', newContent);
    //   try {
    //     const newFiles: UploadedFilesProps[] = await saveMultipleFilesToIndexedDB(newContent, activityIndex);
    //     setLessonActivities((prevLessons: LessonProps[]) => {
    //       const updatedLessons = [...prevLessons];
    //       if (updatedLessons[activityIndex]) {
    //         updatedLessons[activityIndex].content.uploadedFiles = [
    //           // ...(updatedLessons[activityIndex].content.uploadedFiles || []),
    //           ...newFiles,
    //         ];
    //       }
    //       return updatedLessons;
    //     });
    //   } catch (error) {
    //     addToast({
    //       message: `Error saving the files in the database. ${error}`,
    //       type: 'error'
    //     })
    //   }
    // }
    // setLessonActivities((prevLessons: LessonProps[]) => {
    //   const updatedLessons = [...prevLessons];
    //   if (updatedLessons[lessonIndex]) {
    //     if (isOerInCollectionProps(newContent)) {
    //       updatedLessons[lessonIndex].content.oers = newContent

    //     } else if (isUploadedFilesProps(newContent)) {
    //       console.log('Upload the file...');
    //       console.log('NEW CONTENT', newContent);
    //       // updatedLessons[lessonIndex].content = {
    //       //   ...updatedLessons[lessonIndex].content,
    //       //   uploadedFiles: newContent.map((uploadedFile: UploadedFilesProps) => {
    //       //     const content: UploadedFilesProps[] = [];
    //       //     content.push({
    //       //       fileUploaded: uploadedFile.fileUploaded,
    //       //       urlFile: uploadedFile.urlFile
    //       //     })
    //       //   })
    //       // };

    //       // // Append new uploaded files
    //       // updatedLessons[lessonIndex].content.uploadedFiles = [
    //       //   ...updatedLessons[lessonIndex].content.uploadedFiles,
    //       //   ...newContent.map((uploadedFile: UploadedFilesProps) => ({
    //       //     fileUploaded: uploadedFile.fileUploaded,
    //       //     urlFile: uploadedFile.urlFile
    //       //   }))
    //       // ];
    //       updatedLessons[lessonIndex].content.uploadedFiles = newContent;
    //       console.log("UPDATED LESSONS - UPLOADED FILE", updatedLessons[lessonIndex].content.uploadedFiles);
    //     }
    //   }
    //   return updatedLessons;
    // });
  };

  // TO_CHECK: useful?
  // const handleLessonActivities = (
  //   lessonCard: LessonProps | LessonProps[]
  // ) => {
  //   if (Array.isArray(lessonCard)) {
  //     setLessonsActivities((prevLessonsActivities: LessonProps[]) => [
  //       ...prevLessonsActivities,
  //       ...lessonCard,
  //     ]);
  //   } else {
  //     setLessonsActivities((prevLessonsActivities: LessonProps[]) => [
  //       ...prevLessonsActivities,
  //       lessonCard,
  //     ]);
  //   }
  // };

  // Lesson cards(tiles)
  const [lessonCards, setLessonCards] = useLocalStorage<LessonCardProps[]>(
    'lessonCards',
    []
  );

  // TO_CHECK: useful?
  const handleLessonCards = (
    lessonCard: LessonCardProps | LessonCardProps[]
  ) => {
    if (Array.isArray(lessonCard)) {
      setLessonCards((prevLessonCards: LessonCardProps[]) => [
        ...prevLessonCards,
        ...lessonCard,
      ]);
    } else {
      setLessonCards((prevLessonCards: LessonCardProps[]) => [
        ...prevLessonCards,
        lessonCard,
      ]);
    }
  };

  // ========================================================

  // Add Content - Selected oers
  const [resourcesSelectedAddContent, setResourcesSelectedAddContent] =
    useState<OerInCollectionProps[]>([]);

  // Add selected resources to the temp view
  const addSelectedResourcesAddContent = (
    newResources: OerInCollectionProps | OerInCollectionProps[]
  ): void => {
    try {
      // Helper function to add resources to the resourcesSelectedAddContent array
      const addResources = (resourcesToAdd: OerInCollectionProps[]) => {
        // Filter out any resources that are already in the resourcesSelectedAddContent array
        const uniqueNewResources = resourcesToAdd.filter(
          (resource) =>
            !resourcesSelectedAddContent.some(
              (resourceSelected) => resourceSelected.id === resource.id
            )
        );

        // If there are unique new resources, add them to the resourcesSelectedAddContent array
        if (uniqueNewResources.length > 0) {
          setResourcesSelectedAddContent((prevResources) => [
            ...prevResources,
            ...uniqueNewResources,
          ]);
        } else {
          // Log an error if all new resources are already selected
          console.error('All new resources are already selected');
        }
      };

      // Check if newResources is an array
      if (Array.isArray(newResources)) {
        // If it is an array, call addResources with the array
        addResources(newResources);
      } else {
        // If it is a single resource, wrap it in an array and call addResources
        addResources([newResources]);
      }
    } catch (error) {
      // Log any errors that occur during the process
      console.error('An error occurred while adding resources:', error);
    }
  };

  // Remove the selected resources from the array
  const removeSelectedResourceAddContent = (
    resourceToRemove: OerInCollectionProps
  ): void => {
    try {
      setResourcesSelectedAddContent((prevResources: OerInCollectionProps[]) =>
        prevResources.filter(
          (resource: OerInCollectionProps) =>
            resource.id !== resourceToRemove.id
        )
      );
      // Update the UI or show a success notification
    } catch (error) {
      // Handle errors or show an error notificationù
      console.error(error);
    }
  };

  const resetSelectedResourcesAddContent = () => {
    if (resourcesSelectedAddContent.length > 0) {
      setResourcesSelectedAddContent([]);
    }
  };

  // Add Content - Uploaded filed
  const [uploadedFilesAddContent, setUploadedFilesAddContent] = useState<
    UploadedFilesProps[]
  >([]);

  // Add the uploaded file to the array
  const addUploadedFilesAddContent = (
    newFiles: UploadedFilesProps | UploadedFilesProps[]
  ): void => {
    try {
      // Helper function to add files to the uploadedFilesAddContent array
      const addFiles = (filesToAdd: UploadedFilesProps[]) => {
        // Filter out any files that are already in the uploadedFilesAddContent array
        const uniqueNewFiles = filesToAdd.filter(
          (newFile) =>
            !uploadedFilesAddContent.some(
              (existingFile) =>
                existingFile.fileUploaded.name === newFile.fileUploaded.name
            )
        );

        // If there are unique new files, add them to the uploadedFilesAddContent array
        if (uniqueNewFiles.length > 0) {
          setUploadedFilesAddContent((prevFiles) => [
            ...prevFiles,
            ...uniqueNewFiles,
          ]);
        } else {
          // Log an error if all new files are already added
          console.error('All new files are already added');
        }
      };

      // Check if newFiles is an array
      if (Array.isArray(newFiles)) {
        // If it is an array, call addFiles with the array
        addFiles(newFiles);
      } else {
        // If it is a single file, wrap it in an array and call addFiles
        addFiles([newFiles]);
      }
    } catch (error) {
      // Log any errors that occur during the process
      console.error('An error occurred while adding files:', error);
    }
  };


  const loadUploadedFiles = async (activityIndex: number, isLessonView: boolean) => {
    console.log("LOAD FILES...");
    try {
      const validFiles = await getAllFilesByActivityIndex(activityIndex);
      console.log("VALID FILES", validFiles);

      // We are in AddContent
      if (!isLessonView) {
        if (validFiles.length > 0) {
          addUploadedFilesAddContent(validFiles);
        }
        // We are displaying the content in the table or tiles
      } else {
        if (validFiles.length > 0) {
          await handleUpdateActivityContent(activityIndex, validFiles);
        } else {
          resetFilesContent(activityIndex);
        }
      }
    } catch (error) {
      addToast({
        message: `Error loading the files from database. ${error}`,
        type: 'error'
      })
    }
  }

  // Remove the selected file from the array
  const removeUploadedFileAddContent = (
    fileToRemove: UploadedFilesProps
  ): void => {
    try {
      setUploadedFilesAddContent((prevFiles: UploadedFilesProps[]) =>
        prevFiles.filter(
          (resource: UploadedFilesProps) =>
            resource.fileUploaded.name !== fileToRemove.fileUploaded.name
        )
      );
      // Update the UI or show a success notification
    } catch (error) {
      // Handle errors or show an error notification
      console.error(error);
    }
  };

  const resetUploadedFilesAddContent = () => {
    if (uploadedFilesAddContent.length > 0) {
      setUploadedFilesAddContent([]);
    }
  };

  // =============================================================================================================

  const defaultLearningContext = `Create a lesson plan for an educator with ${selectedEducatorExperience?.title} experience, to be used in a ${selectedContext?.title} context, for a ${selectedGroupDimension?.title} group of learners on a ${selectedLearnerExperience?.title} level.`;

  useEffect(() => {
    console.log("Lesson activities", lessonActivities);
  }, [lessonActivities]);

  useEffect(() => {
    if (resetCheckBoxOptions) {
      // Imposta il reset a false dopo l'effetto collaterale
      setResetCheckBoxOptions(false);
    }
  }, [resetCheckBoxOptions]); // Dipendenza dell'effetto collaterale

  // useEffect(() => {
  //   // Carica i dati dallo `localStorage` e imposta le variabili di stato
  //   // Usa setcollectionIndex, setBloomLevelIndex e gli altri set per impostare i valori
  // }, []);

  // useEffect(() => {
  //   // Salva le variabili nello `localStorage` quando cambiano
  //   // Usa setLocalStorage per salvare i valori
  // }, [
  //   collectionIndex,
  //   resourcesIndex,
  //   bloomLevelIndex,
  //   selectedSkillConceptsTags,
  //   learningTextContext,
  //   selectedOptions,
  //   selectedEducatorExperience,
  //   selectedContext,
  //   selectedGroupDimension,
  //   selectedLearnerExperience,
  //   resetCheckBoxOptions,
  //   step,
  //   currentBloomOptions,
  // ]);

  useEffect(() => {
    // console.log("Provo")
    if (collectionIndex > -1) {
      setStep(2);
    }
  }, []);

  useEffect(() => {
    if (bloomLevelIndex > -1) {
      handleStepChange(2);
      switch (bloomLevelIndex) {
        case 0:
          setCurrentBloomOptions(Remember);
          break;
        case 1:
          setCurrentBloomOptions(Understand);
          break;
        case 2:
          setCurrentBloomOptions(Apply);
          break;
        case 3:
          setCurrentBloomOptions(Analyze);
          break;
        case 4:
          setCurrentBloomOptions(Evaluate);
          break;
        case 5:
          setCurrentBloomOptions(Create);
          break;
        default:
          setCurrentBloomOptions([]);
      }
    }
  }, [bloomLevelIndex]);

  useEffect(() => {
    // Starting with at least one learning objective
    // This allow us to add many learning objectives how much the number specified is
    if (learningObjectiveObjects.length < numberOfLO) {
      handleAddLearningObjective();
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
    }
    // With the first "if", thispart is now useless
    // else if (learningObjectiveObjects.length === 0) {
    //   // setIsAtLeastOneLOGenerated(false);
    //   handleAddLearningObjective();
    // }
  }, [numberOfLO, learningObjectiveObjects.length]);

  // useEffect(() => {
  //   console.log(lessonActivities);
  // }, [lessonActivities]);

  useEffect(() => {
    if (defaultLearningContext.trim() !== '') {
      handleSetLearningTextContext(defaultLearningContext);
    }
  }, [defaultLearningContext]);

  // useEffect(() => {
  //   console.log('SELECTED RESOURCES: ', resourcesSelectedAddContent);
  // }, [resourcesSelectedAddContent]);

  return (
    <LearningPathDesignContext.Provider
      value={{
        DIMENSION,
        SPACING,
        LANGUAGE_GEN_LO_API,
        TEMPERATURE_GEN_LO_API,
        bloomLevels,
        // apiKey,
        idLearningScenario,
        selectedEducatorExperience,
        selectedContext,
        selectedGroupDimension,
        selectedLearnerExperience,
        learningTextContext,
        defaultLearningContext,
        selectedSkillConceptTags,
        setSelectedSkillConceptTags,
        bloomLevelIndex,
        currentBloomOptions,
        step,
        selectedOptions,
        resetCheckBoxOptions,
        selectedCollectionIndex: collectionIndex,
        resourcesIndex,
        MAX_LO,
        MIN_LO,
        numberOfLO,
        learningObjectiveObjects,
        // selectedLearningObjectiveIndex, // index of the selected learning objective in step 2
        selectedCustomLearningObjective, // selected and edited learning objective in step 2 and 3
        storedLearningObjective, // Learning Objective stored with save button
        resetAll,
        handleResetAll,
        // handleApiKey,
        handleIdLearningScenario,
        handleEducatorExperienceChange,
        handleContextChange,
        handleGroupDimensionChange,
        handleLearnerExperienceChange,
        handleSetLearningTextContext,
        handleDefaultLearningContext,
        handleBloomLevelChange,
        handleSkillsChange,
        handleStepChange,
        handleOptionsChange,
        handleCollectionIndexChange,
        setResourcesIndex,
        handleResourceChange,
        // handleResourceIndexChange,
        setNumberOfLO,
        setLearningObjectiveObjects,

        handleAddLearningObjective,
        handleUpdateLO,
        handleDeleteLO,
        // handleSelectedLearningObjectiveIndexChange,
        handleSelectedCustomLearningObjectiveChange, // handler for the selected learning objective in step 2
        handleStoredLearningObjective,
        handleLearningObjective,

        // ===================

        // Learning path
        titleLearningPath,
        setTitleLearningPath,
        handleTitleLearningPath,
        isEditLessonPlanClicked,
        handleEditLessonPlanClick,
        handleSaveLessonPlanClick,
        editLessonIndex,
        handleEditLesson,
        handleSaveLesson,

        activityTypes,
        optionsTypeOfAssignment,
        // Lessons Activities
        totalNumberLessonActivities,
        handleNumberLessonActivities,
        numberLearningActivities,
        handleNumberLearningActivities,
        numberAssessmentActivities,
        handleNumberAssessmentActivities,

        lessonActivities,
        setLessonActivities,
        addEmptyLessonActivity,
        removeLessonActivity,
        resetOersContent,
        resetFilesContent,
        handleUpdateActivityContent,

        // Add content - Oers
        resourcesSelectedAddContent,
        addSelectedResourcesAddContent,
        removeSelectedResourceAddContent,
        resetSelectedResourcesAddContent,

        // Add content - files
        uploadedFilesAddContent,
        addUploadedFilesAddContent,
        loadUploadedFiles,
        removeUploadedFileAddContent,
        resetUploadedFilesAddContent,

        // LESSONS CARDS
        lessonCards,
        setLessonCards,
        handleLessonCards,

        // ===================
      }}
    >
      {children}
    </LearningPathDesignContext.Provider>
  );
};
