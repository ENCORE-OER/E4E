import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import ResourceCards from "../Card/ResourceCards";

type LearningPathEditorProps = {
    conceptSelectedIndex: number;
    oers: any[];
}

export default function LearningPathEditor({ conceptSelectedIndex, oers }: LearningPathEditorProps) {
    return (
        <>
            {!(conceptSelectedIndex === -1) && (
                <Flex px="10px">
                    {/*<Box bg="white" w="70%" h="400px" mt={5} p={3}></Box>*/}

                    <iframe width="70%" height="500px" src="https://node-editor-mxfmii88f-polyglot-edu.vercel.app/flows/07401216-f6d5-46cb-a051-2d9f51031d87"></iframe>

                    <Box flex="1" p={5} pr="60px">
                        <Text pb={5} fontSize="20" fontWeight="semibold">
                            Relevant OERs
                        </Text>
                        <ResourceCards oers={oers} isNormalSizeCard={false} />
                    </Box>
                </Flex>
            )}
        </>
    );
}