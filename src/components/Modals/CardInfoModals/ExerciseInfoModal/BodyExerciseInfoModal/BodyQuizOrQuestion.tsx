import {
    Flex,
    ListItem,
    Text,
    UnorderedList
} from '@chakra-ui/react';
import {
    ExerciseInfoModalProps
} from '../../../../../types/encoreElements';

// interface BodyExerciseInfoModalProps extends ExerciseInfoModalProps { }

export default function BodyQuizOrQuestion({
    question,
    question_response,
    options,
    n_o_d,
    n_o_ed,
    n_o_ca,
    type_of_question,
    type_of_exercise,
    category,
}: ExerciseInfoModalProps) {
    return (
        // {question && question_response && (
        <Flex
            justifyContent={'left'}
            overflowWrap={'normal'}
            direction="column"
        >
            <Text variant="label_drawer">Question</Text>
            <Text pb="5">{question}</Text>
            <Text variant="label_drawer">Solution</Text>
            <Text pb="5">{question_response}</Text>
            {options && options.length > 0 && (
                <Flex
                    justifyContent={'left'}
                    overflowWrap={'normal'}
                    direction="column"
                >
                    <Flex
                        justifyContent={'left'}
                        pb="5"
                        overflowWrap={'normal'}
                        direction="column"
                    >
                        <Text variant="label_drawer">Options</Text>
                        {/* <Text pb="5">{options?.join(', ')}</Text>
                                    {options?.map((option) =>
                                        <Text>{option}</Text>
                                    )} */}
                        <UnorderedList>
                            {options?.map((option: string, index: number) => (
                                <ListItem key={index}>{option}</ListItem>
                            ))}
                        </UnorderedList>
                    </Flex>
                    <Text variant="label_drawer">Number of Distractors</Text>
                    <Text pb="5">{n_o_d}</Text>
                    <Text variant="label_drawer">
                        Number of Easy Distractors
                    </Text>
                    <Text pb="5">{n_o_ed}</Text>
                    <Text variant="label_drawer">
                        Number of Correct Answers
                    </Text>
                    <Text pb="5">{n_o_ca}</Text>
                </Flex>
            )}
            {type_of_question && (
                <Flex
                    justifyContent={'left'}
                    pb="5"
                    overflowWrap={'normal'}
                    direction="column"
                >
                    <Text variant="label_drawer">Type of Question</Text>
                    <Text>{type_of_question}</Text>
                </Flex>
            )}
            {type_of_exercise && (
                <Flex
                    justifyContent={'left'}
                    pb="5"
                    overflowWrap={'normal'}
                    direction="column"
                >
                    <Text variant="label_drawer">Type of Exercise</Text>
                    <Text>{type_of_exercise}</Text>
                </Flex>
            )}
            <Text variant="label_drawer">Category</Text>
            <Text pb="5">{category}</Text>
        </Flex>
        // )}
    );
}