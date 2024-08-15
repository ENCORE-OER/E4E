import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { TiSortAlphabetically } from 'react-icons/ti';
import { IconBezierCurve } from '../../public/Icons/svgToIcons/iconBezierCurve';
import { IconCalendarCheck } from '../../public/Icons/svgToIcons/iconCalendarCheck';
import { IconMedal } from '../../public/Icons/svgToIcons/iconMedal';
import { IconThumbsUp } from '../../public/Icons/svgToIcons/iconThumbsUp';
import {
  OerFreeSearchProps,
  OerProps,
  SortingDropDownMenuItemProps,
} from '../../types/encoreElements';
import { sortOers, useHasHydrated } from '../../utils/utils';
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

  const isFirstRender = useRef<number>(0); // used to avoid the useEffect to be triggered at the first render
  const hydrated = useHasHydrated();

  // items for Sorting DropDown menu
  const menuItemsSorting: Array<SortingDropDownMenuItemProps> = [
    //{ icon: IconBezierCurve, name: 'Suggested' },
    //{ icon: IconBezierCurve, name: 'Relevance' },
    { icon: IconMedal, name: 'Quality Score' },
    { icon: IconThumbsUp, name: 'Likes' },
    { icon: IconBezierCurve, name: 'Times Used' },
    { icon: TiSortAlphabetically, name: 'Title' },
    { icon: IconCalendarCheck, name: 'Last Update' },
  ];

  // useEffect(() => {
  //   if (filtered !== undefined) {
  //     try {
  //       //alert(`selectedSorting: ${selectedSorting} \n isAscending: ${isAscending}`)
  //       if (setIsLoading !== undefined) {
  //         setIsLoading(true);
  //       }
  //       // if (setViewChanged !== undefined) {
  //       //   setViewChanged(true);
  //       // }
  //       const sortedData = sortOers(filtered, selectedSorting, isAscending);

  //       //console.log(filtered);
  //       //console.log(sortedData);

  //       if (setFiltered !== undefined) {
  //         setFiltered(sortedData);
  //       }
  //       console.log("I'm triggering oersById/filtered");
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       if (setIsLoading !== undefined) {
  //         setIsLoading(false);
  //       }
  //     }
  //   }
  // }, [])

  // sorting of the OERs
  useEffect(() => {
    console.log('RENDERRRRRRRRRRRRRRRRRRRRR');
    console.log('SELECTED SORTING: ', selectedSorting);
    console.log('IS ASCENDING: ', isAscending);

    if (isFirstRender.current < 2) {
      console.log('Render OerCardsSorting.tsx');
      isFirstRender.current++;
    }
    // LOGIC: if filtered is passed as a prop, that means that the user is in the 'Your resources' page
    else if (filtered !== undefined) {
      try {
        //alert(`selectedSorting: ${selectedSorting} \n isAscending: ${isAscending}`)
        if (setIsLoading !== undefined) {
          setIsLoading(true);
        }
        // if (setViewChanged !== undefined) {
        //   setViewChanged(true);
        // }
        const sortedData = sortOers(filtered, selectedSorting, isAscending);

        //console.log(filtered);
        //console.log(sortedData);

        if (setFiltered !== undefined) {
          setFiltered(sortedData);
        }
        console.log("I'm triggering oersById/filtered");
      } catch (error) {
        console.error(error);
      } finally {
        if (setIsLoading !== undefined) {
          setIsLoading(false);
        }
      }
    }
  }, [selectedSorting, isAscending]);

  // to reset sorting when the collection is changed in 'Your resources' page
  useEffect(() => {
    //alert("OerCardsSorting")
    //console.log('viewChanged: ' + viewChanged);
    if (viewChanged && setViewChanged !== undefined) {
      //setSelectedSorting('Relevance');
      setAscending(false);
      setViewChanged(false);
      //console.log("I'm triggering viewChanged to false");
    }
  }, [viewChanged]);

  return (
    <>
      {hydrated && (
        <SortingDropDownMenu
          menuItemsSorting={menuItemsSorting}
          handleItemSortingClick={handleItemSortingClick}
          isAscending={isAscending}
          wMenu="250px"
          viewChanged={viewChanged}
          setViewChanged={setViewChanged}
        />
      )}
    </>
  );
}
