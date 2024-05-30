import { useLearningPathDesignContext } from "../../../../../Contexts/LearningPathDesignContext";
import IconEdit from "../../../../Icons/IconEdit/IconEdit";
import UnderlinedButton from "../UnderlinedButton";

type EditLessonPlanButtonProps = {
    isDisabled?: boolean;
}

export default function EditLessonPlanButton({ isDisabled }: EditLessonPlanButtonProps) {

    const { handleEditLessonPlanClick, isEditLessonPlanClicked } = useLearningPathDesignContext();

    return (
        <UnderlinedButton
            handleClick={() => handleEditLessonPlanClick(!isEditLessonPlanClicked)}
            nameButton="Edit"
            rightIcon={<IconEdit />}
            color="primary"
            fontWeight="normal"
            isDisabled={isDisabled}
        />
    );
}