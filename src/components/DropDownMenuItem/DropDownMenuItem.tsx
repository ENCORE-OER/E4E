import { Checkbox } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';
import {
  OerAudienceInfo,
  OerDomainInfo,
  OerMediaTypeInfo,
  OerSubjectInfo,
} from '../../types/encoreElements';

export type optionsObjType =
  | OerAudienceInfo
  | OerDomainInfo
  | OerSubjectInfo
  | OerMediaTypeInfo;

type DropDownMenuItemProps = {
  idItem?: number;
  item: string;
  options?: string[] | number[];
  optionsObj?: optionsObjType[];
  selectedOptions: string[];
  setSelectedOptions: Dispatch<SetStateAction<string[]>>;
  selectedOptionIds?: number[];
  setSelectedOptionIds: Dispatch<SetStateAction<number[]>>;
};

export default function DropDownMenuItem({
  idItem,
  item,
  //options,
  optionsObj,
  selectedOptions,
  setSelectedOptions,
  setSelectedOptionIds,
}: DropDownMenuItemProps) {
  // to handle when we click on the checkbox
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    /*if (options) {
      if (item === options[0]) {
        if (e.target.checked) {
          setSelectedOptions(options);
        } else {
          setSelectedOptions([]);
        }
      } else {
        if (e.target.checked) {
          if (
            selectedOptions.length === options.length - 2 &&
            !selectedOptions.includes(options[0]) &&
            !selectedOptions.includes(item)
          ) {
            setSelectedOptions(options);
          } else {
            setSelectedOptions((prev) => [...prev, item]);
          }
        } else {
          setSelectedOptions((prev) =>
            prev.filter((option) => option != item && option != options[0])
          );
        }
      }
    } else*/ if (optionsObj) {
      if (item === optionsObj[0].name) {
        if (e.target.checked) {
          setSelectedOptions(
            optionsObj.map((item: optionsObjType) => item.name)
          );
          setSelectedOptionIds(
            optionsObj.map((item: optionsObjType) => item.id)
          );
        } else {
          setSelectedOptions([]);
          setSelectedOptionIds([]);
        }
      } else {
        if (e.target.checked) {
          if (
            selectedOptions.length === optionsObj.length - 2 &&
            !selectedOptions.includes(optionsObj[0].name) &&
            !selectedOptions.includes(item)
          ) {
            setSelectedOptions(
              optionsObj.map((item: optionsObjType) => item.name)
            );
            setSelectedOptionIds(
              optionsObj.map((item: optionsObjType) => item.id)
            );
          } else {
            setSelectedOptions((prev) => [...prev, item]);
            if (idItem)
              // This part could be delete. idItem useful?
              setSelectedOptionIds((prev) => [...prev, idItem]);
          }
        } else {
          setSelectedOptions((prev) =>
            prev.filter(
              (option) => option != item && option != optionsObj[0].name
            )
          );
          setSelectedOptionIds(
            (
              prev // This part could be delete. idItem useful?
            ) =>
              prev.filter(
                (option) => option != idItem && option != optionsObj[0].id
              )
          );
        }
      }
    }
  };

  /*useEffect(() => {
    console.log('SELECTED OPTIONS OBJ:' + selectedOptions);
    if (optionsObj) {
      try {
        optionsObj.map((item: any) => {
          if (selectedOptions.includes(item.name)) {
            setSelectedOptionIds((prev) => [...prev, item.id]);
          }
        });
      } catch (error) {
        throw error;
      }
    }
  }, [selectedOptions]);*/

  return (
    <>
      <Checkbox
        isChecked={selectedOptions.includes(item)}
        onChange={handleChange}
      >
        {item}
      </Checkbox>
    </>
  );
}
