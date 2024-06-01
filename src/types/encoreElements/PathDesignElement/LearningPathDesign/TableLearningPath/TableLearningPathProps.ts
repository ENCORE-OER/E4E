import { Dispatch, SetStateAction } from 'react';
import { LessonProps } from '../LessonCard';

export interface TableLearningPathProps {
  titles: string[]; // title of the columns
  // data: DataTableLearningPathProps[];
  data: LessonProps[];
  // handleData: Dispatch<SetStateAction<DataTableLearningPathProps[]>>;
  handleData: Dispatch<SetStateAction<LessonProps[]>>;
  isEditLessonPlanClicked: boolean;
  handleAddContentClick: () => void;
}
