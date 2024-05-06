import { Flex } from "@chakra-ui/react";
import LearningPathEditor from "../../Layout/LearningPathEditor";

export default function TabGraph() {
    return (
        <Flex w='100%'>
            <LearningPathEditor
                //setConceptSelectedIndex={setConceptSelectedIndex}
                // isLoading={isLoading}
                // oers={oersById}
                // conceptSelectedIndex={0}
                // collectionColor={[collections[collectionIndex]?.color]}
                // wPathEditor={isSmallerScreen ? '90%' : '95%'}
                wPathEditor="100%"
            />
        </Flex>
    );
}