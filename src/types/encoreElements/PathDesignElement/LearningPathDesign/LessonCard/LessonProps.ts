import { PassFailConditionsProps } from '.';

export type LessonProps = {
  lessonTitle: string;
  lessonType: string; // Specifies if learning, assessment or other
  activityType: string; // Specifies if Frontal Lecture, Group Discussion, Single-choice quix, etc...
  activityDescription: string;
  passFailConditions: PassFailConditionsProps[];
};
