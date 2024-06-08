import { Flex } from '@chakra-ui/react';
import { IconPathEdit } from '../../../../public/Icons/svgToIcons/iconPatheEdit';
import ResetButton from '../ResetButton';
import StandardButton from '../StandardButton';

interface FooterButtonsGroupProps {
  SPACING: number;
  handleResetAll?: (value: boolean) => void;
  handleNextClick?: () => void;
  // handlePrevButtonClick?: () => void;
}

export default function FooterButtonsGroup({
  SPACING,
  handleResetAll,
  handleNextClick, // handlePrevButtonClick,
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

        {/* {handlePrevButtonClick && (
          <StandardButton
            buttonText="Previous"
            handleClick={handlePrevButtonClick}
            w="100%"
            // color=""
          />
        )} */}

        {handleNextClick && (
          <StandardButton
            buttonText="Next"
            handleClick={handleNextClick}
            leftIcon={<IconPathEdit />}
            w="100%"
          />
        )}
      </Flex>
    </Flex>
  );
}
