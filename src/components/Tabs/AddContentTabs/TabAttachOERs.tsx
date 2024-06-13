import { Flex } from '@chakra-ui/react';
import ResourcesPage from '../../../pages/resources';
import { useHasHydrated } from '../../../utils/utils';

export default function TabAttachOERs() {
  const hydrated = useHasHydrated();

  return (
    <Flex w="100%">
      {hydrated && <ResourcesPage isAddContentModal={true} />}
    </Flex>
  );
}
