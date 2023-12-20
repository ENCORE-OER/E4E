import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { ArrayProps, Option } from '../types/encoreElements/index';
import { useHasHydrated } from '../utils/utils';

// Context props
type LearnignPathDesignContextProps = {
  DIMENSION: number;
  SPACING: number;
  bloomLevels: ArrayProps[];
  currentBloomOptions: string[];
  selectedYourExperience: Option | null;
  selectedContext: Option | null;
  selectedGroupDimension: Option | null;
  selectedLeanerExperience: Option | null;
  text: string;
  selectedSkillConceptsTags: string[];
  selectedOptions: string[];
  bloomLevelIndex: number;
  step: number;
  collectionIndex: number;
  resetCheckBoxOptions: boolean;
  learningObjective: string | null;
  customLearningObjective: string | null;
  storedLearningObjective: string | null;
  setSelectedSkillConceptsTags: (newSkills: string[]) => void;
  handleYourExperienceChange: (selected: Option) => void;
  handleContextChange: (selected: Option) => void;
  handleGroupDimensionChange: (selected: Option) => void;
  handleLeanerExperienceChange: (selected: Option) => void;
  handleSetText: (newText: string) => void;
  handleBloomLevelChange: (bloomLevelIndex: number) => void;
  handleSkillsChange: React.Dispatch<React.SetStateAction<string[]>>;
  handleStepChange: (newStep: number) => void;
  handleOptionsChange: (newSelectedOptions: string[]) => void;
  handleCollectionIndexChange: (newCollectionIndex: number) => void;
  handleLearningObjective: () => void;
  handleCustomLearningObjective: (newCustomLearningObjective: string) => void;
  handleStoredLearningObjective: (newStoredLearningObjective: string) => void;
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
  const hydrated = useHasHydrated();
  const DIMENSION = 30;
  const SPACING = 3;
  const bloomLevels = [
    { name: 'Remember' },
    { name: 'Understand' },
    { name: 'Apply' },
    { name: 'Create' },
  ];

  // Data for the checkbox menu
  const Remember: string[] = ['List', 'Recognize', 'Recall', 'Identify'];
  const Understand: string[] = ['Summarise', 'Exemplify', 'Compare', 'Explain'];

  // Use useLocalStorage to declare state variables with persistence

  // Use for storage of the collection and bloom level indexes
  const [collectionIndex, setcollectionIndex] = useLocalStorage<number>(
    'collectionIndex',
    -1
  );
  const [bloomLevelIndex, setBloomLevelIndex] = useLocalStorage<number>(
    'bloomLevelIndex',
    -1
  );

  // Use for storage of the tags in the skill and concept selection
  const [selectedSkillConceptsTags, setSelectedSkillConceptsTags] =
    useLocalStorage<string[]>('selectedSkillConceptsTags', []);

  // Use for storage of the text in the text input
  const [text, setText] = useLocalStorage<string>('text', '');

  // Use for storage of the options in the checkbox menu
  const [selectedOptions, setSelectedOptions] = useLocalStorage<string[]>(
    'selectedOptions',
    []
  );

  const [learningObjective, setLearningObjective] = useState<string | null>(null);
  const [customLearningObjective, setCustomLearningObjective] = useLocalStorage<string | null>('customLearningObjective', null);
  const [storedLearningObjective, setStoredLearningObjective] = useLocalStorage<string | null>('storedLearningObjective', null);

  // Use for storage of the options in the segmented control
  const [selectedYourExperience, setSelectedYourExperience] =
    useLocalStorage<Option | null>('selectedYourExperience', null);
  const [selectedContext, setSelectedContext] = useLocalStorage<Option | null>(
    'selectedContext',
    null
  );
  const [selectedGroupDimension, setSelectedGroupDimension] =
    useLocalStorage<Option | null>('selectedGroupDimension', null);
  const [selectedLeanerExperience, setSelectedLeanerExperience] =
    useLocalStorage<Option | null>('selectedLeanerExperience', null);

  //bloom options selection for checkboxes
  const [currentBloomOptions, setCurrentBloomOptions] = useState<string[]>([]);

  //step selection for part of the learning objective page
  const [step, setStep] = useState<number>(0);

  //reset checkbox options when bloom level is changed
  const [resetCheckBoxOptions, setResetCheckBoxOptions] =
    useState<boolean>(false);

  const resetState = () => {
    setBloomLevelIndex(-1);
    // setStep(1);
    setSelectedSkillConceptsTags([]);
    setSelectedOptions([]);
    setText('');
  };

  //handlers for segmented control
  const handleYourExperienceChange = (selected: Option) => {
    setSelectedYourExperience(selected);
  };
  const handleContextChange = (selected: Option) => {
    setSelectedContext(selected);
  };
  const handleGroupDimensionChange = (selected: Option) => {
    setSelectedGroupDimension(selected);
  };
  const handleLeanerExperienceChange = (selected: Option) => {
    setSelectedLeanerExperience(selected);
  };

  const handleOptionsChange = (newSelectedOptions: string[]) => {
    setSelectedOptions(newSelectedOptions);
  };

  const handleLearningObjective = () => {
    const principleOfSkills = hydrated && selectedSkillConceptsTags ? selectedSkillConceptsTags.join(' ') : '';
    const selectedOptionsText = hydrated && selectedOptions ? selectedOptions.join(' and ') : '';
    const learningObjectiveText = hydrated ? text : '';

    const learningObjective = `List key principles of ${principleOfSkills} ${selectedOptionsText} ${learningObjectiveText}`;

    setLearningObjective(learningObjective);
  }

  const handleCustomLearningObjective = (newCustomLearningObjective: string) => {
    if (newCustomLearningObjective === null || newCustomLearningObjective === '') {
      setCustomLearningObjective(learningObjective);
    } else {
      setCustomLearningObjective(newCustomLearningObjective);
    }
  }

  const handleStoredLearningObjective = (newStoredLearningObjective: string) => {
    setStoredLearningObjective(newStoredLearningObjective);
  }


  //handlers for text input
  const handleSetText = (newText: string) => {
    setText(newText);
  };

  const handleCollectionIndexChange = (newCollectionIndex: number) => {
    setcollectionIndex(newCollectionIndex);
    resetState();
  };

  //handlers for bloom level selection
  const handleBloomLevelChange = (bloomLevelIndex: number) => {
    setBloomLevelIndex(bloomLevelIndex);
    setResetCheckBoxOptions(true); // Imposta il reset a true

    // Utilizza useEffect per eseguire l'effetto collaterale dopo l'aggiornamento di stato
  };

  useEffect(() => {
    if (resetCheckBoxOptions) {
      // Imposta il reset a false dopo l'effetto collaterale
      setResetCheckBoxOptions(false);
    }
  }, [resetCheckBoxOptions]); // Dipendenza dell'effetto collaterale

  //handlers for tags selection
  const handleSkillsChange: React.Dispatch<React.SetStateAction<string[]>> = (
    newSkills
  ) => {
    setSelectedSkillConceptsTags(newSkills);
  };

  //handlers for step of learning objective page
  const handleStepChange = (newStep: number) => {
    setStep(newStep);
  };

  useEffect(() => {
    // Carica i dati dallo `localStorage` e imposta le variabili di stato
    // Usa setcollectionIndex, setBloomLevelIndex e gli altri set per impostare i valori
  }, []);

  useEffect(() => {
    // Salva le variabili nello `localStorage` quando cambiano
    // Usa setLocalStorage per salvare i valori
  }, [
    collectionIndex,
    bloomLevelIndex,
    selectedSkillConceptsTags,
    text,
    selectedOptions,
    selectedYourExperience,
    selectedContext,
    selectedGroupDimension,
    selectedLeanerExperience,
    resetCheckBoxOptions,
    step,
    currentBloomOptions,
  ]);

  useEffect(() => {
    handleLearningObjective();
    if (storedLearningObjective !== null) setCustomLearningObjective(storedLearningObjective);
    else if (learningObjective !== null)    handleCustomLearningObjective(learningObjective);
  }, [learningObjective]);

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
        // case 2:
        //   setCurrentBloomOptions(Apply);
        //   break;
        // case 3:
        //   setCurrentBloomOptions(Create);
        //   break;
        default:
          setCurrentBloomOptions([]);
      }
    }
  }, [bloomLevelIndex]);

  useEffect(() => {
    //console.log(bloomLevelIndex);
    if (bloomLevelIndex !== -1) {
      handleStepChange(2);
    }
  }, [bloomLevelIndex]);

  return (
    <LearningPathDesignContext.Provider
      value={{
        DIMENSION,
        SPACING,
        bloomLevels,
        selectedYourExperience,
        selectedContext,
        selectedGroupDimension,
        selectedLeanerExperience,
        text,
        selectedSkillConceptsTags,
        setSelectedSkillConceptsTags,
        bloomLevelIndex,
        currentBloomOptions,
        step,
        selectedOptions,
        resetCheckBoxOptions,
        collectionIndex,
        learningObjective,
        customLearningObjective,
        storedLearningObjective,
        handleYourExperienceChange,
        handleContextChange,
        handleGroupDimensionChange,
        handleLeanerExperienceChange,
        handleSetText,
        handleBloomLevelChange,
        handleSkillsChange,
        handleStepChange,
        handleOptionsChange,
        //handleResetStep0,
        //handleResetStep1,
        handleCollectionIndexChange,
        handleLearningObjective,
        handleCustomLearningObjective,
        handleStoredLearningObjective,
      }}
    >
      {children}
    </LearningPathDesignContext.Provider>
  );
};
