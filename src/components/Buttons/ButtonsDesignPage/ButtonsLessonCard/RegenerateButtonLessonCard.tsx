import { FaArrowRotateLeft } from 'react-icons/fa6';
import UnderlinedButton from '../UnderlinedButton';

type RegenerateButtonLessonCardProps = {
  handleRegenerateClick: () => void;
  isSmallerScreen?: boolean | undefined;
};

export default function RegenerateButtonLessonCard({
  handleRegenerateClick,
  isSmallerScreen,
}: RegenerateButtonLessonCardProps) {
  return (
    <UnderlinedButton
      handleClick={handleRegenerateClick}
      isSmallerScreen={isSmallerScreen}
      nameButton={'Regenerate'}
      rightIcon={<FaArrowRotateLeft fontSize={'x-large'} color="grey" />}
      color="grey"
      fontWeight="normal"
    />
  );
}
