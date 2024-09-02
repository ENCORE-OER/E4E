import { Button, Menu, MenuButton } from '@chakra-ui/react';
import { useState } from 'react';
import { CustomToast } from '../../../../../utils/Toast/CustomToast';
import IconVerticalPoints from '../../../../Icons/IconVerticalPoints/IconVerticalPoints';
import ActionButtonsList from './ActionButtonsList';

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
      <ActionButtonsList
        handleClose={handleClose}
        handleDeleteClick={handleDeleteClick}
        handleEditLessonActivity={handleEditLessonActivity}
        isEditLessonPlanClicked={isEditLessonPlanClicked}
      />
    </Menu>
  );
}
