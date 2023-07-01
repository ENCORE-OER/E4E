import { useTheme } from '@fluentui/react';
import { Handle, Position } from 'reactflow';
import { ConceptNode } from '../../../types/encore';
import Card from '../../Card/Card';
import { ReactFlowNodeProps } from '../ReactFlowNode';

type ReactFlowConceptNodeProps = ReactFlowNodeProps & ConceptNode;

const ReactFlowConceptNode = ({ id,data}: ReactFlowConceptNodeProps) => {
  
  const theme = useTheme();

  return (
    <Card
      className="Card-react-flow"
      style={{
        borderColor: theme.palette.yellowDark,
        background: `${theme.palette.orangeLight}08`,
      }}
    >
      {data ?.label}
      <div>{data ?.numOfResources}</div>
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </Card>
  );
};

export default ReactFlowConceptNode;
