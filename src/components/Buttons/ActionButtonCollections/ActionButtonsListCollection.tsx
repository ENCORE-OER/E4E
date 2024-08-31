import { Flex, MenuItem, MenuList, Text } from '@chakra-ui/react';
import IconDelete from '../../Icons/IconDelete/IconDelete';
import IconDuplicate from '../../Icons/IconDuplicate/IconDuplicate';
import IconEdit from '../../Icons/IconEdit/IconEdit';

type ActionButtonsListCollectionProps = {
  handleClose: () => void;
  handleDuplicateButtonClick: () => Promise<void>;
  handleDeleteButtonClick: () => Promise<void>;
  handleRenameButtonClick: () => Promise<void>;
};

export default function ActionButtonsListCollection({
  handleClose,
  handleDuplicateButtonClick,
  handleDeleteButtonClick,
  handleRenameButtonClick
}: ActionButtonsListCollectionProps) {
  return (
    <MenuList w="fit-content" fontSize="md">

      {/* Rename */}
      <MenuItem
        onClick={async () => {
          handleClose();
          await handleRenameButtonClick();
        }}
      >
        <Flex direction="row" gap={2}>
          <IconEdit />
          <Text fontWeight="bold">Rename</Text>
        </Flex>
      </MenuItem>

      {/* Duplicate */}
      <MenuItem
        onClick={async () => {
          handleClose();
          await handleDuplicateButtonClick();
        }}
      // isDisabled={}
      >
        <Flex direction="row" gap={2}>
          <IconDuplicate />
          <Text fontWeight="bold">Duplicate</Text>
        </Flex>
      </MenuItem>

      {/* Delete */}
      <MenuItem
        onClick={async () => {
          handleClose();
          await handleDeleteButtonClick();
        }}
      >
        <Flex direction="row" gap={2}>
          <IconDelete />
          <Text fontWeight="bold">Delete</Text>
        </Flex>
      </MenuItem>
    </MenuList>
  );
}
