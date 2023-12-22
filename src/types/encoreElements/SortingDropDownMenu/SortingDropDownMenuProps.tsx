import { Dispatch, SetStateAction } from 'react';
import { SortingDropDownMenuItemProps } from './SortingDropDownMenuItemProps';

export type SortingDropDownMenuProps = {
  menuItemsSorting: SortingDropDownMenuItemProps[];
  selectedSorting?: string;
  wMenu?: string;
  handleItemSortingClick: (sortingName: string) => void;
  isAscending?: boolean;
  viewChanged?: boolean;
  setViewChanged?: Dispatch<SetStateAction<boolean>>;
};
