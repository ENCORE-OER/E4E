import { OerProps } from '../../../types/encoreElements';
import OerCard from './OerCard';

type SingleResourceCardProps = {
  oer: OerProps;
};

export default function SingleResourceCard({
  oer,
}: //dataOer
SingleResourceCardProps) {
  //const { addResource, addCollection } = useCollectionsContext();
  //const [isSaved, setIsSaved] = useState(false);

  return (
    <OerCard
      id={oer?.id}
      digital_domain={oer?.digital_domain ?? false}
      entrepreneurship_domain={oer?.entrepreneurship_domain ?? false}
      green_domain={oer?.green_domain ?? false}
      title={oer?.title}
      creator={oer?.creator?.map((item: any) => item.full_name) || []}
      description={oer?.description}
      retrieval_date={oer?.retrieval_date}
      overall_score={oer?.overall_score}
      media_type={oer?.media_type?.map((item: any) => item.name) || []}
    />
  );
}
