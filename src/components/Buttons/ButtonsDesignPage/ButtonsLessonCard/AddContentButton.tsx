import { Button, ButtonProps } from '@chakra-ui/react';

interface AddContentButtonProps extends ButtonProps {
  nameButton?: string;
}

export default function AddContentButton({ nameButton, ...rest }: AddContentButtonProps) {
  return (
    <Button
      {...rest}
      variant="solid"
      // px={7}
      bg="gray.300"
      // onClick={handleAddContentClick}
      borderRadius="lg"
    // fontSize="small"
    // size={'sm'}
    >
      {nameButton || 'Add Content'}
    </Button>
  );
}
