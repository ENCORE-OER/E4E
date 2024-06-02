import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
} from '@chakra-ui/react';
import { ChangeEvent, useEffect, useState } from 'react';
import { AddPassFailConditionModalProps } from '../../../types/encoreElements';

export default function AddPassFailConditionModal({
  isOpen,
  onClose,
  indexCard,
  isPass,
  setIsPass,
  condition,
  setCondition,
  handleAddCondition,
}: AddPassFailConditionModalProps) {
  const [initialCondition, setInitialCondition] = useState<string>('');

  useEffect(() => {
    setInitialCondition(condition);
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Pass/Fail Condition</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex pb={4}>
            <Select
              value={isPass ? 'pass' : 'fail'}
              onChange={(e) => setIsPass(e.target.value === 'pass')}
            >
              <option value="pass" >If pass: </option>
              <option value="fail">If fail: </option>
            </Select>
          </Flex>
          <Input
            placeholder="Condition"
            value={condition}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCondition(e.target.value)
            }
          />
        </ModalBody>
        <ModalFooter gap={3}>
          <Button
            colorScheme="gray"
            onClick={(e) => {
              e.preventDefault();

              if (indexCard !== null && handleAddCondition)
                handleAddCondition(indexCard, { condition, isPass });
            }}
          >
            {initialCondition !== '' ? 'Save' : 'Add'}
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
