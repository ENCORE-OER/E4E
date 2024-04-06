import { Card } from '@chakra-ui/react';
import { ResourceCardProps } from '../../../types/encoreElements';
import OerCardBody from './OerCardBody';
import OerCardHeader from './OerCardHeader';
import SmallOerCardFooter from './SmallOerCardFooter';

interface SmallOerCardProps extends ResourceCardProps {
  checkBookmark?: boolean;
}

export default function SmallOerCard({
  id: idOer,
  collection_color,
  description,
  creator: authors,
  retrieval_date: lastUpdate,
  publication_date,
  overall_score: qualityScore,
  media_type: resourceType,
  title,
  digital_domain: showTagDigital,
  entrepreneurship_domain: showTagEntrepreneurial,
  green_domain: showTagGreen,
  isGeneratedByAI,
  maxHCard,
  maxWCard,
  //mbCard,
  pxCard,
  gapGridCardFooter,
  noOfLinesTextCardBody,
  ptCardHeader,
  pyCardBody,
  checkBookmark,
  times_used,
  total_likes,
  assessment_oer_type,
}: //dataOer
SmallOerCardProps) {
  return (
    <Card
      display="flex"
      maxH={maxHCard || '190px'}
      maxW={maxWCard || '350px'}
      px={pxCard || '20px'}
      py={0}
      border="1px"
      key={idOer}
      borderColor="secondary"
      bg="white"
      //mb={mbCard || '5'}
    >
      <OerCardHeader
        title={title}
        authors={authors}
        //isSaved={isSaved}
        //setIsSaved={setIsSaved}
        showTagDigital={showTagDigital}
        showTagEntrepreneurial={showTagEntrepreneurial}
        showTagGreen={showTagGreen}
        isGeneratedByAI={isGeneratedByAI}
        ptCardHeader={ptCardHeader}
        collection_color={collection_color}
        checkBookmark={checkBookmark}
      />
      <OerCardBody
        description={description}
        pyCardBody={pyCardBody}
        noOfLinesText={noOfLinesTextCardBody}
        minHCardBody="22px"
      />
      <SmallOerCardFooter
        lastUpdate={lastUpdate || publication_date || ''}
        qualityScore={qualityScore}
        used={times_used}
        likes={total_likes}
        resourceType={
          assessment_oer_type ? [assessment_oer_type] : resourceType || []
        }
        gapGrid={gapGridCardFooter}
      />
    </Card>

    /* Creation of 2 differents SingleCard just beacause the OerCardFooter is different. Problem using condition variable */
  );
}
