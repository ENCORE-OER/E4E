import { useEffect, useState } from 'react';
import { APIV2 } from '../../../data/api';
import {
  OerAuthorsInfo,
  OerMediaTypeInfo,
  OerProps,
} from '../../../types/encoreElements';
import { OerFreeSearchProps } from '../../../types/encoreElements/oer/OerFreeSearch';
import SmallOerCard from './SmallOerCard';

type SmallSingleResourceCardProps = {
  oer: OerProps | OerFreeSearchProps | undefined;
  collectionColor: string;
  checkBookmark?: boolean;
  collectionsColor: string[] | string;
};

export default function SmallSingleResourceCard({
  oer,
  checkBookmark,
  collectionColor,
  collectionsColor,
}: //dataOer
SmallSingleResourceCardProps) {
  //const { addResource, addCollection } = useCollectionsContext();
  //const [isSaved, setIsSaved] = useState(false);

  const [times_used, setTimes_used] = useState<number>(0);

  const getCount = async (id: number) => {
    const api = new APIV2(undefined);
    const resp = await api.getCount(id);

    return resp;
  };

  useEffect(() => {
    if (oer !== undefined) {
      const fetchData = async () => {
        setTimes_used(await getCount(oer.id));
      };
      fetchData();
    }
  }, [collectionsColor]);

  return (
    <SmallOerCard
      id={oer?.id ?? 0}
      checkBookmark={checkBookmark}
      collection_color={collectionColor ?? ''}
      digital_domain={oer?.digital_domain || false}
      entrepreneurship_domain={oer?.entrepreneurship_domain || false}
      green_domain={oer?.green_domain || false}
      title={oer?.title ?? ''}
      creator={
        oer?.creator?.map((item: OerAuthorsInfo) => item.full_name) || []
      }
      description={oer?.description ?? ''}
      retrieval_date={oer?.retrieval_date ?? ''}
      overall_score={oer?.overall_score ?? 0}
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
      times_used={times_used}
      total_likes={oer?.total_likes ?? 0}
    />
  );
}
