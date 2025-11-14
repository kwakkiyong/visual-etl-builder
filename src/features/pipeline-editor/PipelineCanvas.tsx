import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Connection,
  addEdge,
  useNodesState,
  useEdgesState,
  NodeTypes,
  ReactFlowInstance,
  NodeChange,
  EdgeChange,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow"
import "reactflow/dist/style.css"
import { CustomNode } from "@/components/Node"
import { usePipelineStore } from "./usePipelineStore"
import { BaseNode, Edge } from "@/lib/schema"

const nodeTypes: NodeTypes = {
  custom: CustomNode,
}

export function PipelineCanvas() {
  const {
    nodes: storeNodes,
    edges: storeEdges,
    setNodes: setStoreNodes,
    setEdges: setStoreEdges,
    setSelectedNode,
    addNode,
  } = usePipelineStore()

  const [nodes, setNodes] = useNodesState([])
  const [edges, setEdges] = useEdgesState([])
  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null)

  // Store의 노드 ID 목록을 메모이제이션
  const storeNodeIds = useMemo(() => 
    storeNodes.map(n => n.id).join(','), 
    [storeNodes]
  )
  
  const storeEdgeIds = useMemo(() => 
    storeEdges.map(e => e.id).join(','), 
    [storeEdges]
  )

  // Store에서 React Flow로 동기화
  useEffect(() => {
    const reactFlowNodes = storeNodes.map((n) => ({
      id: n.id,
      type: "custom" as const,
      position: n.position,
      data: n,
    }))
    
    // Store의 노드 ID와 현재 React Flow 노드 ID를 비교
    setNodes((currentNodes) => {
      const currentIds = new Set(currentNodes.map(n => n.id))
      const newIds = new Set(storeNodes.map(n => n.id))
      
      // 노드가 추가/제거되었거나 개수가 다른 경우 업데이트
      if (newIds.size !== currentIds.size ||
          ![...newIds].every(id => currentIds.has(id))) {
        return reactFlowNodes
      }
      return currentNodes
    })
  }, [storeNodeIds, storeNodes, setNodes])

  useEffect(() => {
    setEdges((currentEdges) => {
      const currentIds = new Set(currentEdges.map(e => e.id))
      const newIds = new Set(storeEdges.map(e => e.id))
      
      if (newIds.size !== currentIds.size ||
          ![...newIds].every(id => currentIds.has(id))) {
        return storeEdges
      }
      return currentEdges
    })
  }, [storeEdgeIds, storeEdges, setEdges])

  // React Flow에서 Store로 동기화
  const onNodesChangeHandler = useCallback(
    (changes: NodeChange[]) => {
      const updatedNodes = applyNodeChanges(changes, nodes)
      setNodes(updatedNodes)
      
      // Store에 동기화
      setStoreNodes(updatedNodes.map((n) => ({
        id: n.id,
        type: (n.data as BaseNode).type,
        position: n.position,
        data: (n.data as BaseNode).data,
      })))
    },
    [nodes, setNodes, setStoreNodes]
  )

  const onEdgesChangeHandler = useCallback(
    (changes: EdgeChange[]) => {
      const updatedEdges = applyEdgeChanges(changes, edges)
      setEdges(updatedEdges)

      // Store에 동기화
      setStoreEdges(updatedEdges.map((e): Edge => ({
        id: e.id,
        source: e.source,
        target: e.target,
        sourceHandle: e.sourceHandle ?? undefined,
        targetHandle: e.targetHandle ?? undefined,
      })))
    },
    [edges, setEdges, setStoreEdges]
  )

  const onConnect = useCallback(
    (params: Connection) => {
      if (!params.source || !params.target) return
      
      setEdges((eds) => {
        const updated = addEdge(params, eds)
        setStoreEdges(updated.map((e): Edge => ({
          id: e.id,
          source: e.source,
          target: e.target,
          sourceHandle: e.sourceHandle ?? undefined,
          targetHandle: e.targetHandle ?? undefined,
        })))
        return updated
      })
    },
    [setEdges, setStoreEdges]
  )

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      setSelectedNode(node.id)
    },
    [setSelectedNode]
  )

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = "move"
  }, [])

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault()

      const templateStr = event.dataTransfer.getData("application/reactflow")
      if (!templateStr || !reactFlowInstance) {
        return
      }

      let template
      try {
        template = JSON.parse(templateStr)
      } catch {
        return
      }

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect()
      if (!reactFlowBounds) return

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      })

      const newNode: BaseNode = {
        id: `${template.type}-${Date.now()}`,
        type: template.type,
        position,
        data: template.data,
      }

      addNode(newNode)
    },
    [reactFlowInstance, addNode]
  )

  return (
    <div className="flex-1 h-full" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChangeHandler}
        onEdgesChange={onEdgesChangeHandler}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
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
