import {
  ContextLearningScenarioProps,
  ObjectiveLearningScenarioProps,
  PathLearningScenarioProps,
} from '.';

export type LearningScenarioProps = {
  Context: ContextLearningScenarioProps;
  Objective: ObjectiveLearningScenarioProps;
  Path: PathLearningScenarioProps;
  _id: string;
  _v?: number;
};
