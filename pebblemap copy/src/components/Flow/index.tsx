import { useCallback } from 'react';
import ReactFlow, {
  Node,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  ConnectionLineType,
} from 'reactflow';
import CustomNode from './CustomNode';

import styles from './Flow.module.css';

const initialNodes: Node[] = [
  // {
  //   id: '1',
  //   type: 'input',
  //   data: { label: 'Node 1' },
  //   position: { x: 250, y: 5 },
  // },
  // {
  //   id: '2',
  //   data: { label: 'Node 2' },
  //   position: { x: 100, y: 100 },
  // },
  // {
  //   id: '3',
  //   data: { label: 'Node 3' },
  //   position: { x: 400, y: 100 },
  // },
  // {
  //   id: '1',
  //   data: { label: 'Node 1', lol: function memes() { return console.log('hi') } },
  //   position: { x: 0, y: 0 },
  //   type: 'custom',
  //   selected: true,
  //   className: styles.customNode
  // },
];

const initialEdges: Edge[] = [
  // { id: 'e1-2', source: '1', target: '2' },
  // { id: 'e1-3', source: '1', target: '3' },
];

const nodeTypes = {
  custom: CustomNode,
};

const defaultEdgeOptions = {
  animated: true,
  type: 'smoothstep',
};

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const addNewNode = () => {
    //@ts-ignore
    setNodes((prevState) => {
      const a = prevState.concat({
        id: '1',
        data: { label: 'Click me to type!', updateNodes: setNodes, updateEdges: setEdges, edges, bgColor: '#9C95DC', textColor: 'white' },
        position: { x: 0, y: 0 },
        type: 'custom',
        selected: true,
        className: styles.customNode
      })
      return a;
    })
  }

  const proOptions = { hideAttribution: true };

  return (
    <div className={styles.flow}>
      <button onClick={() => addNewNode()}>click me bitch</button>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        defaultEdgeOptions={defaultEdgeOptions}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
      />
    </div>
  );
}

export default Flow;
