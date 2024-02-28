import { Box, Flex, Textarea } from "@chakra-ui/react";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

type BoxSelectedLearningObjectiveProps = {
    text: string;
    onTextChange: (newText: string) => void;
    isLearningObjectiveChanged: boolean;
    setIsLearningObjectiveChanged: Dispatch<SetStateAction<boolean>>;
};

export default function BoxSelectedLearningObjective({
    text,
    onTextChange,
    isLearningObjectiveChanged,
    setIsLearningObjectiveChanged,
}: BoxSelectedLearningObjectiveProps) {

    // TODO: think a way to say to the Educator to save the new learning objective when he changes it

    const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const newText = e.target.value;
        onTextChange(newText);
        if (newText.trim() !== text.trim() && !isLearningObjectiveChanged) {
            setIsLearningObjectiveChanged(true);
        } else if (newText.trim() === text.trim()) {
            setIsLearningObjectiveChanged(false);
        }
    };

    return (
        <Flex py='10px' align='center' direction='column'>
            <Box
                display='flex'
                w="95%"
                border="3px solid black"
                borderRadius={'md'}
                alignItems='center'
                p={2}
            //flexDirection={'column'}
            >
                <Textarea
                    //display={'flex'}
                    //w="100%"
                    //h={'100%'}
                    pr='10'
                    py='3'
                    pl='3'
                    resize="none"
                    border='none'
                    value={text}
                    onChange={handleTextChange}
                />
            </Box>
        </Flex>
    );
}