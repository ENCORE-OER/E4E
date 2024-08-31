import { Button, Menu, MenuButton } from '@chakra-ui/react';
import { useState } from 'react';
import IconVerticalPoints from '../../Icons/IconVerticalPoints/IconVerticalPoints';
import ActionButtonsListCollection from './ActionButtonsListCollection';

type ActionButtonCollectionsProps = {
  handleDuplicateButtonClick: () => Promise<void>;
  handleDeleteButtonClick: () => Promise<void>;
};

export default function ActionButtonCollections({
  handleDuplicateButtonClick,
  handleDeleteButtonClick,
}: ActionButtonCollectionsProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => {
    if (!isOpen) setIsOpen(true);
  };

  const handleClose = () => {
    if (isOpen) setIsOpen(false);
  };

  const handleDeleteClick = async () => {
    handleClose();
    await handleDeleteButtonClick();
  };

  const handleDuplicateClick = async () => {
    handleClose();
    await handleDuplicateButtonClick();
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
        _hover={{ bg: 'gray.300' }}
      >
        <IconVerticalPoints />
      </MenuButton>
      <ActionButtonsListCollection
        handleClose={handleClose}
        handleDuplicateButtonClick={handleDuplicateClick}
        handleDeleteButtonClick={handleDeleteClick}
      />
    </Menu>
  );
}
