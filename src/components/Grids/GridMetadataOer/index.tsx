import GridMetadataCard from "./GridMetadataCard";
import GridMetadataOerInfoModal from "./GridMetadataOerInfoModal";

type GridMetadataOerProps = {
    gap?: number;
    lastUpdate: string;
    used: number;
    likes: number;
    qualityScore: number;
    isCardInfoModal: boolean;
};

export default function GridMetadataOer(
    {
        gap,
        lastUpdate,
        used,
        likes,
        qualityScore,
        isCardInfoModal,
    }: GridMetadataOerProps
) {
    return (
        <div>
            {isCardInfoModal &&
                (<GridMetadataOerInfoModal
                    gap={gap || 0}
                    lastUpdate={lastUpdate || 'Unknown'}
                    used={used || 0}
                    likes={likes || 0}
                    qualityScore={qualityScore || 0}
                />
                )}
            {
                !isCardInfoModal &&
                (<GridMetadataCard
                    gap={gap || 0}
                    lastUpdate={lastUpdate || 'Unknown'}
                    used={used || 0}
                    likes={likes || 0}
                    qualityScore={qualityScore || 0}
                />)
            }
        </div>
    );
}