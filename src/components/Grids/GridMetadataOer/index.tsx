import { Dispatch, SetStateAction } from 'react';
import GridMetadataCard from './GridMetadataCard';
import GridMetadataOerInfoModal from './GridMetadataOerInfoModal';

type GridMetadataOerProps = {
  gap?: number;
  lastUpdate: string;
  used: number;
  likes: number;
  qualityScore: number;
  isCardInfoModal: boolean;
  // setLikeOER: () => Promise<void>;
  // reduceLikeOER: () => Promise<void>;
  // getLikes: () => Promise<number>;
  toggleLikeOER?: () => Promise<void>;
  setUpdateLikeOER?: Dispatch<SetStateAction<boolean>>;
  isOERSaved?: boolean;
  isOERLiked?: boolean;
};

export default function GridMetadataOer({
  gap,
  lastUpdate,
  used,
  likes,
  qualityScore,
  isCardInfoModal,
  // setLikeOER,
  // reduceLikeOER,
  // getLikes,
  toggleLikeOER,
  setUpdateLikeOER,
  isOERSaved,
  isOERLiked,
}: GridMetadataOerProps) {
  return (
    <div>
      {isCardInfoModal && (
        <GridMetadataOerInfoModal
          gap={gap || 0}
          lastUpdate={lastUpdate || 'Unknown'}
          used={used || 0}
          likes={likes || 0}
          qualityScore={qualityScore || 0}
          // setLikeOER={setLikeOER}
          // reduceLikeOER={reduceLikeOER}
          // getLikes={getLikes}
          toggleLikeOER={toggleLikeOER}
          setUpdateLikeOER={setUpdateLikeOER}
          isOERSaved={isOERSaved}
          isOERLiked={isOERLiked}
        />
      )}
      {!isCardInfoModal && (
        <GridMetadataCard
          gap={gap || 0}
          lastUpdate={lastUpdate || 'Unknown'}
          used={used || 0}
          likes={likes || 0}
          qualityScore={qualityScore || 0}
        />
      )}
    </div>
  );
}
