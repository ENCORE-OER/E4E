import { LessonProps } from './LessonProps';
import { PassFailConditionsProps } from './PassFailConditionsProps';

export type LessonCardProps = {
  lesson: LessonProps;
  indexCard?: number; // Specifies the order of the lessons
  isSmallerScreen?: boolean;
  handleAddCondition?: (
    index: number,
    newCondition: PassFailConditionsProps
  ) => {};
  handleOpenModal?: () => void;
};
