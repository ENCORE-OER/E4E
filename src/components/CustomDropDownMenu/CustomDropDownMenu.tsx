import {
    Box,
    Button,
    //Flex,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
} from '@chakra-ui/react';

import { ChevronDownIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { useHasHydrated } from '../../utils/utils';
/*import {
    CollectionProps,
} from '../../types/encoreElements';*/
/*import {
    useCollectionsContext
} from '../CollectionsContext/CollectionsContext';*/

export type onDataType =
    | number
    | string
type ArrayProps = {
    name: string;
    // oers: OerInCollectionProps[];
    // conceptsSelected: OerConceptInfo[];
    // color?: string;
    // date?: Date;
};
type CollectionMenuProps = {
    initialTitle: string; // Titolo iniziale del menu
    data: ArrayProps[]; // Array di dati da scorrere nel menu
    options?: string[] | undefined;
    onData?: (data: string[] | number[]) => void;
};

export default function CustomDropDownMenu({
    initialTitle,
    data, // Usa il prop data per popolare il menu
    options,
    onData,
}: CollectionMenuProps) {
    //const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const [menuTitle, setMenuTitle] = useState(initialTitle);

    const [selectedOptions] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState(false); // for the open Menu
    //const { collections } = useCollectionsContext();
    const hydrated = useHasHydrated();

    const handleData = () => {
        if (onData) {
            onData(selectedOptions);
        }
    };
    const handleMenuItemClick = (item: ArrayProps) => {
        //setSelectedItem(item.name);
        setMenuTitle(item.name);
        handleToggleMenu(); // Chiudi il menu dopo la selezione, se necessario
    };

    const handleToggleMenu = () => {
        setIsOpen(!isOpen); // invert open menu state
    };

    useEffect(() => {
        handleData();
    }, [selectedOptions]);
    return (
        <>
            <Box flex="1">
                <Menu
                    isOpen={isOpen}
                    onOpen={handleToggleMenu}
                    onClose={handleToggleMenu}
                >
                    <MenuButton
                        as={Button}
                        rightIcon={<ChevronDownIcon />}
                        //w={buttonWidth}
                        w="100%"
                    >
                        {/* Could also use <Text align="left" overflow="hidden" whiteSpace="nowrap"> */}
                        <Text align="left" noOfLines={1}>
                            {selectedOptions.includes('All') &&
                                (options?.length === selectedOptions.length)
                                ? 'All'
                                : selectedOptions.length > 0
                                    ? selectedOptions.join(', ')
                                    : menuTitle // Utilizza il valore memorizzato in menuTitle
                            }
                        </Text>
                    </MenuButton>


                    <MenuList>
                        {hydrated && data?.map((item: ArrayProps, index: number) => (
                            <MenuItem key={index} onClick={() => handleMenuItemClick(item)}>
                                <Text>
                                    {item.name}
                                </Text>
                            </MenuItem>
                        ))}
                    </MenuList>
                </Menu>
            </Box>
        </>
    );
}
