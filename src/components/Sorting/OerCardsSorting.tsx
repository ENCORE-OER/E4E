import { Dispatch, SetStateAction, useEffect } from 'react';
import { IconBezierCurve } from '../../public/Icons/svgToIcons/iconBezierCurve';
import { IconCalendarCheck } from '../../public/Icons/svgToIcons/iconCalendarCheck';
import { IconMedal } from '../../public/Icons/svgToIcons/iconMedal';
import { IconThumbsUp } from '../../public/Icons/svgToIcons/iconThumbsUp';
import {
  OerFreeSearchProps,
  OerProps,
  SortingDropDownMenuItemProps,
} from '../../types/encoreElements';
import SortingDropDownMenu from '../DropDownMenu/SortingDropDownMenu';

type OerCardsSortingProps = {
  setIsLoading?: Dispatch<SetStateAction<boolean>>;
  filtered?: (OerProps | undefined | OerFreeSearchProps)[];
  setFiltered?: Dispatch<
    SetStateAction<(OerProps | undefined | OerFreeSearchProps)[]>
  >;
  viewChanged?: boolean;
  setViewChanged?: Dispatch<SetStateAction<boolean>>;
  selectedSorting?: string;
  setSelectedSorting?: Dispatch<SetStateAction<string>>;
  handleSortingChange?: (newSorting: string) => void;
  isAscending: boolean;
  setAscending: Dispatch<SetStateAction<boolean>>;
  handleItemSortingClick: (sortingName: string) => void;
};

export default function OerCardsSorting({
  setIsLoading,
  filtered,
  setFiltered,
  viewChanged,
  setViewChanged,
  selectedSorting,
  //setSelectedSorting,
  // handleSortingChange,
  isAscending,
  setAscending,
  handleItemSortingClick,
}: OerCardsSortingProps) {
  //const [isAscending, setAscending] = useState<boolean>(true);

  // items for Sorting DropDown menu
  const menuItemsSorting: Array<SortingDropDownMenuItemProps> = [
    //{ icon: IconBezierCurve, name: 'Suggested' },
    { icon: IconBezierCurve, name: 'Relevance' },
    { icon: IconBezierCurve, name: 'Title' },
    { icon: IconCalendarCheck, name: 'Last Update' },
    { icon: IconMedal, name: 'Quality Score' },
    { icon: IconThumbsUp, name: 'Likes' },
    { icon: IconBezierCurve, name: 'Times Used' },
  ];

  // sorting of the OERs
  useEffect(() => {
    // LOGIC: if filtered is passed as a prop, that means that the user is in the 'Your resources' page
    if (filtered !== undefined) {
      try {
        console.log('Sto ordinando');

        //alert(`selectedSorting: ${selectedSorting} \n isAscending: ${isAscending}`)
        if (setIsLoading !== undefined) {
          setIsLoading(true);
        }
        // if (setViewChanged !== undefined) {
        //   setViewChanged(true);
        // }
        const sortedData = [...(filtered ?? [])];
        sortedData?.sort(
          (
            a: OerProps | undefined | OerFreeSearchProps,
            b: OerProps | undefined | OerFreeSearchProps
          ) => {
            if (a !== undefined && b !== undefined) {
              switch (selectedSorting) {
                case 'Relevance':
                  return isAscending
                    ? a.title.localeCompare(b.title)
                    : b.title.localeCompare(a.title);
                case 'Title':
                  return isAscending
                    ? a.title.localeCompare(b.title)
                    : b.title.localeCompare(a.title);
                case 'Last Update':
                  return isAscending
                    ? a.retrieval_date.localeCompare(b.retrieval_date)
                    : b.retrieval_date.localeCompare(a.retrieval_date);
                case 'Quality Score':
                  return isAscending
                    ? (a.overall_score ?? 0) - (b.overall_score ?? 0)
                    : (b.overall_score ?? 0) - (a.overall_score ?? 0);
                case 'Likes':
                  return isAscending
                    ? (a.total_likes ?? 0) - b.total_likes ?? 0
                    : (b.total_likes ?? 0) - (a.total_likes ?? 0);
                case 'Times Used':
                  return isAscending
                    ? (a.times_used ?? 0) - (b.times_used ?? 0)
                    : (b.times_used ?? 0) - (a.times_used ?? 0);
                default:
                  return 0;
              }
            } else {
              return 0;
            }
            // if (selectedSorting === 'Last Update') {
            //   return isAscending
            //     ? a.retrieval_date.localeCompare(b.retrieval_date)
            //     : b.retrieval_date.localeCompare(a.retrieval_date);
            // } else if (selectedSorting === 'Title') {
            //   return isAscending
            //     ? a.title.localeCompare(b.title)
            //     : b.title.localeCompare(a.title);
            // } else if (selectedSorting === 'Quality Score') {
            //   return isAscending
            //     ? a.overall_score - b.overall_score
            //     : b.overall_score - a.overall_score;
            // } else {
            //   return 0;
            // }
          }
        );

        //console.log(filtered);
        //console.log(sortedData);

        if (setFiltered !== undefined) {
          setFiltered(sortedData);
        }
        //console.log("I'm triggering oersById/filtered");

        if (setIsLoading !== undefined) {
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }, [selectedSorting, isAscending]);

  // to reset sorting when the collection is changed in 'Your resources' page
  useEffect(() => {
    //alert("OerCardsSorting")
    //console.log('viewChanged: ' + viewChanged);
    if (viewChanged && setViewChanged !== undefined) {
      //setSelectedSorting('Relevance');
      setAscending(true);
      setViewChanged(false);
      //console.log("I'm triggering viewChanged to false");
    }
  }, [viewChanged]);

  return (
    <SortingDropDownMenu
      menuItemsSorting={menuItemsSorting}
      handleItemSortingClick={handleItemSortingClick}
      isAscending={isAscending}
      wMenu="250px"
      viewChanged={viewChanged}
    />
  );
}
