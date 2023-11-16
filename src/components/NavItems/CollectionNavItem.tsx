/* NavItems for the SideBar */

import { DeleteIcon } from '@chakra-ui/icons';
import { Button, Flex, HStack, Heading, Icon } from '@chakra-ui/react';
import {
  Dispatch,
  ReactText,
  RefObject,
  SetStateAction,
  useState
} from 'react';
import { FcFolder } from 'react-icons/fc';
import { CollectionProps } from '../../types/encoreElements';
import DeleteAlertDialog from '../Modals/DeleteAlertDialog';

interface CollectionNavItemProps {
  collection: CollectionProps;
  children?: ReactText | string;
  index: number;
  collectionRef: RefObject<HTMLDivElement>;
  setCollectionClicked: Dispatch<SetStateAction<boolean>>;
  collectionClicked: boolean;
  setCollectionIndex: Dispatch<SetStateAction<number>>;
  collectionIndex: number;
  deleteCollection: (id: number, name: string) => Promise<void>;
  setIsNewDataLoaded?: Dispatch<SetStateAction<boolean>>;
}

interface ItemToDeleteProps {
  collection_id: number;
  collection_name: string;
}

const CollectionNavItem = ({
  collection,
  children,
  index,
  collectionRef,
  setCollectionClicked,
  collectionClicked,
  collectionIndex,
  setCollectionIndex,
  deleteCollection,
}: CollectionNavItemProps) => {
  // handle the click on the collection
  //const [collectionClicked, setCollectionClicked] = useState<boolean>(false);
  //const [collectionIndex, setCollectionIndex] = useState<number>(-1);
  const [prevCollectionIndex, setPrevCollectionIndex] = useState<number>(-1);

  // handle deleting of a collection
  const [isDeleteAlertDialogOpen, setIsDeleteAlertDialogOpen] =
    useState<boolean>(false);
  const [itemToDelete, setItemToDelete] = useState<ItemToDeleteProps | null>(
    null
  );

  //const { deleteCollection } = useCollectionsContext();
  //const collectionRef = useRef<HTMLDivElement>(null);

  // handle which collection is clicked to show the right data
  const handleCollectionClick = () => {
    //console.log('1: ' + collectionClicked);
    //console.log('1 index: ' + collectionIndex);
    //console.log('1 prev index: ' + prevCollectionIndex);

    if (!collectionClicked) {
      setCollectionClicked(true);
    } else if (collectionClicked && collectionIndex !== prevCollectionIndex) {
      setCollectionClicked(true);
    }

    setPrevCollectionIndex(collectionIndex);

    //console.log('2: ' + collectionClicked);
    //console.log('2 index: ' + collectionIndex);
    //console.log('2 prev index: ' + prevCollectionIndex);
  };

  const onCloseDeleteAlertDialog = () => {
    setIsDeleteAlertDialogOpen(false);
  };

  const onOpenDeleteAlertDialog = (
    collection_id: number,
    collection_name: string
  ) => {
    setIsDeleteAlertDialogOpen(true);
    setItemToDelete({ collection_id, collection_name });
  };

  const handleDeleteCollection = (idColl: number, nameColl: string) => {
    if (collectionClicked) {
      setCollectionClicked(false);
    }
    deleteCollection(idColl, nameColl);
  };

  const handleDeleteButtonClick = (idColl: number, nameColl: string) => {
    if (collection.oers.length > 0 && collection.oers !== null) {
      onOpenDeleteAlertDialog(idColl, nameColl);
    } else {
      handleDeleteCollection(idColl, nameColl);
    }
  };

  return (
    <>
      <HStack
        ref={collectionRef}
        mb="3"
        w="100%"
        position="relative"
        borderLeft="5px"
        borderLeftColor={collection.color}
        borderLeftStyle={'solid'}
      //overflow="hidden"
      >
        <Flex
          w="100%"
          _hover={{ bg: 'gray.200', borderRadius: '5px' }}
          onClick={(e) => {
            e.preventDefault();
            //console.log("Click on CollectionNavItem");
            setCollectionIndex(index);
            //console.log("I'm triggering collectionIndex");
            handleCollectionClick();
          }}
          cursor={'pointer'}
        >
          <Icon as={FcFolder} w="30px" h="30px" mr="3" />
          <Heading
            fontSize="22px"
            fontWeight="semibold"
            noOfLines={1}
            //overflow={"hidden"}
            w={'65%'}
          >
            {children}
          </Heading>
        </Flex>

        <Button
          variant="ghost"
          _hover={{ bg: 'gray.300' }}
          onClick={(e) => {
            e.preventDefault();
            handleDeleteButtonClick(collection.id, collection.name);
          }}
          position="absolute"
          right={'0px'}
        >
          <DeleteIcon />
        </Button>
      </HStack>

      <DeleteAlertDialog
        isOpen={isDeleteAlertDialogOpen}
        onClose={onCloseDeleteAlertDialog}
        onConfirm={() => {
          if (itemToDelete) {
            handleDeleteCollection(
              itemToDelete.collection_id,
              itemToDelete.collection_name
            );
            setItemToDelete(null);
          }
          onCloseDeleteAlertDialog();
        }}
        item_name={itemToDelete ? itemToDelete.collection_name : ''}
        modalText='This collection is not empty. Are you sure you want to delete '
      />
    </>
  );
};

export default CollectionNavItem;
