import { Dispatch, MutableRefObject, SetStateAction } from 'react';
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
  editRowIndex: number | null;
  handleEditLesson: (index: number) => void;
  // handleSaveLesson: () => void;
  handleAddContentClick: (index: number) => void;
  removeLessonActivity: (index: number) => Promise<void>;
  isPrinting: boolean;
  loadUploadedFiles: (
    activityIndex: number,
    isLessonView: boolean
  ) => Promise<void>;
  activityRefs: MutableRefObject<
    (HTMLDivElement | null | HTMLTableRowElement)[]
  >;
}
