import { memo, FC, CSSProperties, useState } from 'react';
import { Handle, Position, NodeProps, NodeResizer } from 'reactflow';
import { motion } from 'framer-motion';

import styles from './CustomNode.module.css';

const sourceHandleStyleBottom: CSSProperties = { bottom: 35, opacity: 0};
const sourceHandleStyleRight: CSSProperties = { top: 25, right: '-3px', opacity: 0 };
const sourceHandleStyleTop: CSSProperties = { top: '-3px', opacity: 0 };
const sourceHandleStyleLeft: CSSProperties = { top: 25, left: '-3px', opacity: 0};

const array = ['A cool new car', 'Fresh new sneakers', 'Your moms new chevy malibu']

const CustomNode: FC<NodeProps> = ({ id, data, xPos, yPos, selected }) => {

  const [nodeInput, setNodeInput] = useState(data.label);

  const inputChange = (e: any) => {
    setNodeInput(e.target.value)
  }

  const newN = () => {

    array.forEach((msg, i) => {
      let nodeCount: number;
      let newNodeId: string;
      let existingSources: number;
      let newSourceHandleId: string;

      // FIND EXISTING NODE SOURCES
      // @ts-ignore
      const sources = data.edges.find((stateNode => stateNode.source === id));
      if (sources > 0) {
        existingSources = sources;
      } else {
        existingSources = 0;
      }

      // UPDATE NODES
      // @ts-ignore
      data.updateNodes((prevState) => {
  
        // DESELECT ALL NODES
        // @ts-ignore
        const deselectedNodes = prevState.map(stateNode => {
          return {
            ...stateNode,
            selected: false
          }
        })
  
        nodeCount = deselectedNodes.length;
        newNodeId = `${nodeCount + 1}`;
        newSourceHandleId = `${existingSources + i + 1}`
  
        const pos = [
          { x: xPos + 0, y: yPos + 100 }, // 1
          { x: xPos + 300, y: yPos + 0 },
          { x: xPos + 0, y: yPos + -100 },
          { x: xPos + -300, y: yPos + 0 },
        ]
  
        const a = deselectedNodes.concat({
          id: newNodeId,
          data: { label: msg, updateNodes: data.updateNodes, updateEdges: data.updateEdges, edges: data.edges },
          position: pos[existingSources + i],
          type: 'custom',
          // selected: true,
          className: styles.customNode
        })
        return a;
      })
  
      // @ts-ignore
      data.updateEdges((prevState) => {
        // unselect all other nodes when inserting new one
        console.log(nodeCount, newNodeId)
        const th = {
          "1": "3t",
          "2": "4t",
          "3": "1t",
          "4": "2t"
        }
        //@ts-ignore
        const a = prevState.concat({ id: `e1-${newNodeId}`, source: id, sourceHandle: newSourceHandleId, target: newNodeId, targetHandle: th[newSourceHandleId] })
        return a;
      })
    }) 
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
    >
      <div className={styles.node} style={{ backgroundColor: data.bgColor }}>
        <div>
          <div>
            <textarea placeholder="Your next best idea..." value={ nodeInput } onChange={inputChange} className={ styles.nodeText } style={{ color: data.textColor }} />
          </div>
        </div>
        <Handle type="target" id="1t" position={Position.Bottom} style={sourceHandleStyleBottom} />
        <Handle type="target" id="2t" position={Position.Right} style={sourceHandleStyleRight} />
        <Handle type="target" id="3t" position={Position.Top} style={sourceHandleStyleTop} />
        <Handle type="target" id="4t" position={Position.Left} style={sourceHandleStyleLeft} />

        <Handle
          type="source"
          position={Position.Bottom}
          id="1"
          style={sourceHandleStyleBottom}
        />
        <Handle
          type="source"
          position={Position.Right}
          id="2"
          style={sourceHandleStyleRight}
        />
        <Handle
          type="source"
          position={Position.Top}
          id="3"
          style={sourceHandleStyleTop}
        />
        <Handle
          type="source"
          position={Position.Left}
          id="4"
          style={sourceHandleStyleLeft}
        />

      </div>
        <div className={ selected ? styles.nodeOptionsWrapper : styles.fadeout }>
          <div className={ styles.nodeOptions }>
            <button onClick={() => newN()}>Add</button>
            <div className={ styles.nodeOptionsDiv }></div>
            <button>A.I</button>
            <div className={ styles.nodeOptionsDiv }></div>
            <button>Delete</button>
          </div>
        </div>
    </motion.div>
  );
};

export default memo(CustomNode);
