import { Box, Flex, Text } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';
import { MultipleArrayProps } from '../../../../types/encoreElements';
import MultipleDataDropDownMenu from '../../../CustomDropDownMenu/MultipleDataDropDownMenu';
import NumberInputTextBox from '../../../TextBox/NumberInputTextBox';

type RowBoxGenLessonPlan = {
  numberInput: number; // Used to specify the number of activities to generate
  setNumberInput: Dispatch<SetStateAction<number>>;
  isNumberZero: boolean; // Used to check if the number input is zero
  setIsNumberZero: Dispatch<SetStateAction<boolean>>;
  defaultMenuTitle: string; // Used to display the default title of the menu
  description: string; // Used to describe the number input
  dataMenu: MultipleArrayProps[]; // Used to populate the menu
  // onDataMenu: () => void; // Used to handle the data of the menu
  // onSelectionChangeMenu?: (
  //   selectedBloomActiviesIndex: number,
  //   selectedActivityIndex: number,
  //   event?: any
  // ) => void; // Used to handle the selection change of the menu
  itemIndexMenu: number[][]; // Used to store the index of the selected item in the menu
  setItemIndexMenu: Dispatch<SetStateAction<number[][]>>;
  isAtleastItemSelected: boolean;
  SetIsAtleastItemSelected: Dispatch<SetStateAction<boolean>>;
};

export default function RowBoxGenLessonPlan({
  numberInput,
  setNumberInput,
  isNumberZero,
  setIsNumberZero,
  defaultMenuTitle,
  description,
  dataMenu,
  // onDataMenu,
  // onSelectionChangeMenu,
  itemIndexMenu,
  setItemIndexMenu,
  isAtleastItemSelected,
  SetIsAtleastItemSelected,
}: RowBoxGenLessonPlan) {
  const handleItemSelection = () => {
    if (!isAtleastItemSelected) SetIsAtleastItemSelected(true);
  };

  const handleItemChange = (
    newIndexBloomActivity: number,
    newIndexActivity: number
  ) => {
    setItemIndexMenu((prevIndex) => {
      if (newIndexBloomActivity === -1 && newIndexActivity === -1) {
        return [];
      }

      const updatedIndex = [...prevIndex];

      // Ensure the updatedIndex array has enough subarrays to include newIndexBloomActivity
      while (updatedIndex.length <= newIndexBloomActivity) {
        updatedIndex.push([]);
      }

      // Toggle the activity selection
      if (updatedIndex[newIndexBloomActivity].includes(newIndexActivity)) {
        // If already selected, remove it
        updatedIndex[newIndexBloomActivity] = updatedIndex[
          newIndexBloomActivity
        ].filter((index) => index !== newIndexActivity);
      } else {
        // If not selected, add it
        updatedIndex[newIndexBloomActivity].push(newIndexActivity);
      }

      // Check if there are any selected activities left
      const hasSelectedActivities = updatedIndex.some(
        (subArray) => subArray.length > 0
      );

      // If no activities are selected, reset the array
      if (!hasSelectedActivities) {
        return [];
      }

      return updatedIndex;
    });
  };

  return (
    <Flex
      direction="row"
      align="center"
      flexWrap={'wrap'}
      gap={2}
      w="100%"
      border={isAtleastItemSelected ? '1px' : 'none'}
    >
      <Flex minW="50%" align="center" gap={3} pr={5}>
        <NumberInputTextBox
          numberInput={numberInput}
          setNumberInput={setNumberInput}
          minNumber={0}
          maxNumber={5}
          isNumberZero={isNumberZero}
          setIsNumberZero={setIsNumberZero}
          label_tooltip="Specify the number of activities you want to generate. Maximum number of activities is 5."
        />
        <Text fontSize="md">{description}</Text>
      </Flex>
      {/* <CustomDropDownMenu
        data={dataMenu}
        onData={onDataMenu}
        onSelectionChange={onSelectionChangeMenu}
        itemIndex={itemIndexMenu}
        defaultMenuTitle={defaultMenuTitle}
        isCheckBoxNeeded={true}
      /> */}
      <Box w="400px">
        <MultipleDataDropDownMenu
          multipleData={dataMenu}
          onData={handleItemSelection}
          onSelectionChange={handleItemChange}
          itemIndex={itemIndexMenu}
          defaultMenuTitle={defaultMenuTitle}
          isCheckBoxNeeded={true}
        />
      </Box>
    </Flex>
  );
}
