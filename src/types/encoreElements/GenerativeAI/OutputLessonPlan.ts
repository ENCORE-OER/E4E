export type OutputLessonPlanProps = {
  Type: boolean; // false = learning activity, true = assessment activity
  Topic: string;
  Details: string; // if this is a learning activity returns suggestions about the lesson (string), if it is an assessment activity returns the index of the activity regarding TypeOfActivity Enum (number)
  Duration: string;
};
