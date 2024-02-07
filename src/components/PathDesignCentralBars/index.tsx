import { useLearningPathDesignContext } from '../../Contexts/LearningPathDesignContext';
import CentralBars from './CentralBars';
import CentralBarsSmallerScreen from './CentralBarsSmallerScreen';

export interface PathDesignCentralBarsProps {
  collectionIndex: number;
  isNextButtonClicked: boolean;
  isSmallerScreen?: boolean;
}

export default function PathDesignCentralBars({
  collectionIndex,
  isNextButtonClicked,
  isSmallerScreen,
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
    text,
    handleSetText,
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
        />
      )}
    </>
  );
}
