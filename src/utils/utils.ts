// Use this file to add any utility functions that you want to use in your project

import { useEffect, useState } from 'react';
import {
  GeneratedExerciseProps,
  Option,
  OptionsData,
} from '../types/encoreElements';

// fix zust persist issue https://github.com/pmndrs/zustand/issues/324
// if an error like Extra attributes from the server appear use this hook
export const useHasHydrated = () => {
  const [hasHydrated, setHasHydrated] = useState<boolean>(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  return hasHydrated;
};

export const isObject = (variable: any) => {
  return (
    typeof variable === 'object' &&
    !Array.isArray(variable) &&
    variable !== null
  );
};

export const zip = <T, K>(a: T[], b: K[]) =>
  a.map((k, i) => ({ first: k, second: b[i] }));

// Function to map the selected option to the corresponding index. Usually used to give a number to the API
export const mapOptionToNumber = (
  option: Option | null,
  enumObject: any
): number => {
  if (!option) return -1;
  return enumObject[option.title];
};

export const mapStringToString = (string: string, enumObject: any): string => {
  if (!string) return '';
  return enumObject[string];
};

export const stringArrayToOptionsObject = (
  apiFillGapsData: GeneratedExerciseProps
) => {
  const optionsObject = {} as OptionsData;
  apiFillGapsData.Solutions.forEach((solution) => {
    optionsObject[solution] = true;
  });
  apiFillGapsData.Distractors.forEach((distractor) => {
    optionsObject[distractor] = false;
  });
  apiFillGapsData.EasilyDiscardableDistractors.forEach((distractor) => {
    optionsObject[distractor] = false;
  });
  console.log('optionsObject', optionsObject);

  return optionsObject;
};
