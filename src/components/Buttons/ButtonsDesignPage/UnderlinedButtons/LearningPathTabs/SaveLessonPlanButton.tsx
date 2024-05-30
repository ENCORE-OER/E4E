import { FaSave } from "react-icons/fa";
import UnderlinedButton from "../UnderlinedButton";

type SaveLessonPlanButtonProps = {
    isDisabled?: boolean;
}

export default function SaveLessonPlanButton({ isDisabled }: SaveLessonPlanButtonProps) {

    return (
        <UnderlinedButton
            handleClick={() => console.log('Save')}
            nameButton="Save"
            rightIcon={<FaSave />}
            color="primary"
            fontWeight="normal"
            isDisabled={isDisabled}
        />
    );
}