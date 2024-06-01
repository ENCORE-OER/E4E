import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { AddContentModalProps } from '../../../types/encoreElements';
import AddContentTabs from '../../Tabs/AddContentTabs';

export default function AddContentModal({
  isOpen,
  onClose,
}: AddContentModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'100%'} >
      <ModalOverlay />
      <ModalContent w="80%" h="80%" >
        <ModalHeader>Add Content</ModalHeader>
        <ModalCloseButton />
        <ModalBody overflowY={"auto"}>
          <Flex w="100%" justify={'center'}>
            <AddContentTabs />
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
