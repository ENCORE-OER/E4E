import StandardButton from './StandardButton';

interface GenerateLessonPlanButtonProps {
    handleGenerateLessonPlan: () => void;
}

export default function GenerateLessonPlanButton({
    handleGenerateLessonPlan,
}: GenerateLessonPlanButtonProps) {
    //   const isDisabled = !numberOfLO || numberOfLO <= 0;
    return (
        <StandardButton
            buttonText={'Generate lesson plan'}
            handleClick={handleGenerateLessonPlan}
            //   isDisabled={isDisabled}
            w='fit-content'
        // display={'flex'}
        />
    );
}
