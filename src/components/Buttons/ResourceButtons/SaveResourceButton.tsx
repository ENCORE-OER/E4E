import { Button, Tooltip } from '@chakra-ui/react';
import { IconBookmarkCheck } from '../../../public/Icons/svgToIcons/iconBookmarkCheck';

type SaveResourceButtonProps = {
  handleOpenAddCollectionModal?: () => void;
};

export default function SaveResourceButton({
  handleOpenAddCollectionModal,
}: SaveResourceButtonProps) {
  return (
    <Tooltip
      label="Add the OER in a Collection"
      aria-label="Add the OER in a Collection"
      hasArrow
      placement="bottom"
      bg="gray.100"
      color="primary"
      fontSize={'sm'}
      p={1}
    >
      <Button
        leftIcon={<IconBookmarkCheck />}
        variant="secondary"
        onClick={(e) => {
          e.preventDefault();
          if (handleOpenAddCollectionModal) {
            handleOpenAddCollectionModal();
          }
        }}
      >
        Save Resource
      </Button>
    </Tooltip>
  );
}
