import { Flex, Icon, IconProps, Text } from '@chakra-ui/react';
import { IconType } from 'react-icons';

type AddContentTabLabelProps = {
  name: string;
  spacing?: number;
  iconTab?: IconType | (({ ...rest }: IconProps) => JSX.Element);
};

export default function AddContentTabLabel(props: AddContentTabLabelProps) {
  const { name, spacing, iconTab } = props;
  return (
    <Flex gap={spacing} justifyContent="center" alignItems="center">
      {iconTab && <Icon as={iconTab} />}
      <Text>{name}</Text>
    </Flex>
  );
}
