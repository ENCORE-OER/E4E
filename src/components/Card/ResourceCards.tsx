/* To show all the oer cards */

import { VStack } from '@chakra-ui/react';
import { useHasHydrated } from '../../utils/utils';
import SingleResourceCard from './SingleResourceCard';
import SmallSingleResourceCard from './SmallSingleResourceCard';

type ResourceCardsProps = {
  oers: any[];
  isNormalSizeCard: boolean;
};

export default function ResourceCards({
  oers,
  isNormalSizeCard,
}: ResourceCardsProps) {
  const hydrated = useHasHydrated();
  return (
    <>
      <VStack>
        {isNormalSizeCard &&
          hydrated &&
          oers?.map((oer: any) => (
            <SingleResourceCard
              key={oer?.id}
              idOer={oer?.id}
              domain={
                oer?.skills?.flatMap(
                  (skill: any) =>
                    skill.domain?.map((domain: any) => domain.name)
                ) || []
              }
              title={oer?.title}
              authors={oer?.creator?.map((item: any) => item.full_name) || []}
              description={oer?.description}
              lastUpdate={oer?.retrieval_date}
              resourceType={
                oer?.media_type?.map((item: any) => item.name) || []
              }
            />
          ))}

        {!isNormalSizeCard &&
          hydrated &&
          oers?.map((oer: any) => (
            <SmallSingleResourceCard
              key={oer?.id}
              idOer={oer?.id}
              domain={
                oer?.skills?.flatMap(
                  (skill: any) =>
                    skill.domain?.map((domain: any) => domain.name)
                ) || []
              }
              title={oer?.title}
              authors={oer?.creator?.map((item: any) => item.full_name) || []}
              description={oer?.description}
              lastUpdate={oer?.retrieval_date}
              resourceType={
                oer?.media_type?.map((item: any) => item.name) || []
              }
              maxHCard="155px"
              mbCard="2"
              pxCard="0px"
              ptCardHeader="0px"
              pyCardBody="0px"
              noOfLinesTextCardBody={1}
              gapGridCardFooter={1}
            />
          ))}
      </VStack>
    </>
  );
}
