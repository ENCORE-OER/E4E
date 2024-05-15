import { Flex } from '@chakra-ui/react';
import ResourcesPage from '../../../pages/resources';

export default function TabAttachOERs() {
    return (
        <Flex w="100%">
            <ResourcesPage isAddContentModal={true} />
        </Flex>
    );
}
