import { CheckIcon } from '@chakra-ui/icons';
import IconEdit from '../../../Icons/IconEdit/IconEdit';
import UnderlinedButton from '../UnderlinedButton';

type EditButtonLessonCardProps = {
    isEditClicked: boolean;
    handleEditClick: () => void;
    isSmallerScreen?: boolean | undefined;
};

export default function EditButtonLessonCard({
    isEditClicked,
    handleEditClick,
    isSmallerScreen,
}: EditButtonLessonCardProps) {
    return (
        <UnderlinedButton
            handleClick={handleEditClick}
            isSmallerScreen={isSmallerScreen}
            nameButton={isSmallerScreen ? '' : isEditClicked ? 'Confirm' : 'Edit'}
            rightIcon={isEditClicked ? <CheckIcon fontSize={'x-large'} color="grey" /> : <IconEdit color="grey" />}
            color="grey"
            fontWeight="normal"
        />
    );
}
