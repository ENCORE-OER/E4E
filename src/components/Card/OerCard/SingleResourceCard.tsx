import OerCard from './OerCard';

type SingleResourceCardProps = {
  oer: any;
}


export default function SingleResourceCard({
  oer
}: //dataOer
  SingleResourceCardProps) {
  //const { addResource, addCollection } = useCollectionsContext();
  //const [isSaved, setIsSaved] = useState(false);

  return (
    <OerCard
      idOer={oer?.id}
      showTagDigital={oer?.digital_domain ?? false}
      showTagEntrepreneurial={oer?.entrepreneurship_domain ?? false}
      showTagGreen={oer?.green_domain ?? false}
      title={oer?.title}
      authors={oer?.creator?.map((item: any) => item.full_name) || []}
      description={oer?.description}
      lastUpdate={oer?.retrieval_date}
      qualityScore={oer?.overall_score}
      resourceType={
        oer?.media_type?.map((item: any) => item.name) || []
      }
    />
  );
}
