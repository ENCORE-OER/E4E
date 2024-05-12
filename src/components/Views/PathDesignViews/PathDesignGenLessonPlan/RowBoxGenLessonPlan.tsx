import { Flex, Text } from '@chakra-ui/react';
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
  onDataMenu: () => void; // Used to handle the data of the menu
  onSelectionChangeMenu?: (
    selectedBloomActiviesIndex: number,
    selectedActivityIndex: number,
    event?: any
  ) => void; // Used to handle the selection change of the menu
  itemIndexMenu: number[][]; // Used to store the index of the selected item in the menu
};

export default function RowBoxGenLessonPlan({
  numberInput,
  setNumberInput,
  isNumberZero,
  setIsNumberZero,
  defaultMenuTitle,
  description,
  dataMenu,
  onDataMenu,
  onSelectionChangeMenu,
  itemIndexMenu,
}: RowBoxGenLessonPlan) {
  return (
    <Flex direction="row" align="center" flexWrap={'wrap'} gap={2}>
      <Flex w="40%" flex="1" align="center" gap={3} pr={5}>
        <NumberInputTextBox
          numberInput={numberInput}
          setNumberInput={setNumberInput}
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
      <MultipleDataDropDownMenu
        multipleData={dataMenu}
        onData={onDataMenu}
        onSelectionChange={onSelectionChangeMenu}
        itemIndex={itemIndexMenu}
        defaultMenuTitle={defaultMenuTitle}
        isCheckBoxNeeded={true}
      />
    </Flex>
  );
}
