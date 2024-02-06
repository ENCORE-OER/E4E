import { useEffect, useState } from 'react';
import { APIV2 } from '../../../data/api';
import {
  OerAuthorsInfo,
  OerMediaTypeInfo,
  OerProps,
} from '../../../types/encoreElements';
import { OerFreeSearchProps } from '../../../types/encoreElements/oer/OerFreeSearch';
import { useHasHydrated } from '../../../utils/utils';
import SmallOerCard from './SmallOerCard';

type SmallSingleResourceCardProps = {
  oer: OerProps | OerFreeSearchProps | undefined;
  collectionColor: string;
  checkBookmark?: boolean;
  collectionsColor: string[] | string;
  updateLikeOER: boolean;
};

export default function SmallSingleResourceCard({
  oer,
  checkBookmark,
  collectionColor,
  collectionsColor,
  updateLikeOER,
}: //dataOer
  SmallSingleResourceCardProps) {
  //const { addResource, addCollection } = useCollectionsContext();
  //const [isSaved, setIsSaved] = useState(false);

  const hydrated = useHasHydrated();

  const [times_used, setTimes_used] = useState<number>(0);
  const [total_likes, setTotal_likes] = useState<number>(0);
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true); // to load the likes at the first render

  const creators = oer?.creator?.map(
    (item: OerAuthorsInfo) => item.full_name
  ) ?? ['Unknwon'];
  const mediaTypes =
    oer?.media_type?.map((item: OerMediaTypeInfo) => item.name) ?? [];

  const getCount = async (id: number) => {
    const api = new APIV2(undefined);
    const resp = await api.getCount(id);

    return resp;
  };

  const getLikes = async (id: number | undefined) => {
    if (id === undefined) return 0;
    const api = new APIV2(undefined);
    const resp = await api.getLikes(id);

    return resp;
  };

  useEffect(() => {
    if (oer !== undefined) {
      const fetchData = async () => {
        const count = await getCount(oer.id);
        setTimes_used(count);
        console.log('count: ' + count);
      };
      fetchData();
    }
  }, [collectionsColor]);

  useEffect(() => {
    if (oer !== undefined && isFirstRender) {
      const fetchData = async () => {
        const likes = await getLikes(oer.id);
        setTotal_likes(likes);
        setIsFirstRender(false);
        console.log('likes: ' + likes);
      };
      fetchData();
    } else if (oer !== undefined && updateLikeOER) {
      const fetchData = async () => {
        const likes = await getLikes(oer.id);
        setTotal_likes(likes);
        console.log('likes: ' + likes);
      };
      fetchData();
    }
  }, [updateLikeOER, isFirstRender]);

  return (
    <>
      {hydrated && (
        <SmallOerCard
          id={oer?.id ?? 0}
          checkBookmark={checkBookmark}
          collection_color={collectionColor ?? ''}
          digital_domain={oer?.digital_domain || false}
          entrepreneurship_domain={oer?.entrepreneurship_domain || false}
          green_domain={oer?.green_domain || false}
          title={oer?.title ?? ''}
          creator={(creators?.length ?? 0) > 0 ? creators : ['Unknown']}
          description={oer?.description ?? ''}
          retrieval_date={oer?.retrieval_date ?? ''}
          overall_score={oer?.overall_score ?? 0}
          media_type={(mediaTypes?.length ?? 0) > 0 ? mediaTypes : []}
          maxHCard="155px"
          maxWCard='350px'
          mbCard="2"
          pxCard="0px"
          ptCardHeader="0px"
          pyCardBody="0px"
          noOfLinesTextCardBody={1}
          gapGridCardFooter={1}
          times_used={times_used ?? 0}
          total_likes={total_likes ?? 0}
        />
      )}
    </>
  );
}
