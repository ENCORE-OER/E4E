import { Flex, Text } from "@chakra-ui/react";

type BoxSelectedLOProps = {
    learningObjective: string;
    index: number
}

export default function BoxSelectedLO({
    learningObjective,
    index
}: BoxSelectedLOProps) {
    return (
        <Flex
            py={1}
            px={3}
            // whiteSpace="pre-wrap" //TODO: check if this is necessary
            minH='45px'
            w='80%'
            border="none"
            // fontSize="sm"
            backgroundColor="accent.200"
            borderRadius="lg"
            alignItems='center'
            gap={2}
        >
            <Text fontSize="sm">
                {`${index + 1}.`}
            </Text>
            <Text
                // pr="10"
                // py="3"
                // pl="3"
                whiteSpace="pre-wrap" //TODO: check if this is necessary
                fontSize="sm"
            >
                {learningObjective}
            </Text>
        </Flex>

    );
}