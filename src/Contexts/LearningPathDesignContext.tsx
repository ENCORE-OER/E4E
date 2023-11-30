import React, { createContext, useContext, useState, useEffect } from 'react';
//import { useLocalStorage } from 'usehooks-ts';
//import { useHasHydrated } from '../../utils/utils';
import { Option, ArrayProps } from '../types/encoreElements/index';
import { PathDesign } from '../types/encoreElements/index';
import { useCollectionsContext } from '../components/CollectionsContext/CollectionsContext';

//constext props
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
  bloomLevelIndex: number | null;
  step: number;
  collectionIndex: number;
  pathDesignData: PathDesign;
  resetCheckBoxOptions: boolean;
  initialCollectionTitle: string;
  initialBloomTitle: string;
  setSelectedSkillConceptsTags: (newSkills: string[]) => void;
  handleYourExperienceChange: (selected: Option) => void;
  handleContextChange: (selected: Option) => void;
  handleGroupDimensionChange: (selected: Option) => void;
  handleLeanerExperienceChange: (selected: Option) => void;
  handleSetText: (newText: string) => void;
  handleCreatePath: () => void;
  handleBloomLevelChange: (bloomLevelIndex: number) => void;
  handleSkillsChange: React.Dispatch<React.SetStateAction<string[]>>;
  handleStepChange: (newStep: number) => void;
  handleOptionsChange: (newSelectedOptions: string[]) => void;
  // handleResetStep0: () => void;
  // handleResetStep1: () => void;
  handleCollectionIndexChange: (newCollectionIndex: number) => void;
};

// create the context and export it so that it can be used in other components
export const LearningPathDesignContext =
  createContext<LearnignPathDesignContextProps>(
    {} as LearnignPathDesignContextProps
  );

// create a custom hook to use the context
export const useLearningPathDesignContext = () =>
  useContext(LearningPathDesignContext);

// create a provider to wrap the app and provide the context to all its children
export const LearningPathDesignProvider = ({ children }: any) => {
  const { collections } = useCollectionsContext();
  const DIMENSION = 30;
  const SPACING = 3;
  const bloomLevels = [
    //data for the bloomleve dropdown menu
    { name: 'Remember' },
    { name: 'Understand' },
    { name: 'Apply' },
    { name: 'Create' },
  ];

  const [initialCollectionTitle, setInitialCollectionTitle] =
    useState<string>('Select Collection');
  
  const [initialBloomTitle, setInitialBloomTitle] =
    useState<string>('Select Bloom Level');

  //data for the checkboxe menu
  const Remember: string[] = ['List', 'Recognize', 'Recall', 'Identify'];
  const Understand: string[] = ['Summarise', 'Exemplify', 'Compare', 'Explain'];
  // const Apply: string[] = ['Execute', 'Implement', 'Solve', 'Use'];
  // const Create: string[] = ['Generate', 'Plan', 'Produce', 'Design'];

  //segmented control data
  const [selectedYourExperience, setSelectedYourExperience] =
    useState<Option | null>(null);
  const [selectedContext, setSelectedContext] = useState<Option | null>(null);
  const [selectedGroupDimension, setSelectedGroupDimension] =
    useState<Option | null>(null);
  const [selectedLeanerExperience, setSelectedLeanerExperience] =
    useState<Option | null>(null);

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  //text input
  const [text, setText] = useState<string>('');

  //tags selection
  const [selectedSkillConceptsTags, setSelectedSkillConceptsTags] = useState<
    string[]
  >([]);

  //collection index selection
  const [collectionIndex, setcollectionIndex] = useState<number>(0);

  //bloom level index selection
  const [bloomLevelIndex, setBloomLevelIndex] = useState<number | null>(null);

  //bloom options selection for checkboxes
  const [currentBloomOptions, setCurrentBloomOptions] = useState<string[]>([]);

  //step selection for part of the learning objective page
  const [step, setStep] = useState<number>(0);

  const [pathDesignData, setPathDesignData] = useState<PathDesign>({
    collectionIndex: 0,
    bloomLevel: '',
    skills: [],
    verbsLearingObjective: [],
    textLearingObjective: '',
  });

  const [resetCheckBoxOptions, setResetCheckBoxOptions] =
    useState<boolean>(false);

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

  const handleCollectionTitleSelection = (newCollectionTitle:string) => {
    setInitialCollectionTitle(newCollectionTitle);
  }
  const handleBloomTitleSelection = (newBloomTitle:string) => {
    setInitialBloomTitle(newBloomTitle);
  }

  const handleCollectionIndexChange = (newCollectionIndex: number) => {
    setcollectionIndex(newCollectionIndex);
    handleCollectionTitleSelection(collections[newCollectionIndex].name);
  }

  //handlers for bloom level selection
  const handleBloomLevelChange = (bloomLevelIndex: number) => {
    setBloomLevelIndex(bloomLevelIndex);
    handleBloomTitleSelection(bloomLevels[bloomLevelIndex].name);

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

  const handleCreatePath = () => {
    if (bloomLevelIndex !== null) {
      setPathDesignData({
        collectionIndex: collectionIndex,
        bloomLevel: bloomLevels[bloomLevelIndex].name,
        skills: selectedSkillConceptsTags,
        verbsLearingObjective: selectedOptions,
        textLearingObjective: text,
      });
      console.log(pathDesignData);
    } else {
      console.error('bloomLevelIndex is null');
    }
  };

  // const handleResetStep0 = () => {
  //   setStep(0);
  //   setBloomLevelIndex(null);
  //   setSelectedSkillConceptsTags([]);
  //   setSelectedOptions([]);
  //   setText('');
  //   setSelectedYourExperience(null);
  //   setSelectedContext(null);
  //   setSelectedGroupDimension(null);
  //   setSelectedLeanerExperience(null);
  // };

  // const handleResetStep1 = () => {
  //   setStep(0);
  //   setBloomLevelIndex(null);
  //   setSelectedSkillConceptsTags([]);
  //   setSelectedOptions([]);
  //   setText('');
  // };

  useEffect(() => {
    console.log(bloomLevelIndex);
    if (bloomLevelIndex !== null) {
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
        pathDesignData,
        collectionIndex,
        initialCollectionTitle,
        initialBloomTitle,
        handleYourExperienceChange,
        handleContextChange,
        handleGroupDimensionChange,
        handleLeanerExperienceChange,
        handleSetText,
        handleCreatePath,
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
