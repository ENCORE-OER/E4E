import { Box, Checkbox, Flex, Text, Textarea } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import EditButtonLearningObjectiveBox from '../Buttons/ButtonsDesignPage/EditButtonLearningObjectiveBox';

interface BoxGeneratedLOProps {
  textLearningObjective: string; // Learning Objective text
  index?: number;
  selectedLO?: boolean[];
  handleCheckBoxClick?: (index: number) => void;
  handleUpdateLO?: (index: number, newText: string) => void;
  // This function is used to update the learning objective in the Learning Path Design page
  handleConfirmLO?: (newText: string) => void;
}

export default function BoxGeneratedLO({
  textLearningObjective,
  index,
  selectedLO,
  handleCheckBoxClick,
  handleUpdateLO,
  handleConfirmLO,
}: BoxGeneratedLOProps) {
  const [isEditClicked, setIsEditClicked] = useState<boolean>(false);
  const [editedText, setEditedText] = useState<string>(textLearningObjective);

  //const [isLOSaved, setIsLOSaved] = useState<boolean>(false); // This state is used to check if the learning objective has been saved on DB with the 'Save' button

  const handleEditClick = () => {
    console.log('Edit clicked');
    //console.log(editedText);
    try {
      if (isEditClicked) {
        // Confirm the edit
        setIsEditClicked(false);
        if (index !== undefined && handleUpdateLO !== undefined) {
          handleUpdateLO(index, editedText); // Pass the edited text to the function to update the learning objective
        } else if (handleConfirmLO !== undefined) {
          handleConfirmLO(editedText);
        }
      } else {
        setIsEditClicked(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedText(e.target.value);
  };

  // Update the edited text when we restore the old learning objective with the 'Undo' button
  useEffect(() => {
    if (textLearningObjective !== editedText) {
      setEditedText(textLearningObjective);
    }
  }, [textLearningObjective]);

  return (
    <Flex py="10px" align="center" gap="5" key={index}>
      <Box
        display="flex"
        position="relative"
        minW="500px"
        minH="80px"
        w="90%"
        border="2px solid black"
        borderRadius={'md'}
        alignItems="center"
        p={2}
      >
        <Flex w="100%">
          <Text
            position="absolute"
            top="-10px"
            left="5%"
            //transform="translateX(-90%)"
            backgroundColor="background"
            px="4px"
            fontSize="sm"
            borderRadius={'md'}
            border="none"
          >
            Learning Objective
          </Text>
          {isEditClicked ? (
            <Textarea
              display={'flex'}
              //w="100%"
              //h={'100%'}
              pr="10"
              py="3"
              pl="3"
              resize="none"
              border="none"
              value={editedText}
              onChange={handleTextChange}
            />
          ) : (
            <Text
              pr="10"
              py="3"
              pl="3"
              whiteSpace="pre-wrap" //TODO: check if this is necessary
              border="none"
            >
              {editedText}
            </Text>
          )}
        </Flex>
        {index !== undefined && ( // use index to check if the checkbox should be displayed: that means that we are in the 'learning objectives page'
          <Checkbox
            position="absolute"
            top="50%"
            right="2%"
            transform="translate(-50%, -50%)"
            colorScheme="accent.900"
            iconColor="black"
            borderColor={'accent.900'}
            bg="accent.900"
            color={'black'}
            borderRadius="md"
            isDisabled={editedText === '' ? true : false}
            isChecked={
              selectedLO && index !== undefined ? selectedLO[index] : false
            } //TODO: reset the checkbox after clicking the generate buttons
            onChange={
              handleCheckBoxClick && index !== undefined
                ? () => handleCheckBoxClick(index)
                : undefined
            }
          />
        )}
      </Box>

      <EditButtonLearningObjectiveBox
        isEditClicked={isEditClicked}
        handleEditClick={handleEditClick}
      />
    </Flex>
  );
}
