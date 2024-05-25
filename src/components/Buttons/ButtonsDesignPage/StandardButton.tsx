import { Button, ButtonProps, Text } from '@chakra-ui/react';

interface StandardButtonProps extends ButtonProps {
  buttonText: string;
  handleClick: () => void;
}

export default function StandardButton({
  buttonText,
  handleClick,
  ...rest
}: StandardButtonProps) {
  return (
    <Button
      {...rest}
      //marginLeft={'1px'}
      //border={'1px solid'}
      // w={'100%'}
      // leftIcon={iconButton && iconButton}
      colorScheme="yellow"
      onClick={(e) => {
        e.preventDefault();
        handleClick();
      }}
      borderRadius={10}
    >
      <Text fontWeight="bold" fontSize="lg">
        {buttonText}
      </Text>
    </Button>
  );
}
