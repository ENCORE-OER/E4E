import { Button } from '@chakra-ui/react';
import IconVerticalPoints from '../../../Icons/IconVerticalPoints/IconVerticalPoints';

export default function ActionButton() {
  return (
    <Button shadow={'none'} bg="none" w="fit-content">
      <IconVerticalPoints />
    </Button>
  );
}
