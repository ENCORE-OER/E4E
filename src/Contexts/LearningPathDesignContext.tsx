import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { Option, ArrayProps } from '../types/encoreElements/index';

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
  const DIMENSION = 30;
  const SPACING = 3;
  const bloomLevels = [
    { name: 'Remember' },
    { name: 'Understand' },
    { name: 'Apply' },
    { name: 'Create' },
  ];

  // Load or save data in `localStorage` //todo: delete this

  // Data for the checkbox menu
  const Remember: string[] = ['List', 'Recognize', 'Recall', 'Identify'];
  const Understand: string[] = ['Summarise', 'Exemplify', 'Compare', 'Explain'];

  // Use useLocalStorage to declare state variables with persistence
  const [collectionIndex, setcollectionIndex] = useLocalStorage<number>(
    'collectionIndex',
    -1
  );
  const [bloomLevelIndex, setBloomLevelIndex] = useLocalStorage<number>(
    'bloomLevelIndex',
    -1
  );
  const [selectedSkillConceptsTags, setSelectedSkillConceptsTags] =
    useLocalStorage<string[]>('selectedSkillConceptsTags', []);
  const [text, setText] = useLocalStorage<string>('text', '');
  const [selectedOptions, setSelectedOptions] = useLocalStorage<string[]>(
    'selectedOptions',
    []
  );
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
      }}
    >
      {children}
    </LearningPathDesignContext.Provider>
  );
};
