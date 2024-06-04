import { FaArrowRotateLeft } from 'react-icons/fa6';
import UnderlinedButton from '../UnderlinedButtons/UnderlinedButton';

type RegenerateButtonLessonCardProps = {
  handleRegenerateClick: () => void;
  isSmallerScreen?: boolean | undefined;
  isDisabled?: boolean;
};

export default function RegenerateButtonLessonCard({
  handleRegenerateClick,
  isSmallerScreen,
  isDisabled
}: RegenerateButtonLessonCardProps) {
  return (
    <UnderlinedButton
      handleClick={handleRegenerateClick}
      isSmallerScreen={isSmallerScreen}
      nameButton={'Regenerate'}
      rightIcon={<FaArrowRotateLeft fontSize={'x-large'} color="grey" />}
      color="grey"
      fontWeight="normal"
      isDisabled={isDisabled}
    />
  );
}
