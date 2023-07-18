import { Button, HStack, Text, VStack } from '@chakra-ui/react';
import { IconAddCircle } from '../../public/Icons/svgToIcons/iconAddCircle';

const CreatePathConceptsButton = () => {
  return (
    <Button bg="black" color="white" w="300px" h="120px" rounded={10}>
      <VStack p={3}>
        <HStack>
          <IconAddCircle stroke="white" fill="none" />
        </HStack>

        <Text whiteSpace="pre-wrap" overflowWrap="normal">
          Create a new learning path from concepts
        </Text>
      </VStack>
    </Button>
  );
};

export default CreatePathConceptsButton;
