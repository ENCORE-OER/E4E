/* DropDown menu for the collection list in the conceptMapDesign and learningPathDesign pages */

import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';

import { useEffect, useState } from 'react';
import { IconArrowDownFilter } from '../../public/Icons/svgToIcons/iconArrowDownFilter';
import { CollectionProps } from '../../types/encoreElements';
import { useHasHydrated } from '../../utils/utils';
import { useCollectionsContext } from '../CollectionsContext/CollectionsContext';

type CollectionMenuProps = {
  indexCollection?: number;
};

export default function CollectionMenu({}: CollectionMenuProps) {
  const [selectedOption, setSelectedOption] = useState<string>('');
  //const [selectedOptionId, setSelectedOptionId] = useState<number>();
  const [isOpen, setIsOpen] = useState(false); // for the open Menu
  //const [collectionIndex, setCollectionIndex] = useState<number>(0);
  //const [prevCollectionIndex, setPrevCollectionIndex] =
  useState<number>(9999999999999);
  //const [collectionClicked, setCollectionClicked] = useState<boolean>(false);

  const { collections, setIndexCollectionClicked } = useCollectionsContext();
  const hydrated = useHasHydrated(); // used to avoid hydration failed

  const handleToggleMenu = () => {
    setIsOpen(!isOpen); // invert open menu state
  };

  /*
  // handle which collection is clicked to show the right data
  const handleCollectionClick = () => {
    console.log('1: ' + collectionClicked);
    console.log('1 index: ' + collectionIndex);
    console.log('1 prev index: ' + prevCollectionIndex);

    if (!collectionClicked) {
      setCollectionClicked(true);
    } else if (collectionClicked && collectionIndex !== prevCollectionIndex) {
      setCollectionClicked(true);
    }

    setPrevCollectionIndex(collectionIndex);

    console.log('2: ' + collectionClicked);
    console.log('2 index: ' + collectionIndex);
    console.log('2 prev index: ' + prevCollectionIndex);
  };
  */

  useEffect(() => {
    setIndexCollectionClicked(-1);
  }, []);

  return (
    <>
      <Box display="flex">
        <Menu
          isOpen={isOpen}
          onOpen={handleToggleMenu}
          onClose={handleToggleMenu}
        >
          <MenuButton
            as={Button}
            variant="dropdown"
            rightIcon={<IconArrowDownFilter />}
            //w={buttonWidth}
            w="200px"
            bg="white"
          >
            {/* Could also use <Text align="left" overflow="hidden" whiteSpace="nowrap"> */}
            <Text align="left" noOfLines={1}>
              {selectedOption !== '' ? selectedOption : 'Select collection'}
            </Text>
          </MenuButton>
          <MenuList
            maxH="15rem"
            //maxW="100px"
            overflowY="auto"
            whiteSpace="pre-wrap"
            overflowWrap={'normal'}
          >
            {hydrated &&
              collections?.map((collection: CollectionProps, index: number) => (
                <MenuItem
                  key={collection.id}
                  onClick={(e: any) => {
                    e.preventDefault();
                    //setCollectionIndex(index);
                    setSelectedOption(collection.name);
                    setIndexCollectionClicked(index);
                    //handleCollectionClick();
                  }}
                >
                  {collection.name}
                </MenuItem>
              ))}
          </MenuList>
        </Menu>
      </Box>
    </>
  );
}
