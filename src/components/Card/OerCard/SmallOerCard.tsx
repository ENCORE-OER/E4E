import { Card } from '@chakra-ui/react';
import { ReourceCardProps } from '../../../types/encoreElements';
import OerCardBody from './OerCardBody';
import OerCardHeader from './OerCardHeader';
import SmallOerCardFooter from './SmallOerCardFooter';

export default function SmallOerCard({
  idOer,
  showTagDigital,
  showTagEntrepreneurial,
  showTagGreen,
  description,
  authors,
  lastUpdate,
  resourceType,
  title,
  //domain,
  maxHCard,
  mbCard,
  pxCard,
  ptCardHeader,
  pyCardBody,
  noOfLinesTextCardBody,
  gapGridCardFooter,
  qualityScore
}: //dataOer
  ReourceCardProps) {
  //const [showTagDigital, setShowTagDigital] = useState(false);
  //const [showTagEntrepreneurial, setShowTagEntrepreneurial] = useState(false);
  //const [showTagGreen, setShowTagGreen] = useState(false);
  //const { addResource, addCollection } = useCollectionsContext();
  //const [isSaved, setIsSaved] = useState(false);

  /*
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
  */

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
      <SmallOerCardFooter
        lastUpdate={lastUpdate}
        qualityScore={qualityScore}
        used={2}
        liked={2}
        resourceType={resourceType}
        gapGrid={gapGridCardFooter}
      />
    </Card>

    /* Creation of 2 differents SingleCard just beacause the OerCardFooter is different. Problem using condition variable */
  );
}
