import { Flex, Text } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import CustomDropDownMenu from "../../../CustomDropDownMenu/CustomDropDownMenu";
import NumberInputTextBox from "../../../TextBox/NumberInputTextBox";

type RowBoxGenLessonPlan = {
    numberInput: number;
    setNumberInput: Dispatch<SetStateAction<number>>;
    isNumberZero: boolean;
    setIsNumberZero: Dispatch<SetStateAction<boolean>>;
    defaultMenuTitle: string;
}

export default function RowBoxGenLessonPlan({
    numberInput,
    setNumberInput,
    isNumberZero,
    setIsNumberZero,
    defaultMenuTitle
}: RowBoxGenLessonPlan) {
    return (
        <Flex direction='row' align='center' flexWrap={'wrap'}>
            <Flex w='40%' align='center' gap={3} pr={5}>
                <NumberInputTextBox
                    numberInput={numberInput}
                    setNumberInput={setNumberInput}
                    isNumberZero={isNumberZero}
                    setIsNumberZero={setIsNumberZero}
                    label_tooltip="Specify the number of activities you want to generate. Maximum number of activities is 5."
                />
                <Text fontSize="md">in class activities</Text>
            </Flex>
            <CustomDropDownMenu
                data={[]}
                onData={() => { console.log('data') }}
                onSelectionChange={() => { console.log('change') }}
                itemIndex={[]}
                defaultMenuTitle={defaultMenuTitle}
                isCheckBoxNeeded={true}
            />
        </Flex>
    )
}