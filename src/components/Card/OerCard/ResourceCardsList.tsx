/* To show all the oer cards */

import { Box, VStack, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { OerProps } from '../../../types/encoreElements';
import { useHasHydrated } from '../../../utils/utils';
import CardInfoModal from '../../Modals/CardInfoModal';
import SingleResourceCard from './SingleResourceCard';
import SmallSingleResourceCard from './SmallSingleResourceCard';


type ResourceCardsListProps = {
  oers: OerProps[];
  isNormalSizeCard: boolean;
};

export default function ResourceCardsList({
  oers,
  isNormalSizeCard,
}: ResourceCardsListProps) {
  const hydrated = useHasHydrated();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [oerById, setOerById] = useState<OerProps | null>(null);

  const handleCloseCardInfoModal = () => {
    //setCardInfoModalOpen(false);
    onClose();
  };

  return (
    /* Usage of 2 differents SingleCard ("SingleResourceCard" and "SmallSingleResourceCard") just beacause the OerCardFooter is different. Problems using conditional variables */

    <>
      <VStack h="full" spacing={4} className='scrollable-content'>
        {isNormalSizeCard &&
          hydrated &&
          oers?.map((oer: OerProps, index: number) => (
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
        {/*<SingleResourceCard key={index} oer={oer} />*/}

        {!isNormalSizeCard &&
          hydrated &&
          oers?.map((oer: OerProps, index: number) => (
            <SmallSingleResourceCard key={index} oer={oer} />
          ))}
      </VStack>

      <CardInfoModal
        isOpen={isOpen}
        onClose={handleCloseCardInfoModal}
        oer={oerById}
      />
    </>
  );
}
