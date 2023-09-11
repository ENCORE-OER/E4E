import { CircularProgress, Flex, Stack, Text } from '@chakra-ui/react';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  NodeMouseHandler,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { APIV2 } from '../../../data/api';
import { ReactFlowFloatingEdge } from '../../ReactFlowEdge';
import { ReactFlowConceptNode } from '../../ReactFlowNode';

import ELK from 'elkjs';
import { v4 } from 'uuid';
import { DiscoveryContext } from '../../../Contexts/discoveryContext';
import { OerConceptInfo } from '../../../types/encoreElements/oer/OerConcept';
import { useHasHydrated } from '../../../utils/utils';

export type TabMapOfConceptsProps = {};

export const TabMapOfConcepts = ({ }: TabMapOfConceptsProps) => {
  const API = useMemo(() => new APIV2(undefined), []);
  const hydrated = useHasHydrated();
  const [loading, setLoading] = useState(true);

  const nodeTypes = useMemo(() => ({ conceptNode: ReactFlowConceptNode }), []);
  const edgeTypes = useMemo(() => ({ floating: ReactFlowFloatingEdge }), []);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const { filtered, setFiltered } = useContext(DiscoveryContext);

  const onConnect = useCallback(
    (params: any) => setEdges((els) => addEdge(params, els)),
    []
  );

  /*
    UseEffect is used to execute actions only if some states changes,
    in this case API and selected_oers
  */
  useEffect(() => {
    if (!filtered) return;

    (async () => {
      setLoading(true);
      try {
        const oers_ids: number[] = [];
        filtered?.forEach((oer: { id: number }) => oers_ids.push(oer.id));

        const respAI = await API.getConceptMapOersNLP(oers_ids);

        const { nodes, edges } = respAI.data;

        const elk = new ELK();

        // you can change algorithm: view https://www.eclipse.org/elk/reference/algorithms.html
        const graph = {
          id: 'root',
          layoutOptions: {
            'elk.algorithm': 'force',
            'position': 'CENTER',
            'zoom': '1.0',
          },
          children: nodes.map((n) => ({
            id: n.node_id + '',
            width: 20,
            height: 20,
            labels: [{ text: n.name }],
          })),
          edges: edges.map((e) => ({
            id: v4(),
            sources: [e.from + ''],
            targets: [e.to + ''],
          })),
        };

        console.log('nodes AI: ' + JSON.stringify(respAI.data.nodes));
        console.log('edges AI :' + JSON.stringify(respAI.data.edges));

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
        alert('ERROR EXTRACTING THE CONCEPTS:' + err);
      }
    })();
  }, [API, filtered, setEdges, setNodes]);

  // Define a function to handle node clicks
  const handleNodeClick: NodeMouseHandler = (event, node) => {
    // 'event' contains information about the click event
    // 'node' contains information about the clicked node

    const label = node.data.label;
    const filteredObjects = filtered.filter(
      (oer: { concepts: OerConceptInfo[] }) => {
        return oer.concepts.some((concept) => concept.label === label);
      }
    );

    setFiltered(filteredObjects);
  };

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

      {hydrated && filtered.length > 0 && (
        <ReactFlowProvider>
          <Flex h={500} justifyContent={'center'} placeItems="center">
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
                onNodeClick={handleNodeClick}
                fitView
              >
                <Background variant={BackgroundVariant.Dots} />
                <Controls />
              </ReactFlow>

            )}
          </Flex>
        </ReactFlowProvider>
      )}
    </>
  );
};
