import { useLearningPathDesignContext } from '../../../../Contexts/LearningPathDesignContext';
import CentralBars from './CentralBars';

export interface PathDesignCentralBarsProps {
  collectionIndex: number;
  resourcesIndex: number[];
  bloomLevelIndex: number;
  isNextButtonClicked: boolean;
  isSmallerScreen?: boolean;
  bloomLevelTitleTextBox: string;
  verbsTitleTextBox: string;
  skillConceptTitleTextBox: string;
  contextTitleTextBox: string;
  placeholderContextBox: string;
}

export default function PathDesignCentralBars({
  collectionIndex,
  resourcesIndex,
  bloomLevelIndex,
  isNextButtonClicked,
  // isSmallerScreen,
  bloomLevelTitleTextBox,
  skillConceptTitleTextBox,
  contextTitleTextBox,
  placeholderContextBox,
  verbsTitleTextBox,
}: PathDesignCentralBarsProps) {
  // TODO: make a choice. Or all with the context or all in PathDesignCentralBarsProps
  const {
    DIMENSION,
    SPACING,
    bloomLevels,
    handleBloomLevelChange,
    currentBloomOptions,
    handleOptionsChange,
    step,
    resetCheckBoxOptions,
    learningTextContext,
    handleSetLearningTextContext,
    selectedEducatorExperience,
    selectedContext,
    selectedGroupDimension,
    selectedLearnerExperience
  } = useLearningPathDesignContext();

  return (
    <CentralBars
      SPACING={SPACING}
      DIMENSION={DIMENSION}
      bloomLevels={bloomLevels}
      handleBloomLevelChange={handleBloomLevelChange}
      currentBloomOptions={currentBloomOptions}
      handleOptionsChange={handleOptionsChange}
      resetCheckBoxOptions={resetCheckBoxOptions}
      learningTextContext={learningTextContext}
      handleSetLearningTextContext={handleSetLearningTextContext}
      isNextButtonClicked={isNextButtonClicked}
      collectionIndex={collectionIndex}
      resourcesIndex={resourcesIndex}
      bloomLevelIndex={bloomLevelIndex}
      step={step}
      bloomLevelTitleTextBox={bloomLevelTitleTextBox}
      verbsTitleTextBox={verbsTitleTextBox}
      skillConceptTitleTextBox={skillConceptTitleTextBox}
      contextTitleTextBox={contextTitleTextBox}
      placeholderContextBox={placeholderContextBox}
      selectedEducatorExperience={selectedEducatorExperience}
      selectedContext={selectedContext}
      selectedGroupDimension={selectedGroupDimension}
      selectedLearnerExperience={selectedLearnerExperience}
    />
  );
}
