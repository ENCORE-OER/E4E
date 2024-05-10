import { Button, ButtonProps } from '@chakra-ui/react';

type DeselectAllButtonProps = {
  handleClick: () => void;
} & ButtonProps;

export default function DeselectAllButton({
  handleClick,
  ...rest
}: DeselectAllButtonProps) {
  return (
    // <Flex w='100%' justifyContent={'flex-end'} px={2} py={1} align='center'>
    <Button
      {...rest}
      onClick={(e) => {
        // console.log('delete all')
        e.preventDefault();
        handleClick();
      }}
      fontSize="small"
      variant="link"
      border="none"
      textDecoration="underline"
      _hover={{ color: '#FFCC49' }}
    >
      Deselect All
    </Button>
    //   </Flex>
  );
}
