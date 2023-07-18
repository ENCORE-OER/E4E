import { Card } from '@chakra-ui/react';
import OerCardBody from './OerCardBody';
import OerCardFooter from './OerCardFooter';
import OerCardHeader from './OerCardHeader';

type OerCardProps = {
  maxHCard?: string;
  pxCard?: string;
  mbCard?: string;
  idOer: number;
  description: string;
  authors: string[];
  title: string;
  resourceType: string[];
  lastUpdate: string;
  showTagDigital: boolean;
  showTagEntrepreneurial: boolean;
  showTagGreen: boolean;
  //isSaved?: boolean;
  //setIsSaved?: Dispatch<SetStateAction<boolean>>;
};

export default function OerCard({
  idOer,
  description,
  authors,
  lastUpdate,
  resourceType,
  title,
  showTagDigital,
  showTagEntrepreneurial,
  showTagGreen,
  maxHCard,
  mbCard,
  pxCard,
}: OerCardProps) {
  return (
    <Card
      display="flex"
      maxH={'190px' || maxHCard}
      maxW="550px"
      px={'20px' || pxCard}
      border="1px"
      key={idOer}
      borderColor="secondary"
      bg="white"
      mb={'5' || mbCard}
    >
      <OerCardHeader
        ptCardHeader="1.5"
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
        pyCardBody="1.5"
        noOfLinesText={2}
      />
      <OerCardFooter
        gapGrid={1}
        lastUpdate={lastUpdate}
        used={2}
        liked={2}
        resourceType={resourceType}
      />
    </Card>
  );
}
