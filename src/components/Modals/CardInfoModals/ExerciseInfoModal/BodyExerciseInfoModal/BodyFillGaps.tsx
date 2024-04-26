import {
    Flex,
    ListItem,
    Text,
    UnorderedList
} from '@chakra-ui/react';
import {
    ExerciseInfoModalProps
} from '../../../../../types/encoreElements';

// export interface BodyFillGapsProps extends ExerciseInfoModalProps {}

export default function BodyFillGaps({
    fill_template,
    fill_template_with_gaps,
    n_o_w,
    n_o_d,
    options,
}: ExerciseInfoModalProps) {
    return (
        // {fill_template && fill_template_with_gaps && (
        <Flex
            justifyContent={'left'}
            overflowWrap={'normal'}
            direction="column"
        >
            <Text variant="label_drawer">Original text</Text>
            <Text pb="5">{fill_template}</Text>
            <Text variant="label_drawer">Text with gaps</Text>
            <Text pb="5">{fill_template_with_gaps}</Text>
            {options && options.length > 0 && (
                <Flex
                    justifyContent={'left'}
                    pb="5"
                    overflowWrap={'normal'}
                    direction="column"
                >
                    <Text variant="label_drawer">Distractors</Text>
                    <UnorderedList>
                        {options?.map((option: string, index: number) => (
                            <ListItem key={index}>{option}</ListItem>
                        ))}
                    </UnorderedList>
                    {/* Check if "option" is the right field */}
                </Flex>
            )}
            <Text variant="label_drawer">Number of words</Text>
            <Text pb="5">{n_o_w}</Text>
            <Text variant="label_drawer">Number of Distractors</Text>
            <Text pb="5">{n_o_d}</Text>
        </Flex>
        // )}
    );
}