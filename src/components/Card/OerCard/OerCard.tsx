import { Card } from '@chakra-ui/react';
import { ResourceCardProps } from '../../../types/encoreElements';
import OerCardBody from './OerCardBody';
import OerCardFooter from './OerCardFooter';
import OerCardHeader from './OerCardHeader';

interface OerCardProps extends ResourceCardProps {
  checkBookmark?: boolean;
  isSmallerScreen?: boolean;  // used for the responsive design of the page (reduce number of resource type tags)
}

export default function OerCard({
  id: idOer,
  collection_color,
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
  //mbCard,
  pxCard,
  gapGridCardFooter,
  noOfLinesTextCardBody,
  ptCardHeader,
  pyCardBody,
  checkBookmark,
  times_used,
  total_likes,
  maxWCard,
  //minWCard,
  //wCard,
  //isSmallerScreen,
}: OerCardProps) {
  return (
    <Card
      display="flex"
      h={maxHCard || '195px'}
      //w={wCard}
      maxW={maxWCard || '550px'}
      //minW={minWCard || '550px'}
      px={pxCard || '20px'}
      py={0}
      //p={0}
      border="1px"
      key={idOer}
      borderColor="secondary"
      bg="white"
    //mb={mbCard || '5'}
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
        collection_color={collection_color}
        checkBookmark={checkBookmark}
      />
      <OerCardBody
        description={description}
        pyCardBody={pyCardBody}
        noOfLinesText={noOfLinesTextCardBody}
        minHCardBody="55px"
      />
      <OerCardFooter
        lastUpdate={lastUpdate}
        qualityScore={qualityScore}
        used={times_used}
        liked={total_likes}
        resourceType={resourceType}
        gapGrid={gapGridCardFooter}
      //maxResTypeTags={isSmallerScreen ? 2 : 3}
      />
    </Card>
  );
}
