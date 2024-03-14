import { EdgePathLearningScenarioProps } from './EdgePathLearningScenario';
import { NodePathLearningScenarioProps } from './NodePathLearningScenario';

export type PathLearningScenarioProps = {
  Nodes: NodePathLearningScenarioProps[];
  Edges: EdgePathLearningScenarioProps[];
};
