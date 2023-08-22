/* To show all the oer cards */

import { Box, VStack, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { OerProps } from '../../../types/encoreElements';
import { useHasHydrated } from '../../../utils/utils';
import CardInfoModal from '../../Modals/CardInfoModal';
import Pagination from '../../Pagination/pagination';
import SingleResourceCard from './SingleResourceCard';
import SmallSingleResourceCard from './SmallSingleResourceCard';

type ResourceCardsListProps = {
  oers: OerProps[];
  isNormalSizeCard: boolean;
  itemsPerPage: number;
};

export default function ResourceCardsList({
  oers,
  isNormalSizeCard,
  itemsPerPage,
}: ResourceCardsListProps) {
  const hydrated = useHasHydrated();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [oerById, setOerById] = useState<OerProps | null>(null);

  const handleCloseCardInfoModal = () => {
    //setCardInfoModalOpen(false);
    onClose();
  };

  // handle pagination of the oers
  /////////////////////////////////////////////////////////////
  //const itemsPerPage = 5;
  const totalPages = Math.ceil(oers.length / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  /////////////////////////////////////////////////////////////

  return (
    /* Usage of 2 differents SingleCard ("SingleResourceCard" and "SmallSingleResourceCard") just beacause the OerCardFooter is different. Problems using conditional variables */

    <>
      {isNormalSizeCard &&
        hydrated && (
          <Box>
            <VStack h="full" spacing={4}>
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
                    <SingleResourceCard oer={oer} />
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
        )
      }

      {/*<SingleResourceCard key={index} oer={oer} />*/}

      {!isNormalSizeCard &&
        hydrated && (
          <Box>
            <VStack h="full" spacing={4} className='scrollable-content'>
              {oers?.slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              ).map((oer: OerProps, index: number) => (
                <SmallSingleResourceCard key={index} oer={oer} />
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
        )
      }

      <CardInfoModal
        isOpen={isOpen}
        onClose={handleCloseCardInfoModal}
        oer={oerById}
      />
    </>
  );
}
