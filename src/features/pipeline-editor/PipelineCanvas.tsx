import { useCallback, useEffect } from "react"
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  Connection,
  addEdge,
  useNodesState,
  useEdgesState,
  NodeTypes,
} from "reactflow"
import "reactflow/dist/style.css"
import { CustomNode } from "@/components/Node"
import { usePipelineStore } from "./usePipelineStore"
import { BaseNode } from "@/lib/schema"

const nodeTypes: NodeTypes = {
  custom: CustomNode,
}

export function PipelineCanvas() {
  const {
    nodes: storeNodes,
    edges: storeEdges,
    setNodes,
    setEdges,
    setSelectedNode,
  } = usePipelineStore()

  const [nodes, setNodesState, onNodesChange] = useNodesState(storeNodes)
  const [edges, setEdgesState, onEdgesChange] = useEdgesState(storeEdges)

  // Store와 동기화
  useEffect(() => {
    setNodesState(storeNodes.map((n) => ({
      id: n.id,
      type: "custom",
      position: n.position,
      data: n,
    })))
  }, [storeNodes, setNodesState])

  useEffect(() => {
    setEdgesState(storeEdges)
  }, [storeEdges, setEdgesState])

  const onNodesChangeHandler = useCallback(
    (changes: any) => {
      onNodesChange(changes)
      const updatedNodes = nodes.map((n) => {
        const change = changes.find((c: any) => c.id === n.id)
        if (change?.type === "position" && change.position) {
          return {
            ...n,
            position: change.position,
          }
        }
        return n
      })
      setNodes(
        updatedNodes.map((n) => ({
          id: n.id,
          type: n.data.type,
          position: n.position,
          data: n.data,
        }))
      )
    },
    [nodes, onNodesChange, setNodes]
  )

  const onEdgesChangeHandler = useCallback(
    (changes: any) => {
      onEdgesChange(changes)
      const updatedEdges = edges.filter(
        (e) => !changes.some((c: any) => c.id === e.id && c.type === "remove")
      )
      setEdges(updatedEdges)
    },
    [edges, onEdgesChange, setEdges]
  )

  const onConnect = useCallback(
    (params: Connection) => {
      if (!params.source || !params.target) return
      const newEdge = {
        id: `edge-${params.source}-${params.target}`,
        source: params.source,
        target: params.target,
        sourceHandle: params.sourceHandle,
        targetHandle: params.targetHandle,
      }
      setEdges([...edges, newEdge])
      setEdgesState((eds) => addEdge(params, eds))
    },
    [edges, setEdges, setEdgesState]
  )

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      setSelectedNode(node.id)
    },
    [setSelectedNode]
  )

  return (
    <div className="flex-1 h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChangeHandler}
        onEdgesChange={onEdgesChangeHandler}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  )
}

