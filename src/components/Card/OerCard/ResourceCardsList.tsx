/* To show all the oer cards */

import { DeleteIcon } from '@chakra-ui/icons';
import { Box, Button, HStack, VStack, useDisclosure } from '@chakra-ui/react';
import { Dispatch, SetStateAction, useState } from 'react';
import { CollectionProps, OerProps } from '../../../types/encoreElements';
import { useHasHydrated } from '../../../utils/utils';
import CardInfoModal from '../../Modals/CardInfoModal';
import Pagination from '../../Pagination/pagination';
import SingleResourceCard from './SingleResourceCard';
import SmallSingleResourceCard from './SmallSingleResourceCard';

type ResourceCardsListProps = {
  oersById: OerProps[];
  collection?: CollectionProps;
  isNormalSizeCard: boolean;
  itemsPerPage: number;
  collectionColor?: string;
  isResourcePage?: boolean;
  handleDeleteButtonClick?: (
    collectionIndex: number,
    idOer: number
  ) => void;
  /*deleteResourceFromCollection?: (
    idCollection: number,
    idOer: number
  ) => Promise<void>;*/
  collectionIndex?: number;
  setViewChanged?: Dispatch<SetStateAction<boolean>>;
};

export default function ResourceCardsList({
  oersById: oers,
  //collection,
  isNormalSizeCard,
  itemsPerPage,
  collectionColor,
  isResourcePage,
  handleDeleteButtonClick,
  collectionIndex,
}: ResourceCardsListProps) {
  const hydrated = useHasHydrated();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [oerById, setOerById] = useState<OerProps | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleCloseCardInfoModal = () => {
    //setCardInfoModalOpen(false);
    onClose();
  };

  // handle pagination of the oers
  //-----------------------------------------------------------
  //const itemsPerPage = 5;
  const totalPages = Math.ceil(oers.length / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  //-----------------------------------------------------------


  /*useEffect(() => {
    console.log("--- ResourceCardsList --- \n collectionIndex-1: ", collectionIndex);
    console.log(new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds() + ":" + new Date().getMilliseconds());
  }, []);

  useEffect(() => {
    console.log("--- ResourceCardsList --- \n collectionIndex-2: ", collectionIndex);
  }, [collectionIndex])*/

  return (
    /* Usage of 2 differents SingleCard ("SingleResourceCard" and "SmallSingleResourceCard") just beacause the OerCardFooter is different. Problems using conditional variables */

    <>
      {isNormalSizeCard && hydrated && (
        <Box>
          <VStack h="full" spacing={4}>
            {oers
              ?.slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              )
              .map((oer: OerProps, index: number) => (
                <HStack key={index}>
                  <Box
                    onClick={async (e: any) => {
                      e.preventDefault();
                      onOpen();
                      // handleOpenCardInfoModal();
                      setOerById(oer);
                    }}
                    as="button"
                  >
                    <SingleResourceCard
                      collectionColor={collectionColor}
                      oer={oer}
                    />
                  </Box>
                  {isResourcePage && (
                    <Button
                      variant="ghost"
                      _hover={{ bg: 'gray.300' }}
                      onClick={(e) => {
                        e.preventDefault();
                        //alert("Click su delete");
                        //console.log("I'm triggering delete resource button");
                        if (
                          handleDeleteButtonClick &&
                          collectionIndex !== undefined &&
                          collectionIndex > -1
                        ) {
                          handleDeleteButtonClick(collectionIndex, oer.id);
                        } //else {
                        //alert("Non rispettato il primo if \n collectionIndex: " + collectionIndex)
                        //}
                      }}
                    //position="absolute"
                    //right={'0px'}
                    >
                      <DeleteIcon />
                    </Button>
                  )}
                </HStack>
              ))}
          </VStack>
          {oers.length !== 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </Box>
      )}

      {/*<SingleResourceCard key={index} oer={oer} />*/}

      {!isNormalSizeCard && hydrated && (
        <Box>
          <VStack h="full" spacing={4} className="scrollable-content">
            {oers
              ?.slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              )
              .map((oer: OerProps, index: number) => (
                <Box
                  key={index}
                  onClick={async (e: any) => {
                    e.preventDefault();
                    onOpen();
                    // handleOpenCardInfoModal();
                    setOerById(oer);
                  }}
                  as="button"
                >
                  <SmallSingleResourceCard
                    collectionColor={collectionColor}
                    oer={oer}
                  />
                </Box>
              ))}
          </VStack>
          {oers.length !== 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </Box>
      )}

      <CardInfoModal
        isOpen={isOpen}
        onClose={handleCloseCardInfoModal}
        oer={oerById}
      />
    </>
  );
}
