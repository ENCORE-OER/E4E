import { SortingDropDownMenuItemProps } from "./SortingDropDownMenuItemProps";

export type SortingDropDownMenuProps = {
    menuItemsSorting: SortingDropDownMenuItemProps[];
    wMenu?: string;
    handleItemSortingClick: (sortingName: string) => void;
    isAscending?: boolean;
}