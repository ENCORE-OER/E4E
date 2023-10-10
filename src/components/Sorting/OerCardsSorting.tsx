import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { IconBezierCurve } from '../../public/Icons/svgToIcons/iconBezierCurve';
import { IconCalendarCheck } from '../../public/Icons/svgToIcons/iconCalendarCheck';
import { IconMedal } from '../../public/Icons/svgToIcons/iconMedal';
import { IconThumbsUp } from '../../public/Icons/svgToIcons/iconThumbsUp';
import {
  OerProps,
  SortingDropDownMenuItemProps,
} from '../../types/encoreElements';
import SortingDropDownMenu from '../DropDownMenu/SortingDropDownMenu';

type OerCardsSortingProps = {
  setIsLoading?: Dispatch<SetStateAction<boolean>>;
  filtered: OerProps[];
  setFiltered: Dispatch<SetStateAction<OerProps[]>>;
  viewChanged?: boolean;
  setViewChanged?: Dispatch<SetStateAction<boolean>>;
};

export default function OerCardsSorting({
  setIsLoading,
  filtered,
  setFiltered,
  viewChanged,
  setViewChanged,
}: OerCardsSortingProps) {
  const [isAscending, setAscending] = useState<boolean>(true);
  const [selectedSorting, setSelectedSorting] = useState<string>('Last Update');

  // items for Sorting DropDown menu
  const menuItemsSorting: Array<SortingDropDownMenuItemProps> = [
    { icon: IconCalendarCheck, name: 'Last Update' },
    { icon: IconThumbsUp, name: 'Likes' },
    { icon: IconMedal, name: 'Quality Score' },
    { icon: IconBezierCurve, name: 'Time Used' },
    { icon: IconBezierCurve, name: 'A-Z' },
  ];

  const handleItemSortingClick = (sortingName: string) => {
    if (sortingName === selectedSorting) {
      setAscending(!isAscending);
    } else {
      setSelectedSorting(sortingName);
      setAscending(true);
    }
  };

  // sorting of the OERs
  useEffect(() => {
    //alert(`selectedSorting: ${selectedSorting} \n isAscending: ${isAscending}`)
    if (setIsLoading) {
      setIsLoading(true);
    }
    const sortedData = [...filtered];
    sortedData.sort((a: OerProps, b: OerProps) => {
      if (selectedSorting === 'Last Update') {
        return isAscending
          ? a.retrieval_date.localeCompare(b.retrieval_date)
          : b.retrieval_date.localeCompare(a.retrieval_date);
      } else if (selectedSorting === 'A-Z') {
        return isAscending
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      } else if (selectedSorting === 'Quality Score') {
        return isAscending
          ? a.overall_score - b.overall_score
          : b.overall_score - a.overall_score;
      } else {
        return 0;
      }
    });

    //console.log(filtered);
    //console.log(sortedData);

    setFiltered(sortedData);

    if (setIsLoading) {
      setIsLoading(false);
    }
  }, [selectedSorting, isAscending, filtered, setFiltered, setIsLoading]);

  // to reset sorting when the collection is changed in 'Your resources' page
  useEffect(() => {
    //alert(`resetSortingMenu: ${resetSortingMenu}`)
    if (viewChanged && setViewChanged) {
      setSelectedSorting('Last Update');
      setAscending(true);
      setViewChanged(false);
    }
  }, [viewChanged, setViewChanged]);

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
