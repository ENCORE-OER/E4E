import { Card } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import OerCardBody from './OerCardBody';
import OerCardFooter from './OerCardFooter';
import OerCardHeader from './OerCardHeader';

type ReourceCardProps = {
  idOer: number;
  description: string;
  authors: string[];
  title: string;
  resourceType: string[];
  lastUpdate: string;
  domain: string[];
  maxHCard?: string;
  pxCard?: string;
  mbCard?: string;
  ptCardHeader?: string;
  pyCardBody?: string;
  noOfLinesTextCardBody?: number;
  gapGridCardFooter?: number;
  //isNormalSizeCard?: boolean;
};

export default function SingleResourceCard({
  idOer,
  description,
  authors,
  lastUpdate,
  resourceType,
  title,
  domain,
  maxHCard,
  mbCard,
  pxCard,
  ptCardHeader,
  pyCardBody,
  noOfLinesTextCardBody,
  gapGridCardFooter,
}: //dataOer
ReourceCardProps) {
  const [showTagDigital, setShowTagDigital] = useState(false);
  const [showTagEntrepreneurial, setShowTagEntrepreneurial] = useState(false);
  const [showTagGreen, setShowTagGreen] = useState(false);
  //const { addResource, addCollection } = useCollectionsContext();
  //const [isSaved, setIsSaved] = useState(false);

  const digital = 'Digital';
  const entr = 'Entrepreneurship';
  const green = 'Green';

  useEffect(() => {
    try {
      for (let i = 0; i < domain?.length; i++) {
        if (domain[i] === digital) {
          setShowTagDigital(true);
        } else if (domain[i] === entr) {
          setShowTagEntrepreneurial(true);
        } else if (domain[i] === green) {
          setShowTagGreen(true);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }, [domain]); // Empty dependency array ensures the effect runs only once after initial render

  return (
    <Card
      display="flex"
      maxH={maxHCard || '190px'}
      maxW="550px"
      px={pxCard || '20px'}
      border="1px"
      key={idOer}
      borderColor="secondary"
      bg="white"
      mb={mbCard || '5'}
    >
      <OerCardHeader
        title={title}
        authors={authors}
        //isSaved={isSaved}
        //setIsSaved={setIsSaved}
        showTagDigital={showTagDigital}
        showTagEntrepreneurial={showTagEntrepreneurial}
        showTagGreen={showTagGreen}
        ptCardHeader={ptCardHeader}
      />
      <OerCardBody
        description={description}
        pyCardBody={pyCardBody}
        noOfLinesText={noOfLinesTextCardBody}
      />
      <OerCardFooter
        lastUpdate={lastUpdate}
        used={2}
        liked={2}
        resourceType={resourceType}
        gapGrid={gapGridCardFooter}
      />
    </Card>
  );
  {
    /*<OerCard
      idOer={idOer}
      showTagDigital={showTagDigital}
      showTagEntrepreneurial={showTagEntrepreneurial}
      showTagGreen={showTagGreen}
      title={title}
      authors={authors}
      description={description}
      lastUpdate={lastUpdate}
      resourceType={resourceType}
  />*/
  }
}
