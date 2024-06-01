import StandardButton from './StandardButton';

interface GenerateLessonPlanButtonProps {
  handleGenerateLessonPlan: () => void;
  isDisabled?: boolean;
}

export default function GenerateLessonPlanButton({
  handleGenerateLessonPlan,
  isDisabled,
}: GenerateLessonPlanButtonProps) {
  //   const isDisabled = !numberOfLO || numberOfLO <= 0;
  return (
    <StandardButton
      buttonText={'Generate lesson plan'}
      handleClick={handleGenerateLessonPlan}
      //   isDisabled={isDisabled}
      w="fit-content"
      // display={'flex'}
      isDisabled={isDisabled}
    />
  );
}
