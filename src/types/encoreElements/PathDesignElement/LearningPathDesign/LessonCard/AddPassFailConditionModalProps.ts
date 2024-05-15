import { Dispatch, SetStateAction } from 'react';
import { PassFailConditionsProps } from './PassFailConditionsProps';

export type AddPassFailConditionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  indexCard: number | null;
  isPass: boolean;
  setIsPass: Dispatch<SetStateAction<boolean>>;
  condition: string;
  setCondition: Dispatch<SetStateAction<string>>;
  handleAddCondition: (
    index: number,
    newCondition: PassFailConditionsProps
  ) => void;
  handleOpenModal?: () => void;
};
