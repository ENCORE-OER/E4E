import { Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import RowBoxGenLessonPlan from "./RowBoxGenLessonPlan";

export default function PathDesignGenLessonPlan() {
    const [numberOfLearningActivities, setNumberOfLearningActivities] = useState<number>(0);     // Number of learning activities to generate for the lesson plan
    const [numberOfAssessmentActivities, setNumberOfAssessmentActivities] = useState<number>(0);    // Number of assessment activities to generate for the lesson plan
    // const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state
    const [isNumberOfLAZero, setIsNumberOfLAZero] = useState<boolean>(false); // State to check if the number of learning activities is invalid (zero)
    const [isNumberOfAAZero, setIsNumberOfAAZero] = useState<boolean>(false); // State to check if the number of assessment activities is invalid (zero)

    return (
        <Flex direction='column' rowGap={3} pt="3rem" w='80%'>
            <Text fontSize='large'>Specify the number of activities in the lesson plan</Text>
            <RowBoxGenLessonPlan
                numberInput={numberOfLearningActivities}
                setNumberInput={setNumberOfLearningActivities}
                isNumberZero={isNumberOfLAZero}
                setIsNumberZero={setIsNumberOfLAZero}
                defaultMenuTitle="Choose types of learning activities..."
            />

            <RowBoxGenLessonPlan
                numberInput={numberOfAssessmentActivities}
                setNumberInput={setNumberOfAssessmentActivities}
                isNumberZero={isNumberOfAAZero}
                setIsNumberZero={setIsNumberOfAAZero}
                defaultMenuTitle="Choose types of assessment activities..."
            />
        </Flex >
    );
}