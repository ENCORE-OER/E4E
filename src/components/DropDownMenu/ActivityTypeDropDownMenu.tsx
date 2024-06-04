import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { activityTypesObjectsProps } from '../../types/encoreElements';
import { useHasHydrated } from '../../utils/utils';

type ActivityTypeDropDownMenuProps = {
  // options: string[];
  activityTypes: activityTypesObjectsProps[];
  lessonType: string;
  title: string;
  onChange: (selectedIndex: number) => void;
};

export default function ActivityTypeDropDownMenu({
  // options,
  activityTypes,
  lessonType,
  title,
  onChange,
}: ActivityTypeDropDownMenuProps) {
  const hydrated = useHasHydrated();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  // const { activityTypes } = useLearningPathDesignContext();

  const handleSelect = (index: number) => {
    setSelectedOption(
      activityTypes.filter(
        (type: activityTypesObjectsProps) => type.lessonType === lessonType
      )[index]?.activityType
    );
    onChange(index);
  };

  useEffect(() => {
    handleSelect(-1);
  }, [lessonType]);

  return (
    <Flex w="100%" flex="1" borderRadius="lg">
      <Menu>
        <MenuButton
          bg={'gray.100'}
          borderRadius="lg"
          w="fit-content"
          fontSize="small"
          fontWeight="normal"
          size="sm"
          py={0}
          as={Button}
          rightIcon={<ChevronDownIcon />}
          _expanded={{ bg: 'gray.200' }}
          textAlign="center"
        >
          {selectedOption || title || (
            <Text color="gray.400" fontWeight={'light'}>
              Type of Activity
            </Text>
          )}
        </MenuButton>
        <MenuList
          borderRadius="lg"
          maxH={'200px'}
          overflowY={'auto'}
          w="fit-content"
        >
          {hydrated &&
            activityTypes
              .filter(
                (type: activityTypesObjectsProps) =>
                  type.lessonType === lessonType
              )
              .map((activityType: activityTypesObjectsProps, index: number) => (
                <MenuItem key={index} onClick={() => handleSelect(index)}>
                  {activityType.activityType}
                </MenuItem>
              ))}
        </MenuList>
      </Menu>
    </Flex>
  );
}
