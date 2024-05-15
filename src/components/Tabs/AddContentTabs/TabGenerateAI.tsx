import { Flex } from '@chakra-ui/react';
import Create from '../../../pages/create';

export default function TabGenerateAI() {
    return (
        <Flex w="100%">
            <Create isAddContentModal={true} />
        </Flex>
    );
}
