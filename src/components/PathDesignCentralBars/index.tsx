import { useLearningPathDesignContext } from '../../Contexts/LearningPathDesignContext';
import CentralBars from './CentralBars';

export interface PathDesignCentralBarsProps {
  collectionIndex: number;
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
  bloomLevelIndex,
  isNextButtonClicked,
  // isSmallerScreen,
  bloomLevelTitleTextBox,
  skillConceptTitleTextBox,
  contextTitleTextBox,
  placeholderContextBox,
  verbsTitleTextBox,
}: PathDesignCentralBarsProps) {
  const {
    DIMENSION,
    SPACING,
    bloomLevels,
    handleBloomLevelChange,
    currentBloomOptions,
    handleOptionsChange,
    step,
    resetCheckBoxOptions,
    learningTextContext: text,
    handleSetLearningTextContext: handleSetText,
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
      text={text}
      handleText={handleSetText}
      isNextButtonClicked={isNextButtonClicked}
      collectionIndex={collectionIndex}
      bloomLevelIndex={bloomLevelIndex}
      step={step}
      bloomLevelTitleTextBox={bloomLevelTitleTextBox}
      verbsTitleTextBox={verbsTitleTextBox}
      skillConceptTitleTextBox={skillConceptTitleTextBox}
      contextTitleTextBox={contextTitleTextBox}
      placeholderContextBox={placeholderContextBox}
    />
  );
}
