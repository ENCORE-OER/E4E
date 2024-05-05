import { Button, ButtonProps, Text } from '@chakra-ui/react';

interface AddLearningObjectiveButtonProps extends ButtonProps {
  textButton: string;
  handleClick?: () => void;
}

export default function AddLearningObjectiveButton({
  textButton,
  handleClick,
  ...rest
}: AddLearningObjectiveButtonProps) {
  return (
    <Button {...rest} variant={'primary'} onClick={handleClick}>
      <Text>{textButton}</Text>
    </Button>
  );
}
