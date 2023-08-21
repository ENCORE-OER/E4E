import {
    Button,
    FormControl,
    FormLabel,
    HStack,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { CollectionModalProps, OerInCollectionProps } from '../../../types/encoreElements';
import { useHasHydrated } from '../../../utils/utils';
import { useCollectionsContext } from '../../CollectionsContext/CollectionsContext';

interface NewCollectionModalProps extends CollectionModalProps {
    oerToAddCollection: OerInCollectionProps;   // this is the oer with only the info needed to add it to the collection
    isFolderButton: boolean;    // to understood if this page is call by folder button in resource page
}

export default function NewCollectionModal({
    onClose,
    oerToAddCollection,
    isOpen,
    isFolderButton
}: NewCollectionModalProps) {
    //const { isOpen, onClose } = useDisclosure();
    const [nameCollection, setNameCollection] = useState<string>('');
    const [newIdCollection, setNewIdCollection] = useState<number>(-1);
    const { addCollection, addResource, collections } = useCollectionsContext();

    const hydrated = useHasHydrated();

    const handleSaveResource = async () => {
        const id_new = Math.random();
        //console.log('Id collection' + id_new);
        setNewIdCollection(id_new);
        await addCollection(id_new, nameCollection);
        //await addResource(id_new, oerToAddCollection);

        onClose();
    };

    const handleCloseCollectionModal = () => {
        onClose();
    };

    useEffect(() => {

        if (hydrated && !isFolderButton) {
            //console.log("New Collection id: " + collections[collections.length - 1].id)
            //console.log("newIdCollection: " + newIdCollection);

            //alert(`"${collections[newIdCollection]?.name}" collection created`)

            /*const fetchData = async () => {
                await addResource(newIdCollection, oerToAddCollection);
            };

            fetchData();*/


            addResource(newIdCollection, oerToAddCollection);

            //alert(`Resource added to "${nameCollection}" collection`)
        }

    }, [collections])

    return (

        <Modal isOpen={isOpen} onClose={handleCloseCollectionModal}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>New Collection</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel>First name</FormLabel>
                        <Input
                            placeholder="New collection..."
                            value={nameCollection}
                            onChange={(e) => {
                                //console.log(e.target.value);
                                setNameCollection(e.target.value);
                            }}
                        />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <HStack>
                        <Button
                            mr={3}
                            disabled={false}
                            onClick={(e) => {
                                e.preventDefault();
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
