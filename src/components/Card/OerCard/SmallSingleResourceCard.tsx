import {
  OerAuthorsInfo,
  OerMediaTypeInfo,
  OerProps,
} from '../../../types/encoreElements';
import SmallOerCard from './SmallOerCard';

type SmallSingleResourceCardProps = {
  oer: OerProps;
  collectionColor?: string;
  checkBookmark?: boolean;
};

export default function SmallSingleResourceCard({
  oer,
  checkBookmark,
  collectionColor,
}: //dataOer
SmallSingleResourceCardProps) {
  //const { addResource, addCollection } = useCollectionsContext();
  //const [isSaved, setIsSaved] = useState(false);

  return (
    <SmallOerCard
      id={oer?.id}
      checkBookmark={checkBookmark}
      collection_color={collectionColor}
      digital_domain={oer?.digital_domain || false}
      entrepreneurship_domain={oer?.entrepreneurship_domain || false}
      green_domain={oer?.green_domain || false}
      title={oer?.title}
      creator={
        oer?.creator?.map((item: OerAuthorsInfo) => item.full_name) || []
      }
      description={oer?.description}
      retrieval_date={oer?.retrieval_date}
      overall_score={oer?.overall_score}
      media_type={
        oer?.media_type?.map((item: OerMediaTypeInfo) => item.name) || []
      }
      maxHCard="155px"
      mbCard="2"
      pxCard="0px"
      ptCardHeader="0px"
      pyCardBody="0px"
      noOfLinesTextCardBody={1}
      gapGridCardFooter={1}
    />
  );
}
