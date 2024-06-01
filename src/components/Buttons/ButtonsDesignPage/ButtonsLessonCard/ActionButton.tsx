import { Button, Flex, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { useState } from 'react';
import IconDelete from '../../../Icons/IconDelete/IconDelete';
import IconEdit from '../../../Icons/IconEdit/IconEdit';
import IconRegenerate from '../../../Icons/IconRegenerate/IconRegenerate';
import IconVerticalPoints from '../../../Icons/IconVerticalPoints/IconVerticalPoints';

type ActionButtonProps = {
  handleDeleteLesson: () => void;
  handleEditLesson: () => void;
  isEditLessonPlanClicked: boolean;
}

export default function ActionButton({
  handleDeleteLesson,
  isEditLessonPlanClicked,
  handleEditLesson
}: ActionButtonProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => {
    if (!isOpen)
      setIsOpen(true);
  };

  const handleClose = () => {
    if (isOpen)
      setIsOpen(false);
  };

  return (
    <Menu>
      <MenuButton
        as={Button}
        shadow={'none'}
        bg="none"
        w="fit-content"
        onClick={handleOpen}
      >
        <IconVerticalPoints />
      </MenuButton>
      <MenuList w="fit-content" fontSize="small">
        <MenuItem onClick={() => {
          handleClose();
          handleEditLesson();
        }} isDisabled={isEditLessonPlanClicked}>
          <Flex direction="row" gap={2}>
            <IconEdit />
            <Text>Edit</Text>
          </Flex>
        </MenuItem>
        <MenuItem onClick={() => {
          handleClose();
          handleDeleteLesson()
        }}>
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
    </Menu >
  );
}
