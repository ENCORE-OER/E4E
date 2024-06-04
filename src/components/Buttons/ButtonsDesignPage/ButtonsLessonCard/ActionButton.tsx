import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { CustomToast } from '../../../../utils/Toast/CustomToast';
import IconDelete from '../../../Icons/IconDelete/IconDelete';
import IconEdit from '../../../Icons/IconEdit/IconEdit';
import IconRegenerate from '../../../Icons/IconRegenerate/IconRegenerate';
import IconVerticalPoints from '../../../Icons/IconVerticalPoints/IconVerticalPoints';

type ActionButtonProps = {
  handleDeleteLessonActivity: () => void;
  handleEditLessonActivity: () => void;
  isEditLessonPlanClicked: boolean;
};

export default function ActionButton({
  handleDeleteLessonActivity,
  isEditLessonPlanClicked,
  handleEditLessonActivity,
}: ActionButtonProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { addToast } = CustomToast();

  const handleOpen = () => {
    if (!isOpen) setIsOpen(true);
  };

  const handleClose = () => {
    if (isOpen) setIsOpen(false);
  };

  const handleDeleteClick = () => {
    handleClose();
    handleDeleteLessonActivity();

    addToast({
      message: 'Lesson activity succesfully deleted',
      type: 'success',
    });
  };

  return (
    <Menu>
      <MenuButton
        as={Button}
        shadow={'none'}
        bg="none"
        w="fit-content"
        onClick={handleOpen}
        size={'sm'}
        p={0}
      >
        <IconVerticalPoints />
      </MenuButton>
      <MenuList w="fit-content" fontSize="small">
        <MenuItem
          onClick={() => {
            handleClose();
            handleEditLessonActivity();
          }}
          isDisabled={isEditLessonPlanClicked}
        >
          <Flex direction="row" gap={2}>
            <IconEdit />
            <Text>Edit</Text>
          </Flex>
        </MenuItem>
        <MenuItem onClick={handleDeleteClick}>
          <Flex direction="row" gap={2}>
            <IconDelete />
            <Text>Delete</Text>
          </Flex>
        </MenuItem>
        <MenuItem onClick={handleClose} isDisabled={true}>
          <Flex direction="row" gap={2}>
            <IconRegenerate />
            <Text>Regenerate</Text>
          </Flex>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
