import { CircularProgress, Flex, Stack, Text } from '@chakra-ui/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState
} from 'reactflow';
import 'reactflow/dist/style.css';
import { APIV2 } from '../../../data/api';
import { EncoreOer } from '../../../types/encore';
import { ReactFlowFloatingEdge } from '../../ReactFlowEdge';
import { ReactFlowConceptNode } from '../../ReactFlowNode';

import ELK from 'elkjs';
import { v4 } from 'uuid';


export type TabMapOfConceptsProps = {
  oers?: EncoreOer[];
};

// const initialNodes = [
//   {
//     id: '1',
//     type: "conceptNode",
//     data: { numOfResources: 10, label: "node1" },
//     position: { x: 250, y: 5 },
//   },
//   { id: '2', type: "conceptNode", data: { numOfResources: 10, label: 'Node 2' }, position: { x: 100, y: 100 } },
//   { id: '3', type: "conceptNode", data: { numOfResources: 10, label: 'Node 3' }, position: { x: 400, y: 100 } },
//   { id: '4', type: "conceptNode", data: { numOfResources: 10, label: 'Node 4' }, position: { x: 400, y: 200 } },
// ];

// const initialEdges = [
//   {
//     id: 'e1-2',
//     source: '1',
//     target: '2',
//   },
//   { id: 'e1-3', source: '1', target: '3' },
// ];

export const TabMapOfConcepts = (props: TabMapOfConceptsProps) => {
  const { oers } = props;

  // const [graph, setGraph] = useState<EncoreConceptMap | null>();
  const API = useMemo(() => new APIV2(undefined), []);
  const [loading, setLoading] = useState(true);

  const nodeTypes = useMemo(() => ({ conceptNode: ReactFlowConceptNode }), []);
  const edgeTypes = useMemo(() => ({ floating: ReactFlowFloatingEdge }), []);

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

        const { nodes, edges } = resp.data;

        const elk = new ELK();

        // you can change algorithm: view https://www.eclipse.org/elk/reference/algorithms.html
        const graph = {
          id: 'root',
          layoutOptions: {
            'elk.algorithm': 'force',
          },
          children: nodes.map((n) => ({
            id: n.node_id + "",
            width: 20,
            height: 20,
            labels: [{ text: n.name }],
          })),
          edges: edges.map((e) => ({
            id: v4(),
            sources: [e.from + ""],
            targets: [e.to + ""],
          })),
        };

        console.log("nodes: " + JSON.stringify(resp.data.nodes));
        console.log("edges:" + JSON.stringify(resp.data.edges));

        const elkGraph = await elk.layout(graph);
        if (elkGraph.edges) {
          setEdges(
            elkGraph.edges.map((edge) => {
              return {
                id: edge.id,
                type: 'floating',
                source: edge.sources[0],
                target: edge.targets[0],
              };
            })
          );
        }
        if (elkGraph.children) {
          setNodes([
            ...elkGraph.children.map((node) => {
              return {
                ...node,
                type: 'conceptNode',
                position: {
                  x: node.x ?? 0,
                  y: node.y ?? 0,
                },
                data: {
                  label: node.labels?.[0].text ?? '',
                },
              };
            }),
          ]);
        }
        setLoading(false);

      } catch (err) {
        // TODO: handle error
        alert("ERRORE ESTRAZIONE CONCETTI:" + err);
      }
    })();
  }, [API, oers, setEdges, setNodes]);




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
        <Flex h={500} justifyContent={'center'}
          placeItems="center">
          {loading ? (
            <Flex direction={'column'} placeItems="center">
              <CircularProgress isIndeterminate color="blue.300" mb={2} />
              <Text fontWeight={'bold'} fontSize="lg">
                Generating graph...
              </Text>
            </Flex>
          ) : (
            <ReactFlow
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              // onNodeClick={}
              fitView
            >
              <Background variant={BackgroundVariant.Dots} />
              <Controls />
            </ReactFlow>)}
        </Flex>
      </ReactFlowProvider>
    </>
  );
};
