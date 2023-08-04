import SmallOerCard from './SmallOerCard';

type SmallSingleResourceCardProps = {
    oer: any;
}


export default function SmallSingleResourceCard({
    oer
}: //dataOer
    SmallSingleResourceCardProps) {
    //const { addResource, addCollection } = useCollectionsContext();
    //const [isSaved, setIsSaved] = useState(false);

    return (
        <SmallOerCard
            idOer={oer?.id}
            showTagDigital={oer?.digital_domain || false}
            showTagEntrepreneurial={oer?.entrepreneurship_domain || false}
            showTagGreen={oer?.green_domain || false}
            title={oer?.title}
            authors={oer?.creator?.map((item: any) => item.full_name) || []}
            description={oer?.description}
            lastUpdate={oer?.retrieval_date}
            qualityScore={oer?.overall_score}
            resourceType={
                oer?.media_type?.map((item: any) => item.name) || []
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
