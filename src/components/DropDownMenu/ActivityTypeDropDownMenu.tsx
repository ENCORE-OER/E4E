import { ChevronDownIcon } from '@chakra-ui/icons';
import {
    Button,
    Flex,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text
} from '@chakra-ui/react';
import { useState } from 'react';
import { useLearningPathDesignContext } from '../../Contexts/LearningPathDesignContext/LearningPathDesignContext';
import { useHasHydrated } from '../../utils/utils';

type ActivityTypeDropDownMenuProps = {
    // options: string[];
    title: string;
    onChange: (selectedIndex: number) => void;
};

export default function ActivityTypeDropDownMenu({
    // options,
    title,
    onChange,
}: ActivityTypeDropDownMenuProps) {
    const hydrated = useHasHydrated();
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const { activityTypes } = useLearningPathDesignContext();

    const handleSelect = (index: number) => {
        setSelectedOption(activityTypes[index]);
        onChange(index); // Chiamata alla funzione di callback con l'indice selezionato
    };

    return (
        <Flex w="100%" flex="1" borderRadius="lg">
            <Menu>
                <MenuButton
                    bg={'gray.100'}
                    borderRadius="lg"
                    w="fit-content"
                    fontSize="small"
                    fontWeight="normal"
                    py={0}
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                    _expanded={{ bg: 'gray.200' }}
                    textAlign="center"
                >
                    {(selectedOption || title) || <Text color="gray.400" fontWeight={"light"}>Type of Activity</Text>}
                </MenuButton>
                <MenuList borderRadius="lg">
                    {hydrated &&
                        activityTypes.map((activityType: string, index: number) => (
                            <MenuItem key={index} onClick={() => handleSelect(index)}>
                                {activityType}
                            </MenuItem>
                        ))}
                </MenuList>
            </Menu>
        </Flex>
    );
}
