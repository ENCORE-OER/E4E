/* To show all the oer cards */

import { DeleteIcon } from '@chakra-ui/icons';
import { Box, Button, HStack, VStack, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { CollectionProps, OerProps } from '../../../types/encoreElements';
import { useHasHydrated } from '../../../utils/utils';
import CardInfoModal from '../../Modals/CardInfoModal';
import Pagination from '../../Pagination/pagination';
import SingleResourceCard from './SingleResourceCard';
import SmallSingleResourceCard from './SmallSingleResourceCard';

type ResourceCardsListProps = {
  oers: OerProps[];
  collection?: CollectionProps;
  isNormalSizeCard: boolean;
  itemsPerPage: number;
  collectionColor?: string;
  isResourcePage?: boolean;
  deleteResourceFromCollection?: (
    idCollection: number,
    idOer: number
  ) => Promise<void>;
};

export default function ResourceCardsList({
  oers,
  collection,
  isNormalSizeCard,
  itemsPerPage,
  collectionColor,
  isResourcePage,
  deleteResourceFromCollection,
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
  /////////////////////////////////////////////////////////////
  //const itemsPerPage = 5;
  const totalPages = Math.ceil(oers.length / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  /////////////////////////////////////////////////////////////

  const handleDeleteButtonClick = (idCollection: number, idOer: number) => {
    if (deleteResourceFromCollection) {
      deleteResourceFromCollection(idCollection, idOer);
    }
  };

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
                        if (collection) {
                          handleDeleteButtonClick(collection.id, oer.id);
                        }
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
