import { Button, Flex, Text } from '@chakra-ui/react';
import { IconPathEdit } from '../../../../public/Icons/svgToIcons/iconPatheEdit';
import ResetButton from '../ResetButton';

interface FooterButtonsGroupProps {
  SPACING: number;
  handleResetAll?: (value: boolean) => void;
  handleNextClick?: () => void;
  handlePrevButtonClick?: () => void;
}

export default function FooterButtonsGroup({
  SPACING,
  handleResetAll,
  handleNextClick,
  handlePrevButtonClick,
}: FooterButtonsGroupProps) {
  return (
    <Flex paddingTop="1.5rem" w="100%">
      <Flex
        w="auto"
        paddingRight={`${SPACING}%`}
        position={'fixed'}
        bottom="5%"
        right="8%"
        gap="2"
      >
        {handleResetAll && (
          <ResetButton
            textButton="Restart"
            handleResetAll={handleResetAll}
            pathname={'/design'}
          />
        )}

        {handlePrevButtonClick && (
          <Button
            //marginRight={'1px'}
            border={'1px solid'}
            w="100%"
            colorScheme="yellow"
            onClick={handlePrevButtonClick}
          >
            <Text fontWeight="bold" fontSize="lg">
              Previous
            </Text>
          </Button>
        )}

        {handleNextClick && (
          <Button
            //marginLeft={'1px'}
            border={'1px solid'}
            w="100%"
            leftIcon={<IconPathEdit />}
            colorScheme="yellow"
            onClick={handleNextClick}
          >
            <Text fontWeight="bold" fontSize="lg">
              Next
            </Text>
          </Button>
        )}
      </Flex>
    </Flex>
  );
}
