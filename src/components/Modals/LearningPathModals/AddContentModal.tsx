import {
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useLearningPathDesignContext } from '../../../Contexts/LearningPathDesignContext/LearningPathDesignContext';
import { AddContentModalProps, OerInCollectionProps } from '../../../types/encoreElements';
import { useHasHydrated } from '../../../utils/utils';
import IconSave from '../../Icons/IconSave/IconSave';
import AddContentTabs from '../../Tabs/AddContentTabs';

export default function AddContentModal({
  isOpen,
  onClose,
}: AddContentModalProps) {

  const hydrated = useHasHydrated();
  const { resourcesSelected, resetSelectedResources } = useLearningPathDesignContext();

  useEffect(() => {
    console.log(resourcesSelected);
  }, [resourcesSelected])

  // useEffect(() => {
  //   resetSelectedResources();
  // }, [])

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        resetSelectedResources();
      }}
      size={'100%'}
    >
      <ModalOverlay />
      <ModalContent w="90%" h="90%">
        <ModalHeader>
          <Flex direction="row" align="center" w="95%">
            <Heading>Add Content</Heading>
            {hydrated && resourcesSelected.length > 0 &&
              <Flex direction="row" align="center" gap={1} wrap="wrap">
                {resourcesSelected?.map((resource: OerInCollectionProps, index: number) =>
                  <Text key={index} fontSize="sm">{resource.title}</Text>
                )}
              </Flex>
            }
            <Flex flex="1" justify="flex-end">
              <Button
                isDisabled={true}
                w="fit-content"
                rightIcon={<IconSave />}
              >
                Save and Close
              </Button>
            </Flex>
          </Flex>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody overflowY={'auto'}>
          <Flex w="100%" justify={'center'}>
            <AddContentTabs />
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
