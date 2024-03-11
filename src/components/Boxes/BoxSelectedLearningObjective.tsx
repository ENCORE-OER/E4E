import { Box, Flex, Textarea } from '@chakra-ui/react';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

type BoxSelectedLearningObjectiveProps = {
  text: string;
  onTextChange: (newText: string) => void;
  isLearningObjectiveChanged: boolean;
  setIsLearningObjectiveChanged: Dispatch<SetStateAction<boolean>>;
  storedLearningObjective: string;
  isOriginalLOSelected: boolean;
  setIsOriginalLOSelected: Dispatch<SetStateAction<boolean>>;
};

export default function BoxSelectedLearningObjective({
  text,
  onTextChange,
  isLearningObjectiveChanged,
  setIsLearningObjectiveChanged,
  storedLearningObjective,
  isOriginalLOSelected,
  setIsOriginalLOSelected,
}: BoxSelectedLearningObjectiveProps) {
  const [originalLearningObjective, setOriginalLearningObjective] =
    useState<string>(''); // to know the original learning objective, before any changes

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    onTextChange(newText);
  };

  useEffect(() => {
    setOriginalLearningObjective(text);
    if (text.trim() !== storedLearningObjective.trim() &&
      text.trim() === originalLearningObjective.trim() &&
      !isLearningObjectiveChanged) {
      console.log('is original selected?: ', true);
      setIsOriginalLOSelected(true);
    } else {
      console.log('is original selected?: ', false);
      setIsOriginalLOSelected(false);
    }
  }, []);

  useEffect(() => {
    console.log('original: ', originalLearningObjective);
  }, [originalLearningObjective]);

  useEffect(() => {
    if (
      // Check if the learning objective has been changed
      text.trim() !== storedLearningObjective.trim() && // Check if the text is different from the stored learning objective
      !isLearningObjectiveChanged
    ) {
      if (
        text.trim() !== originalLearningObjective.trim() && // Check if the text is different from the original selected learning objective
        isOriginalLOSelected
      ) {
        console.log('is original selected?: ', false);
        setIsOriginalLOSelected(false);
      } else {
        console.log('is original selected?: ', true);
        setIsOriginalLOSelected(true);
      }
      setIsLearningObjectiveChanged(true);
    } else if (
      text.trim() === storedLearningObjective.trim() && // Check if the text is the same as the stored learning objective
      isLearningObjectiveChanged
    ) {
      if (
        text.trim() === originalLearningObjective.trim() && // Check if the text is the same as the original selected learning objective
        !isOriginalLOSelected
      ) {
        console.log('is original selected?: ', true);
        setIsOriginalLOSelected(true);
      } else {
        console.log('is original selected?: ', false);
        setIsOriginalLOSelected(false);
      }
      setIsLearningObjectiveChanged(false);
    }
  }, [text]);

  return (
    <Flex py="10px" align="center" direction="column">
      <Box
        display="flex"
        w="95%"
        border="3px solid black"
        borderRadius={'md'}
        alignItems="center"
        p={2}
      //flexDirection={'column'}
      >
        <Textarea
          //display={'flex'}
          //w="100%"
          //h={'100%'}
          pr="10"
          py="3"
          pl="3"
          resize="none"
          border="none"
          value={text}
          onChange={handleTextChange}
        />
      </Box>
    </Flex>
  );
}
