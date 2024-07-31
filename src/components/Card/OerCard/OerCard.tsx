import { Card } from '@chakra-ui/react';
import { ResourceCardProps } from '../../../types/encoreElements';
import OerCardBody from './OerCardBody';
import OerCardFooter from './OerCardFooter';
import OerCardHeader from './OerCardHeader';

interface OerCardProps extends ResourceCardProps {
  checkBookmark?: boolean;
  isAddContentModal?: boolean;
  handleCheckboxClick?: () => void;
  isSmallerScreen?: boolean; // used for the responsive design of the page (reduce number of resource type tags)
  isChecked?: boolean;
  isDisabled?: boolean;
}

export default function OerCard({
  id: idOer,
  collection_color,
  description,
  creator: authors,
  retrieval_date: lastUpdate,
  publication_date,
  overall_score: qualityScore,
  media_type: resourceType,
  assessment_oer_type,
  title,
  digital_domain: showTagDigital,
  entrepreneurship_domain: showTagEntrepreneurial,
  green_domain: showTagGreen,
  isGeneratedByAI,
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
  minWCard,
  //wCard,
  //isSmallerScreen,
  maxWCard,
  oer_url,
  isAddContentModal,
  handleCheckboxClick,
  isChecked,
  isDisabled,
}: OerCardProps) {
  return (
    <Card
      display="flex"
      h={maxHCard || '195px'}
      //w={wCard}
      maxW={maxWCard || '550px'}
      // maxW={isSmallerScreen ? "400px" : "550px"}
      minW={minWCard || '400px'}
      px={pxCard || '20px'}
      py={0}
      //p={0}
      border="1px"
      key={idOer}
      borderColor="secondary"
      bg="white"
    // flex="1"
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
        isGeneratedByAI={isGeneratedByAI}
        collection_color={collection_color}
        checkBookmark={checkBookmark}
        linkOer={oer_url}
        isAddContentModal={isAddContentModal}
        handleCheckboxClick={handleCheckboxClick}
        isChecked={isChecked}
        isDisabled={isDisabled}
      />
      <OerCardBody
        description={description}
        pyCardBody={pyCardBody}
        noOfLinesText={noOfLinesTextCardBody}
        minHCardBody="55px"
      />
      <OerCardFooter
        lastUpdate={lastUpdate || publication_date || ''}
        qualityScore={qualityScore}
        used={times_used}
        liked={total_likes}
        resourceType={
          assessment_oer_type ? [assessment_oer_type] : resourceType || []
        }
        gapGrid={gapGridCardFooter}
      //maxResTypeTags={isSmallerScreen ? 2 : 3}
      />
    </Card>
  );
}
