/* To show all the oer cards */

import { VStack } from '@chakra-ui/react';
import { useHasHydrated } from '../../../utils/utils';
import SingleResourceCard from './SingleResourceCard';
import SmallSingleResourceCard from './SmallSingleResourceCard';

type ResourceCardsListProps = {
  oers: any[];
  isNormalSizeCard: boolean;
};

export default function ResourceCardsList({
  oers,
  isNormalSizeCard,
}: ResourceCardsListProps) {

  const hydrated = useHasHydrated();

  return (

    /* Usage of 2 differents SingleCard ("SingleResourceCard" and "SmallSingleResourceCard") just beacause the OerCardFooter is different. Problems using conditional variables */

    <>
      <VStack>
        {isNormalSizeCard &&
          hydrated &&
          oers?.map((oer: any, index: number) => (
            <SingleResourceCard key={index} oer={oer} />
          ))}

        {!isNormalSizeCard &&
          hydrated &&
          oers?.map((oer: any, index: number) => (
            <SmallSingleResourceCard
              key={index}
              oer={oer}
            />
          ))}
      </VStack>
    </>
  );

}


