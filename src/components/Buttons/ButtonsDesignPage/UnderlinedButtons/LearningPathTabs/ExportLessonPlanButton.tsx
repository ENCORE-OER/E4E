import { Button, ButtonGroup, Flex, Tooltip } from '@chakra-ui/react';
import { useState } from 'react';
import { useLearningPathDesignContext } from '../../../../../Contexts/LearningPathDesignContext/LearningPathDesignContext';
import { LessonPlanTabButtonProps } from '../../../../../types/encoreElements';
import IconCopy from '../../../../Icons/IconCopy/IconCopy';
import IconDocument from '../../../../Icons/IconDocuments/IconDocument';
import IconExport from '../../../../Icons/IconExport/IconExport';
import IconPDF from '../../../../Icons/IconPDF/IconPDF';
import IconSpreadsheet from '../../../../Icons/IconSpreadsheet/IconSpreadsheet';
import UnderlinedButton from '../UnderlinedButton';

export default function ExportLessonPlanButton({
  name,
  isDisabled,
  isSmallerScreen,
  handleExportToPDF,
}: LessonPlanTabButtonProps) {
  const { isEditLessonPlanClicked } = useLearningPathDesignContext();
  const [showAdditionalButtons, setShowAdditionalButtons] = useState<boolean>(false); // State to manage the visibility of additional buttons

  return (
    <Tooltip
      hasArrow
      placement="top"
      label={name}
      aria-label={name}
      //ml="1px"
      bg="white"
      color="primary"
      p={2}
      fontSize={'sm'}
      borderRadius={5}
      isDisabled={!isSmallerScreen}
    >
      <Flex
        p={1}
        _hover={{ bg: 'gray.200' }}
        // onMouseEnter={() => setShowAdditionalButtons(true)} // Show additional buttons when hovering over the tooltip
        onMouseLeave={() => setShowAdditionalButtons(false)} // Hide additional buttons when leaving the tooltip
        position="relative" // Relative position to allow absolute positioning of additional buttons
      >
        <UnderlinedButton
          handleClick={() => setShowAdditionalButtons(true)}
          nameButton={!isSmallerScreen ? name : ''}
          rightIcon={<IconExport />}
          color="primary"
          fontWeight="normal"
          isDisabled={isDisabled || isEditLessonPlanClicked}
        />
        {showAdditionalButtons && ( // Render additional buttons only if showAdditionalButtons is true
          <ButtonGroup
            position="absolute"
            top="100%" // Position the additional buttons below the main button
            left="50%" // Center the additional buttons relative to the main button
            transform="translateX(-50%)" // Center the additional buttons horizontally
            zIndex={10} // Ensure that additional buttons are above the tooltip
            pt={2}
            flexDirection="column"
            bg={"background"}
            w="fit-content"
          // justifyContent="flex-start"
          >
            <Button w="100%" onClick={handleExportToPDF} leftIcon={<IconPDF />} justifyContent={"flex-start"}>Download as pdf</Button>
            <Button w="100%" leftIcon={<IconDocument />} isDisabled={true} justifyContent={"flex-start"}>Download as doc</Button>
            <Button w="100%" leftIcon={<IconSpreadsheet />} isDisabled={true} justifyContent={"flex-start"}>Download as spreadsheet</Button>
            <Button w="100%" leftIcon={<IconCopy fontSize="x-large" fontWeight="auto" />} isDisabled={true} justifyContent={"flex-start"}>Copy as text</Button>
          </ButtonGroup>
        )}
      </Flex>
    </Tooltip>
  );
}
