import { Flex, MenuItem, MenuList, Text } from '@chakra-ui/react';
import IconDelete from '../../../../Icons/IconDelete/IconDelete';
import IconEdit from '../../../../Icons/IconEdit/IconEdit';
import IconRegenerate from '../../../../Icons/IconRegenerate/IconRegenerate';

type ActionButtonsListProps = {
  handleClose: () => void;
  handleDeleteClick: () => void;
  handleEditLessonActivity: () => void;
  isEditLessonPlanClicked: boolean;
};

export default function ActionButtonsList({
  handleClose,
  handleDeleteClick,
  handleEditLessonActivity,
  isEditLessonPlanClicked,
}: ActionButtonsListProps) {
  return (
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
  );
}
