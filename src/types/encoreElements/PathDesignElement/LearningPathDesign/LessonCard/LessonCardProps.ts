import { Dispatch, SetStateAction } from 'react';
import {
  activityTypesObjectsProps,
  LessonProps,
  OptionsTypeOfAssignmentProps,
  PassFailConditionsProps,
} from '.';

export type LessonCardProps = {
  data: LessonProps;
  handleData: Dispatch<SetStateAction<LessonProps[]>>;
  indexCard: number; // Specifies the order of the lessons
  isSmallerScreen?: boolean;
  handleAddCondition?: (
    index: number,
    newCondition: PassFailConditionsProps
  ) => {};
  handleOpenModal?: (index: number, conditionIndex: number | null) => void;
  isEditClicked?: boolean;
  editLessonIndex: number | null;
  handleEditLesson: (index: number) => void;
  isEditLessonPlanClicked: boolean;
  optionsTypeOfAssignment: OptionsTypeOfAssignmentProps[];
  activityTypes: activityTypesObjectsProps[];
  activityRef: (el: HTMLDivElement | null) => void;
};
