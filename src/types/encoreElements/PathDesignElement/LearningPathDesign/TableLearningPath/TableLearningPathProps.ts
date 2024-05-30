import { Dispatch, SetStateAction } from 'react';
import { DataTableLearningPathProps } from './DataTableLearningPath';

export interface TableLearningPathProps {
  titles: string[]; // title of the columns
  data: DataTableLearningPathProps[];
  handleData: Dispatch<SetStateAction<DataTableLearningPathProps[]>>;
  isEditLessonPlanClicked: boolean;
}
