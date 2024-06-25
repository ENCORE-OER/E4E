import { Text } from '@chakra-ui/react';

type LabelEmptyFieldTableProps = {
  label: string;
  fontSize?: string;
  cursor?: string;
};

export default function LabelEmptyFieldTable({
  label,
  fontSize,
  cursor
}: LabelEmptyFieldTableProps) {
  return (
    <Text
      fontWeight="light"
      fontSize={fontSize || 'small'}
      color={'gray.400'}
      cursor={cursor || "default"}
    >
      {label}
    </Text>
  );
}
