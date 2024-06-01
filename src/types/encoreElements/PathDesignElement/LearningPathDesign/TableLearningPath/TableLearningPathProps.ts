import { Dispatch, SetStateAction } from 'react';
import {
  LessonProps,
  OptionsTypeOfAssignmentProps,
  activityTypesObjectsProps,
} from '../LessonCard';

export interface TableLearningPathProps {
  titles: string[]; // title of the columns
  // data: DataTableLearningPathProps[];
  data: LessonProps[];
  // handleData: Dispatch<SetStateAction<DataTableLearningPathProps[]>>;
  handleData: Dispatch<SetStateAction<LessonProps[]>>;
  activityTypes: activityTypesObjectsProps[];
  optionsTypeOfAssignment: OptionsTypeOfAssignmentProps[];
  isEditLessonPlanClicked: boolean;
  handleAddContentClick: () => void;
  removeLessonActivity: (index: number) => void;
}
