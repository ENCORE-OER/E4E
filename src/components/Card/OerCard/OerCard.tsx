import { Card } from '@chakra-ui/react';
import { ReourceCardProps } from '../../../types/encoreElements';
import OerCardBody from './OerCardBody';
import OerCardFooter from './OerCardFooter';
import OerCardHeader from './OerCardHeader';

export default function OerCard({
  idOer,
  description,
  authors,
  lastUpdate,
  qualityScore,
  resourceType,
  title,
  showTagDigital,
  showTagEntrepreneurial,
  showTagGreen,
  maxHCard,
  mbCard,
  pxCard,
  gapGridCardFooter,
  noOfLinesTextCardBody,
  ptCardHeader,
  pyCardBody,
}: ReourceCardProps) {
  return (
    <Card
      display="flex"
      maxH={maxHCard || '190px'}
      maxW="550px"
      px={pxCard || '20px'}
      //p={0}
      border="1px"
      key={idOer}
      borderColor="secondary"
      bg="white"
      mb={mbCard || '5'}
    >
      <OerCardHeader
        ptCardHeader={ptCardHeader}
        title={title}
        authors={authors}
        //isSaved={isSaved}
        //setIsSaved={setIsSaved}
        showTagDigital={showTagDigital}
        showTagEntrepreneurial={showTagEntrepreneurial}
        showTagGreen={showTagGreen}
      />
      <OerCardBody
        description={description}
        pyCardBody={pyCardBody}
        noOfLinesText={noOfLinesTextCardBody}
      />
      <OerCardFooter
        lastUpdate={lastUpdate}
        qualityScore={qualityScore}
        used={2}
        liked={2}
        resourceType={resourceType}
        gapGrid={gapGridCardFooter}
      />
    </Card>
  );
}
