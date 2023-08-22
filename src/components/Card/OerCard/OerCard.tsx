import { Card } from '@chakra-ui/react';
import { ResourceCardProps } from '../../../types/encoreElements';
import OerCardBody from './OerCardBody';
import OerCardFooter from './OerCardFooter';
import OerCardHeader from './OerCardHeader';

export default function OerCard({
  id: idOer,
  description,
  creator: authors,
  retrieval_date: lastUpdate,
  overall_score: qualityScore,
  media_type: resourceType,
  title,
  digital_domain: showTagDigital,
  entrepreneurship_domain: showTagEntrepreneurial,
  green_domain: showTagGreen,
  maxHCard,
  mbCard,
  pxCard,
  gapGridCardFooter,
  noOfLinesTextCardBody,
  ptCardHeader,
  pyCardBody,
}: ResourceCardProps) {
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
