import { useLearningPathDesignContext } from '../../Contexts/LearningPathDesignContext';
import CentralBars from './CentralBars';
import CentralBarsSmallerScreen from './CentralBarsSmallerScreen';

export interface PathDesignCentralBarsProps {
  collectionIndex: number;
  isNextButtonClicked: boolean;
  isSmallerScreen?: boolean;
  bloomLevelTitleTextBox: string;
  verbsTitleTextBox: string;
  bloomLevelDescriptionTextBox: string;
  skillConceptTitleTextBox: string;
  skillConceptDescriptionTextBox: string;
  contextTitleTextBox: string;
  contextDescriptionTextBox: string;
  placeholderContextBox: string;
}

export default function PathDesignCentralBars({
  collectionIndex,
  isNextButtonClicked,
  isSmallerScreen,
  bloomLevelTitleTextBox,
  skillConceptTitleTextBox,
  contextTitleTextBox,
  placeholderContextBox,
  bloomLevelDescriptionTextBox,
  verbsTitleTextBox,
  contextDescriptionTextBox,
  skillConceptDescriptionTextBox,
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
    <>
      {!isSmallerScreen && (
        <CentralBars
          SPACING={SPACING}
          DIMENSION={DIMENSION}
          bloomLevels={bloomLevels}
          handleBloomLevelChange={handleBloomLevelChange}
          currentBloomOptions={currentBloomOptions}
          handleOptionsChange={handleOptionsChange}
          resetCheckBoxOptions={resetCheckBoxOptions}
          text={text}
          handleSetText={handleSetText}
          isNextButtonClicked={isNextButtonClicked}
          collectionIndex={collectionIndex}
          step={step}
          bloomLevelTitleTextBox={bloomLevelTitleTextBox}
          verbsTitleTextBox={verbsTitleTextBox}
          bloomLevelDescriptionTextBox={bloomLevelDescriptionTextBox}
          skillConceptTitleTextBox={skillConceptTitleTextBox}
          skillConceptDescriptionTextBox={skillConceptDescriptionTextBox}
          contextTitleTextBox={contextTitleTextBox}
          contextDescriptionTextBox={contextDescriptionTextBox}
          placeholderContextBox={placeholderContextBox}
        />
      )}

      {isSmallerScreen && (
        <CentralBarsSmallerScreen
          SPACING={SPACING}
          DIMENSION={DIMENSION}
          bloomLevels={bloomLevels}
          handleBloomLevelChange={handleBloomLevelChange}
          currentBloomOptions={currentBloomOptions}
          handleOptionsChange={handleOptionsChange}
          resetCheckBoxOptions={resetCheckBoxOptions}
          text={text}
          handleSetText={handleSetText}
          isNextButtonClicked={isNextButtonClicked}
          collectionIndex={collectionIndex}
          step={step}
          isSmallerScreen={isSmallerScreen}
          bloomLevelTitleTextBox={bloomLevelTitleTextBox}
          verbsTitleTextBox={verbsTitleTextBox}
          bloomLevelDescriptionTextBox={bloomLevelDescriptionTextBox}
          skillConceptTitleTextBox={skillConceptTitleTextBox}
          skillConceptDescriptionTextBox={skillConceptDescriptionTextBox}
          contextTitleTextBox={contextTitleTextBox}
          contextDescriptionTextBox={contextDescriptionTextBox}
          placeholderContextBox={placeholderContextBox}
        />
      )}
    </>
  );
}
