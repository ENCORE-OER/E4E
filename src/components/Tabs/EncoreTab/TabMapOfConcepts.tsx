import { Flex, Stack, Text } from '@chakra-ui/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState
} from 'reactflow';
import 'reactflow/dist/style.css';
import { APIV2 } from '../../../data/api';
import { EncoreOer } from '../../../types/encore';
import ReactFlowConceptNode from '../../ReactFlowNode/ReactFlowConceptNode/ReactFlowConceptNode';


export type TabMapOfConceptsProps = {
  oers?: EncoreOer[];
};


const nodeTypes = {
  "conceptNode": ReactFlowConceptNode
}

const initialNodes = [
  {
    id: '1',
    type: "conceptNode",
    data: { numOfResources: 10, label: "node1" },
    position: { x: 250, y: 5 },
  },
  { id: '2', type: "conceptNode", data: { numOfResources: 10, label: 'Node 2' }, position: { x: 100, y: 100 } },
  { id: '3', type: "conceptNode", data: { numOfResources: 10, label: 'Node 3' }, position: { x: 400, y: 100 } },
  { id: '4', type: "conceptNode", data: { numOfResources: 10, label: 'Node 4' }, position: { x: 400, y: 200 } },
];

const initialEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
  },
  { id: 'e1-3', source: '1', target: '3' },
];

export const TabMapOfConcepts = (props: TabMapOfConceptsProps) => {
  const { oers } = props;

  // const [graph, setGraph] = useState<EncoreConceptMap | null>();
  const API = useMemo(() => new APIV2(undefined), []);
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(true);

  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);



  const onConnect = useCallback((params: any) => setEdges((els) => addEdge(params, els)), []);



  /*
    UseEffect is used to execute actions only if some states changes,
    in this case API and selected_oers
  */
  useEffect(() => {
    if (!oers) return;

    (async () => {
      setLoading(true);
      try {

        const oers_ids: any[] = [];
        oers?.forEach(oer => oers_ids.push(oer.id));

        const resp = await API.getConceptMapOersAI(oers_ids);

        const nodes = resp.data.nodes;
        const edges = resp.data.edges;

        console.log("nodes: " + JSON.stringify(resp.data.nodes));
        console.log("edges:" + JSON.stringify(resp.data.edges));

        const transformedNodes = nodes.map((item) => ({
          id: item.node_id,
          type: "conceptNode",
          data: { numOfResources: 10, label: item.name },
          position: { x: 100, y: 100 },
        }));


        const transformedEdges = edges.map((edge, index) => ({
          id: `e${index + 1}`,
          source: edge.from.toString(),
          target: edge.to.toString(),
        }));



        setNodes(transformedNodes);
        setEdges(transformedEdges);

        // setLoading(false);


      } catch (err) {
        // TODO: handle error
        alert("ERRORE ESTRAZIONE CONCETTI:" + err);
      }
    })();
  }, [API, oers]);




  return (
    <>
      <Stack spacing={0}>
        <Text color="primary">
          The Map of concepts shows which concepts are related to the keywords
          searched. Click on a concept word to visualize resources addressing
          the concept.
        </Text>
        <Text color="dark_grey">
          Concepts connected by lines are related. The number close to each
          concept indicate the number of resources addressing that concept.
        </Text>
      </Stack>


      <ReactFlowProvider>
        <Flex h={500}>
          <ReactFlow
            nodeTypes={nodeTypes}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            // onNodeClick={}
            fitView
          >

          </ReactFlow>
        </Flex>
      </ReactFlowProvider>
    </>
  );
};
