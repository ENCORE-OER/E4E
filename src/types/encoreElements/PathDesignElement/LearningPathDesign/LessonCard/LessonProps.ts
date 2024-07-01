import { PassFailConditionsProps } from '.';
import { ContentProps } from './ContentProps';

export type LessonProps = {
  activityTitle?: string; // Topic or activity type as title?
  lessonType: string; // Specifies if learning, assessment or other
  activityType: string; // Specifies if Frontal Lecture, Group Discussion, Single-choice quix, etc...
  activityDescription: string;
  topic?: string;
  timeDuration: number;
  passFailConditions: PassFailConditionsProps[]; // At the moment only useful for the cards(tiles)
  compulsory?: boolean;
  content: ContentProps; // Links to the OERs?
};
