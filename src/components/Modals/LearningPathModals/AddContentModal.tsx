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
} from '@chakra-ui/react';
import { AddContentModalProps } from '../../../types/encoreElements';
import IconSave from '../../Icons/IconSave/IconSave';
import AddContentTabs from '../../Tabs/AddContentTabs';

export default function AddContentModal({
  isOpen,
  onClose,
}: AddContentModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'100%'}>
      <ModalOverlay />
      <ModalContent w="90%" h="90%">
        <ModalHeader>
          <Flex direction="row" align="center" w="95%">
            <Heading>Add Content</Heading>
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
