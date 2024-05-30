import IconPlus from "../../../../Icons/IconPlus/IconPlus";
import UnderlinedButton from "../UnderlinedButton";

type AddActivityLessonPlanButtonProps = {
    isDisabled?: boolean;
}

export default function AddActivityLessonPlanButton({ isDisabled }: AddActivityLessonPlanButtonProps) {

    return (
        <UnderlinedButton
            handleClick={() => console.log('Add activity')}
            nameButton="Add activity"
            rightIcon={<IconPlus />}
            color="primary"
            fontWeight="normal"
            isDisabled={isDisabled}
        />
    );
}