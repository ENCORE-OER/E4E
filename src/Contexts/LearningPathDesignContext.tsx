import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import {
  ArrayProps,
  LessonCardProps,
  ObjectLearningObjectiveProps,
  Option,
  SkillItemProps,
} from '../types/encoreElements/index';

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
  selectedSkillConceptTags: SkillItemProps[];
  selectedOptions: string[];
  bloomLevelIndex: number;
  step: number;
  collectionIndex: number;
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
  handleBloomLevelChange: (bloomLevelIndex: number) => void;
  setSelectedSkillConceptTags: React.Dispatch<React.SetStateAction<SkillItemProps[]>>;
  handleSkillsChange: (newSkills: SkillItemProps[]) => void;
  handleStepChange: (newStep: number) => void;
  handleOptionsChange: (newSelectedOptions: string[]) => void;
  setNumberOfLO: React.Dispatch<React.SetStateAction<number>>;
  setLearningObjectiveObjects: React.Dispatch<
    React.SetStateAction<ObjectLearningObjectiveProps[]>
  >;
  // handleSelectedLearningObjectiveIndexChange: (index: number) => void;
  handleCollectionIndexChange: (newCollectionIndex: number) => void;
  setResourcesIndex: React.Dispatch<React.SetStateAction<number[]>>;
  //handleResourceIndexChange: (resourceIndex: number) => void;
  handleSelectedCustomLearningObjectiveChange: (newValue: string) => void;
  handleStoredLearningObjective: () => void;
  handleLearningObjective: () => void;

  // ====================
  // Lesson Card

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

  const [bloomLevelIndex, setBloomLevelIndex] = useLocalStorage<number>(
    'bloomLevelIndex',
    -1
  );

  // Use for storage of the tags in the skill and concept selection
  const [selectedSkillConceptTags, setSelectedSkillConceptTags] =
    useLocalStorage<SkillItemProps[]>('selectedSkillConceptsTags', []);

  // Use for storage of the text in the text input
  const [learningTextContext, setLearningTextContext] = useLocalStorage<string>(
    'text',
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

  // ========================================================
  // ----- Lesson card -----

  // Pass Fail Conditions for each Lesson Card
  // const [passFailConditions, setPassFailConditions] = useLocalStorage<PassFailConditionsProps[]>('passFailConditions', []);

  const [lessonCards, setLessonCards] = useLocalStorage<LessonCardProps[]>(
    'lessonCards',
    []
  );

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
        selectedSkillConceptTags,
        setSelectedSkillConceptTags,
        bloomLevelIndex,
        currentBloomOptions,
        step,
        selectedOptions,
        resetCheckBoxOptions,
        collectionIndex,
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
        handleBloomLevelChange,
        handleSkillsChange,
        handleStepChange,
        handleOptionsChange,
        handleCollectionIndexChange,
        setResourcesIndex,
        // handleResourceIndexChange,
        setNumberOfLO,
        setLearningObjectiveObjects,
        // handleSelectedLearningObjectiveIndexChange,
        handleSelectedCustomLearningObjectiveChange, // handler for the selected learning objective in step 2
        handleStoredLearningObjective,
        handleLearningObjective,

        // ===================
        // LESSON CARD

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
