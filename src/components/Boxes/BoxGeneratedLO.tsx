import { Box, Checkbox, Flex, Text, Textarea } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useHasHydrated } from '../../utils/utils';
import DeleteButtonLOBox from '../Buttons/ButtonsDesignPage/DeleteButtonLOBox';
import EditButtonLearningObjectiveBox from '../Buttons/ButtonsDesignPage/EditButtonLearningObjectiveBox';

interface BoxGeneratedLOProps {
  textLearningObjective: string; // Learning Objective text
  isGenerated?: boolean;
  isSelected?: boolean;
  //objectLOs: ObjectLearningObjectiveProps[];
  index: number;
  // selectedLO?: boolean[];
  handleCheckBoxClick: (index: number) => void;
  handleUpdateLO: (index: number, newText: string) => void;
  handleDeleteLO: (index: number) => void;
  isSmallerScreen: boolean | undefined;
  // This function is used to update the learning objective in the Learning Path Design page
  // handleConfirmLO?: (newText: string) => void;
}

export default function BoxGeneratedLO({
  textLearningObjective,
  isGenerated,
  isSelected,
  // objectLOs,
  index,
  // selectedLO,
  handleCheckBoxClick,
  handleUpdateLO, // handleConfirmLO,
  handleDeleteLO,
  isSmallerScreen,
}: BoxGeneratedLOProps) {

  const hydrated = useHasHydrated();

  const [isEditClicked, setIsEditClicked] = useState<boolean>(false);
  const [editedText, setEditedText] = useState<string>(
    textLearningObjective
  );

  //const [isLOSaved, setIsLOSaved] = useState<boolean>(false); // This state is used to check if the learning objective has been saved on DB with the 'Save' button

  const handleEditClick = () => {
    console.log('Edit clicked');
    //console.log(editedText);
    try {
      if (isEditClicked) {
        // Confirm the edit
        setIsEditClicked(false);
        // if (index !== undefined && handleUpdateLO !== undefined) {
        //   handleUpdateLO(index, editedText); // Pass the edited text to the function to update the learning objective
        // } else if (handleConfirmLO !== undefined) {
        //   handleConfirmLO(editedText);
        // }
        handleUpdateLO(index, editedText);
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
        // minW="400px"
        minH="65px"
        w="100%"
        //border="2px solid black"
        backgroundColor="accent.200"
        borderRadius="md"
        alignItems="center"
        px={2}
        pr={10}
      >
        <Flex w="100%" direction="column" p={1}>
          <Text
            //position="absolute
            //top="-10px"
            //left="5%"
            //transform="translateX(-90%)"
            // backgroundColor="background"
            //backgroundColor="accent.200"
            // px="4px"
            pb={1}
            fontSize="sm"
            fontWeight="bold"
            borderRadius="md"
            border="none"
          >
            {`Learning Objective ${index + 1} ${isGenerated ? '[ Generated ]' : ''
              }`}
          </Text>
          {isEditClicked ? (
            <Textarea
              display={'flex'}
              //w="100%"
              //h={'100%'}
              // pr="10"
              // py="3"
              // pl="3"
              resize="none"
              border="none"
              value={editedText}
              onChange={handleTextChange}
              fontSize="sm"
            />
          ) : (
            <Text
              // pr="10"
              // py="3"
              // pl="3"
              whiteSpace="pre-wrap" //TODO: check if this is necessary
              border="none"
              fontSize="sm"
            >
              {editedText}
            </Text>
          )}
        </Flex>
        {hydrated && (
          <Flex gap={isSmallerScreen ? 2 : 5} >
            <EditButtonLearningObjectiveBox
              isEditClicked={isEditClicked}
              handleEditClick={handleEditClick}
              isSmallerScreen={isSmallerScreen}
              label_tooltip='Edit'
            />

            <DeleteButtonLOBox
              handleDeleteClick={() => handleDeleteLO(index)}
              isSmallerScreen={isSmallerScreen}
              label_tooltip='Delete'
            />
          </Flex>
        )}
        {index !== undefined && ( // use index to check if the checkbox should be displayed: that means that we are in the 'learning objectives page'
          <Checkbox
            position="absolute"
            top="50%"
            right="0%"
            transform="translate(-50%, -50%)"
            colorScheme="accent.900"
            iconColor="black"
            borderColor={'accent.900'}
            bg="accent.900"
            color={'black'}
            borderRadius="md"
            isDisabled={editedText === '' ? true : false}
            isChecked={isSelected} //TODO: reset the checkbox after clicking the generate buttons
            onChange={
              // handleCheckBoxClick && index !== undefined
              //   ? () => handleCheckBoxClick(index)
              //   : undefined
              () => handleCheckBoxClick(index)
            }
          />
        )}
      </Box>


    </Flex>
  );
}
