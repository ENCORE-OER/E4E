import { Button, Tooltip } from '@chakra-ui/react';
import { IconLunchLinkOpen } from '../../../public/Icons/svgToIcons/iconLunchLinkOpen';

type ViewResourceButtonProps = {
  handleViewResource?: () => void;
  isGeneratedByAI: boolean;
};

export default function ViewResourceButton({
  handleViewResource,
  isGeneratedByAI,
}: ViewResourceButtonProps) {
  return (
    <Tooltip
      label={isGeneratedByAI ? 'View the exercise' : 'View the online resource'}
      aria-label={
        isGeneratedByAI ? 'View the exercise' : 'View the online resource'
      }
      hasArrow
      placement="bottom"
      bg="gray.100"
      color="primary"
      fontSize={'sm'}
      p={1}
    >
      <Button
        leftIcon={<IconLunchLinkOpen />}
        variant="primary"
        onClick={(e) => {
          e.preventDefault();
          if (handleViewResource) {
            handleViewResource();
          }
        }}
      >
        View Resource
      </Button>
    </Tooltip>
  );
}
