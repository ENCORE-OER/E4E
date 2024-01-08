import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {
  AddCollectionFunction,
  AddResourceFunction,
  CollectionModalProps,
  CollectionProps,
  OerInCollectionProps,
} from '../../../types/encoreElements';
import { CustomToast } from '../../../utils/Toast/CustomToast';
import { useHasHydrated } from '../../../utils/utils';

interface NewCollectionModalProps extends CollectionModalProps {
  oerToAddCollection: OerInCollectionProps; // this is the oer with only the info needed to add it to the collection
  isFolderButton: boolean; // to understood if this page is call by folder button in resource page
  maxLength: number; // max length of the collection name
  collections: CollectionProps[];
  addResource: AddResourceFunction;
  addCollection: AddCollectionFunction;
  //setTimes_used?: Dispatch<SetStateAction<number>>;
  //getCount?: (id: number) => Promise<number>;
}

export default function NewCollectionModal({
  onClose,
  oerToAddCollection,
  isOpen,
  isFolderButton,
  maxLength,
  collections,
  addResource,
  addCollection,
  //setTimes_used,
  //getCount,
}: NewCollectionModalProps) {
  //const { isOpen, onClose } = useDisclosure();
  const [nameCollection, setNameCollection] = useState<string>('');
  const [newIdCollection, setNewIdCollection] = useState<number>(-1);
  const [countClick, setCountClick] = useState<number>(0); // to count click on "done" button

  const hydrated = useHasHydrated();
  const { addToast } = CustomToast();

  const handleSaveResource = async () => {
    if (nameCollection) {
      const id_new = Math.random();
      //console.log('Id collection' + id_new);
      setNewIdCollection(id_new);
      const collectionColor =
        '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).slice(1, 7); // random color generator
      await addCollection(id_new, nameCollection, collectionColor);
      //await addResource(id_new, oerToAddCollection);

      onClose();
    } else {
      addToast({
        message: 'Write a name for the collection!',
        type: 'error',
      });
    }
  };

  const handleCloseCollectionModal = () => {
    onClose();
  };

  useEffect(() => {
    if (hydrated) {
      /*addToast({
        message: `"${collections[newIdCollection]?.name}" collection created`,
        status: "success"
      })*/
      if (!isFolderButton) {
        //console.log("New Collection id: " + collections[collections.length - 1].id)
        //console.log("newIdCollection: " + newIdCollection);

        const fetchData = async () => {
          await addResource(newIdCollection, oerToAddCollection);
          // const count = await getCount(oerToAddCollection.id);
          // setTimes_used(count);
          // console.log('count: ' + count);
        };

        fetchData();

        //addResource(newIdCollection, oerToAddCollection);
        //alert(`Resource added to "${nameCollection}" collection`)
      }
    }
  }, [collections]);

  return (
    <Modal isOpen={isOpen} onClose={handleCloseCollectionModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New Collection</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl
            isInvalid={
              (!nameCollection && countClick > 0) ||
              nameCollection.length === maxLength
            }
          >
            <FormLabel>Enter a name for the collection</FormLabel>
            <Input
              placeholder="New collection..."
              value={nameCollection}
              onChange={(e) => {
                //console.log(e.target.value);
                const newValue = e.target.value.slice(0, maxLength);
                setNameCollection(newValue);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  setCountClick(countClick + 1);
                  handleSaveResource();
                }
              }}
              errorBorderColor={
                nameCollection.length === maxLength ? 'orange.300' : 'red.300'
              }
            />
            {nameCollection.length === maxLength && (
              <FormErrorMessage color="orange.300">
                Length max 30!
              </FormErrorMessage>
            )}
            {!nameCollection && countClick > 0 && (
              <FormErrorMessage>
                Write a name for the collection!
              </FormErrorMessage>
            )}
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <HStack>
            <Button
              mr={3}
              disabled={false}
              onClick={(e) => {
                e.preventDefault();
                setCountClick(countClick + 1);
                handleSaveResource();
              }}
            >
              Done
            </Button>
            <Button onClick={handleCloseCollectionModal}>Cancel</Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
