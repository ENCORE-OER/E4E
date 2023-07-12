import { Handle, Position } from 'reactflow';
import { ConceptNode } from '../../../types/encore';
import Card from '../../Card/Card';
import { ReactFlowNodeProps } from '../ReactFlowNode';

type ReactFlowConceptNodeProps = ReactFlowNodeProps & ConceptNode;

const ReactFlowConceptNode = ({ data }: ReactFlowConceptNodeProps) => {

  const { label, numOfResources } = data;

  return (
    <Card
      className="Card-react-flow"
      style={{
        borderColor: "yellow",
        background: `lightYellow`,
      }}
    >
      {label}
      <div>{numOfResources}</div>
      <Handle type="source" position={Position.Right} style={{ opacity: 0 }} />
      <Handle type="target" position={Position.Left} style={{ opacity: 0 }} />
    </Card>
  );
};

export default ReactFlowConceptNode;
