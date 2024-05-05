import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import {
  ArrayProps,
  ObjectLearningObjectiveProps,
  Option,
  SkillItemProps
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
  selectedSkillConceptsTags: SkillItemProps[];
  selectedOptions: string[];
  bloomLevelIndex: number;
  step: number;
  collectionIndex: number;
  resourceIndex: number; // Index of the selected resource in the collection
  learningObjectiveObjects: ObjectLearningObjectiveProps[];
  selectedLearningObjectiveIndex: number; // Indexes of the selected learning
  resetCheckBoxOptions: boolean;
  selectedCustomLearningObjective: string; // selected and edited learning objective in step 2 and 3
  storedLearningObjective: string; // Learning Objective stored with save button
  resetAll: boolean;
  handleResetAll: (value: boolean) => void;
  // handleApiKey: (value: string) => void;
  handleIdLearningScenario: (id: string) => void;
  setSelectedSkillConceptsTags: (newSkills: SkillItemProps[]) => void;
  handleEducatorExperienceChange: (selected: Option | null) => void;
  handleContextChange: (selected: Option | null) => void;
  handleGroupDimensionChange: (selected: Option | null) => void;
  handleLearnerExperienceChange: (selected: Option | null) => void;
  handleSetLearningTextContext: (newText: string) => void;
  handleBloomLevelChange: (bloomLevelIndex: number) => void;
  handleSkillsChange: React.Dispatch<React.SetStateAction<SkillItemProps[]>>;
  handleStepChange: (newStep: number) => void;
  handleOptionsChange: (newSelectedOptions: string[]) => void;
  setLearningObjectiveObjects: React.Dispatch<React.SetStateAction<ObjectLearningObjectiveProps[]>>;
  handleSelectedLearningObjectiveIndexChange: (index: number) => void;
  handleCollectionIndexChange: (newCollectionIndex: number) => void;
  handleResourceIndexChange: (resourceIndex: number) => void;
  handleSelectedCustomLearningObjectiveChange: (newValue: string) => void;
  handleStoredLearningObjective: () => void;
  handleLearningObjective: () => void;
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
  // Index og the selected resource in the collection
  const [resourceIndex, setResourceIndex] = useLocalStorage<number>(
    'resourceIndex',
    -1
  );

  const [bloomLevelIndex, setBloomLevelIndex] = useLocalStorage<number>(
    'bloomLevelIndex',
    -1
  );

  // Use for storage of the tags in the skill and concept selection
  const [selectedSkillConceptsTags, setSelectedSkillConceptsTags] =
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

  // Array {learningObjective: string, isSelected: boolean, isGenerated: boolean} of to store all the learning objectives (generated + added empty) 
  const [learningObjectiveObjects, setLearningObjectiveObjects] =
    useLocalStorage<ObjectLearningObjectiveProps[]>('learningObjectiveObjects', []);

  const [selectedLearningObjectiveIndex, setSelectedLearningObjectiveIndex] =
    useLocalStorage<number>('selectedLearningObjectiveIndex', -1);

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

  //bloom options selection for checkboxes
  const [currentBloomOptions, setCurrentBloomOptions] = useState<string[]>([]);

  //step selection for part of the learning objective page
  const [step, setStep] = useState<number>(0);

  //reset checkbox options when bloom level is changed
  const [resetCheckBoxOptions, setResetCheckBoxOptions] =
    useState<boolean>(false);

  // const handleApiKey = (value: string) => {
  //   setApiKey(value);
  // };

  const resetState = () => {
    handleResourceIndexChange(-1);
    setBloomLevelIndex(-1);
    // setStep(1);
    setSelectedSkillConceptsTags([]);
    setSelectedOptions([]);
    setLearningTextContext('');
    setLearningObjectiveObjects([])
    handleStepChange(0);
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

  const handleSelectedLearningObjectiveIndexChange = (index: number) => {
    // This is for the case to collect more indexes
    // if (index === -1) {
    //   setSelectedLearningObjectiveIndex([]);
    // }
    // setSelectedLearningObjectiveIndex(prevIndexes => [...prevIndexes, index]);

    setSelectedLearningObjectiveIndex(index)
  };

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

  const handleResourceIndexChange = (resourceIndex: number) => {
    setResourceIndex(resourceIndex);
  };

  //handlers for bloom level selection
  const handleBloomLevelChange = (bloomLevelIndex: number) => {
    setBloomLevelIndex(bloomLevelIndex);
    setResetCheckBoxOptions(true); // Imposta il reset a true

    // Utilizza useEffect per eseguire l'effetto collaterale dopo l'aggiornamento di stato
  };

  //handlers for tags selection
  const handleSkillsChange: React.Dispatch<
    React.SetStateAction<SkillItemProps[]>
  > = (newSkills) => {
    setSelectedSkillConceptsTags(newSkills);
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

  useEffect(() => {
    // Carica i dati dallo `localStorage` e imposta le variabili di stato
    // Usa setcollectionIndex, setBloomLevelIndex e gli altri set per impostare i valori
  }, []);

  useEffect(() => {
    // Salva le variabili nello `localStorage` quando cambiano
    // Usa setLocalStorage per salvare i valori
  }, [
    collectionIndex,
    resourceIndex,
    bloomLevelIndex,
    selectedSkillConceptsTags,
    learningTextContext,
    selectedOptions,
    selectedEducatorExperience,
    selectedContext,
    selectedGroupDimension,
    selectedLearnerExperience,
    resetCheckBoxOptions,
    step,
    currentBloomOptions,
  ]);

  useEffect(() => {
    if (collectionIndex !== -1) {
      setStep(2);
    }
  }, []);

  useEffect(() => {
    if (bloomLevelIndex !== -1) {
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
    //console.log(bloomLevelIndex);learningObjectiveTextContext
    if (bloomLevelIndex !== -1) {
      handleStepChange(2);
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
        selectedSkillConceptsTags,
        setSelectedSkillConceptsTags,
        bloomLevelIndex,
        currentBloomOptions,
        step,
        selectedOptions,
        resetCheckBoxOptions,
        collectionIndex,
        resourceIndex,
        learningObjectiveObjects,
        selectedLearningObjectiveIndex, // index of the selected learning objective in step 2
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
        handleResourceIndexChange,
        setLearningObjectiveObjects,
        handleSelectedLearningObjectiveIndexChange,
        handleSelectedCustomLearningObjectiveChange, // handler for the selected learning objective in step 2
        handleStoredLearningObjective,
        handleLearningObjective,
      }}
    >
      {children}
    </LearningPathDesignContext.Provider>
  );
};
