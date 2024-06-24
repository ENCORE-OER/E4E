import { Text } from '@chakra-ui/react';

type LabelEmptyFieldTableProps = {
  label: string;
  fontSize?: string;
};

export default function LabelEmptyFieldTable({
  label,
  fontSize,
}: LabelEmptyFieldTableProps) {
  return (
    <Text
      fontWeight="light"
      fontSize={fontSize || 'small'}
      color={'gray.400'}
      cursor="default"
    >
      {label}
    </Text>
  );
}
