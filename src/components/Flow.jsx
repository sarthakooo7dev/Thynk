import React, { useState, useCallback } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  applyNodeChanges,
  applyEdgeChanges,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { useEffect } from 'react'

const commonNodeStyle = {
  backgroundColor: '#2c2a2b', // Blue background
  color: 'white', // White text
  padding: 7,
  borderRadius: '8px',
  border: '1px solid #aeca4b', // Slightly darker blue border
  textAlign: 'center',
}


const applyCommonStyleToNodes = (nodes, commonStyle) => {
  return nodes.map((node) => ({
    ...node,
    style: commonStyle,
  }))
}

const Flow = ({ flowData }) => {
  const [nodes, setNodes] = useState([])
  const [edges, setEdges] = useState([])

  useEffect(() => {
    if (
      flowData &&
      typeof flowData === 'object' &&
      flowData.initialNodes &&
      flowData.initialEdges
    ) {
      const styledNodes = applyCommonStyleToNodes(
        flowData.initialNodes,
        commonNodeStyle,
      )

      setNodes(styledNodes)
      setEdges(flowData.initialEdges)
    }

  }, [flowData])

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  )
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  )
  return (
    <div>
      <div style={{ height: '27rem', width: '70rem' }} className="">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  )
}

export default Flow
