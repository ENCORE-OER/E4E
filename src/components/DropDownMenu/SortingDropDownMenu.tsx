/* DropDown menu for sorting OERs filtered in Discover page */

import {
  Button,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {
  HiOutlineArrowNarrowDown,
  HiOutlineArrowNarrowUp,
} from 'react-icons/hi';
import { IconArrowDownFilter } from '../../public/Icons/svgToIcons/iconArrowDownFilter';
import {
  SortingDropDownMenuItemProps,
  SortingDropDownMenuProps,
} from '../../types/encoreElements/SortingDropDownMenu';
import SortingDropDownMenuItem from '../DropDownMenuItem/SortingDropDownMenuItem';

export default function SortingDropDownMenu({
  menuItemsSorting,
  wMenu,
  handleItemSortingClick,
  isAscending,
  viewChanged,
}: SortingDropDownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [itemSorting, setItemSorting] = useState<SortingDropDownMenuItemProps>(
    menuItemsSorting[0]
  );

  const handleToggleMenu = () => {
    setIsOpen(!isOpen); // invert open menu state
  };

  useEffect(() => {
    if (viewChanged) {
      setItemSorting(menuItemsSorting[0]);
      handleItemSortingClick(menuItemsSorting[0].name);
    }
  }, [viewChanged]);

  return (
    <Menu isOpen={isOpen} onOpen={handleToggleMenu} onClose={handleToggleMenu}>
      <MenuButton
        as={Button}
        variant="dropdown"
        rightIcon={<IconArrowDownFilter />}
        borderRadius="full"
        w={wMenu || '200px'}
        h="23px"
      >
        <HStack gap={1}>
          <Text fontSize="13px" color="primary" fontWeight="normal">
            {'Order by: '}
          </Text>
          <Icon as={itemSorting.icon} />
          <Text fontSize="13px" color="primary">
            {itemSorting.name}
          </Text>
          <Icon
            as={
              !isAscending ? HiOutlineArrowNarrowDown : HiOutlineArrowNarrowUp
            }
          />
        </HStack>
      </MenuButton>
      <MenuList w={wMenu || '200px'}>
        {menuItemsSorting.map(
          (item: SortingDropDownMenuItemProps, index: number) => (
            <MenuItem
              key={index}
              onClick={(e: any) => {
                e.preventDefault();
                setItemSorting(item);
                handleItemSortingClick(item.name);
              }}
              backgroundColor={item.name === itemSorting.name ? 'gray.200' : ''}
            >
              <SortingDropDownMenuItem icon={item.icon} name={item.name} />
            </MenuItem>
          )
        )}
      </MenuList>
    </Menu>
  );
}
