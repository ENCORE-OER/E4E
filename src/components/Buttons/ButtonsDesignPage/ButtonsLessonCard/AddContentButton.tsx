import { Button, ButtonProps } from '@chakra-ui/react';

export default function AddContentButton({ ...rest }: ButtonProps) {
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
      Add Content
    </Button>
  );
}
