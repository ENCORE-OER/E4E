import { Tooltip } from '@chakra-ui/react';
import TagSelectedResource, {
  TagSelectedResourceProps,
} from './TagSelectedResource';

export default function TagSelectedResourceTooltip({
  IconTag,
  label,
  oer,
}: TagSelectedResourceProps) {
  return (
    <Tooltip
      hasArrow
      placement="top"
      label={label}
      aria-label={label}
      //ml="1px"
      bg="white"
      color="primary"
      p={2}
      fontSize={'sm'}
      borderRadius={5}
      cursor="pointer"
    >
      <TagSelectedResource IconTag={IconTag} label={label} oer={oer} />
    </Tooltip>
  );
}
