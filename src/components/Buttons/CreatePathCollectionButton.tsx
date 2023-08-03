import { Button, HStack, Text, VStack } from '@chakra-ui/react';
import { IconAddCircle } from '../../public/Icons/svgToIcons/iconAddCircle';
import { IconBookmarkCheckCustom } from '../../public/Icons/svgToIcons/iconBookmarkCheckCustom';

type CreatePathCollectionButtonProps = {
  onClick: React.MouseEventHandler;
};

const CreatePathCollectionButton: React.FC<CreatePathCollectionButtonProps> = ({
  onClick,
}: CreatePathCollectionButtonProps) => {
  return (
    <Button
      bg="black"
      color="white"
      w="300px"
      h="120px"
      rounded={10}
      onClick={onClick}
    >
      <VStack p={3}>
        <HStack>
          <IconAddCircle stroke="white" fill="none" />
          <IconBookmarkCheckCustom
            stroke="white"
            fillCheck="white"
            w="40px"
            h="40px"
            strokeWidthBorder="1"
          />
        </HStack>
        <Text whiteSpace="pre-wrap" overflowWrap="normal">
          Create a new learning path from a collection
        </Text>
      </VStack>
    </Button>
  );
};

export default CreatePathCollectionButton;
