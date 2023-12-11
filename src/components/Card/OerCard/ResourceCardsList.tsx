/* To show all the oer cards */

import { DeleteIcon } from '@chakra-ui/icons';
import { Box, Button, HStack, VStack, useDisclosure } from '@chakra-ui/react';
import { Dispatch, SetStateAction, useState } from 'react';
import { OerProps } from '../../../types/encoreElements';
import { OerFreeSearchProps } from '../../../types/encoreElements/oer/OerFreeSearch';
import { useHasHydrated } from '../../../utils/utils';
import CardInfoModal from '../../Modals/CardInfoModal';
import Pagination from '../../Pagination/pagination';
import SingleResourceCard from './SingleResourceCard';
import SmallSingleResourceCard from './SmallSingleResourceCard';

type ResourceCardsListProps = {
  oers: (OerProps | undefined | OerFreeSearchProps)[];
  isNormalSizeCard: boolean;
  itemsPerPage: number;
  collectionsColor: string[] | string;
  isResourcePage: boolean;
  handleDeleteButtonClick?: (
    collectionIndex: number,
    idOer: number | undefined
  ) => void;
  collectionIndex?: number;
  oersLength: number | undefined;
  currentPage?: number;
  setCurrentPage?: Dispatch<SetStateAction<number>>;
  handlePageChange?: (newPage: number) => void;
};

export default function ResourceCardsList({
  oers,
  isNormalSizeCard,
  itemsPerPage,
  collectionsColor,
  isResourcePage,
  handleDeleteButtonClick,
  collectionIndex,
  oersLength,
  currentPage,
  //setCurrentPage,
  handlePageChange,
}: ResourceCardsListProps) {
  const hydrated = useHasHydrated();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [oerById, setOerById] = useState<
    OerProps | OerFreeSearchProps | null | undefined
  >(null);
  //const [currentPage, setCurrentPage] = useState<number>(1);

  const handleCloseCardInfoModal = () => {
    //setCardInfoModalOpen(false);
    onClose();
  };

  // handle pagination of the oers
  //-----------------------------------------------------------
  //const itemsPerPage = 5;
  const totalPages = Math.ceil((oersLength ?? 1) / itemsPerPage);

  /*const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };*/
  //-----------------------------------------------------------

  return (
    /* Usage of 2 differents SingleCard ("SingleResourceCard" and "SmallSingleResourceCard") just beacause the OerCardFooter is different. Problems using conditional variables */

    <>
      {isNormalSizeCard && hydrated && (
        <Box>
          <VStack h="full" spacing={4}>
            {currentPage &&
              oers
                // ?.slice(isResourcePage ?
                //   (currentPage - 1) * itemsPerPage : 0,
                //   isResourcePage ? (currentPage * itemsPerPage) : 10
                ?.slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map(
                  (
                    oer: OerProps | OerFreeSearchProps | undefined,
                    index: number
                  ) => (
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
                          collectionColor={
                            //collectionsColor[index] !== undefined ? collectionsColor[index] : ''
                            collectionsColor
                              ? isResourcePage && collectionsColor[0]
                                ? collectionsColor[0]
                                : //(currentPage) > 1
                                  // ? index + itemsPerPage * (currentPage - 1)
                                  // :
                                  collectionsColor[index] //this is the logic to color the iconBookmark of each card with the right color. Without this logic, the color of the iconBookmark is always only the first #itemsPerPage colors of the collectionsColor array
                              : ''
                          }
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
                              handleDeleteButtonClick(collectionIndex, oer?.id);
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
                  )
                )}
          </VStack>
          {oersLength !== 0 && (
            <Pagination
              currentPage={currentPage ?? 1}
              totalPages={totalPages}
              onPageChange={handlePageChange ?? (() => void 0)}
            />
          )}
        </Box>
      )}

      {/*<SingleResourceCard key={index} oer={oer} />*/}

      {!isNormalSizeCard && hydrated && (
        <Box>
          <VStack h="full" spacing={4} className="scrollable-content">
            {currentPage &&
              oers
                ?.slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                ?.map(
                  (
                    oer: OerProps | OerFreeSearchProps | undefined,
                    index: number
                  ) => (
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
                        collectionColor={
                          collectionsColor
                            ? isResourcePage
                              ? collectionsColor[0]
                              : collectionsColor[index]
                            : ''
                        }
                        oer={oer}
                      />
                    </Box>
                  )
                )}
          </VStack>
          {oers.length !== 0 && (
            <Pagination
              currentPage={currentPage ?? 1}
              totalPages={totalPages}
              onPageChange={handlePageChange ?? (() => void 0)}
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
