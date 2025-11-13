import { create } from "zustand"
import { BaseNode, Edge } from "@/lib/schema"

interface PipelineState {
  nodes: BaseNode[]
  edges: Edge[]
  selectedNodeId: string | null
  addNode: (node: BaseNode) => void
  updateNode: (id: string, data: Partial<BaseNode>) => void
  removeNode: (id: string) => void
  addEdge: (edge: Edge) => void
  removeEdge: (id: string) => void
  setSelectedNode: (id: string | null) => void
  setNodes: (nodes: BaseNode[]) => void
  setEdges: (edges: Edge[]) => void
  clearPipeline: () => void
}

export const usePipelineStore = create<PipelineState>((set) => ({
  nodes: [],
  edges: [],
  selectedNodeId: null,

  addNode: (node) =>
    set((state) => ({
      nodes: [...state.nodes, node],
    })),

  updateNode: (id, data) =>
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === id ? { ...node, ...data } : node
      ),
    })),

  removeNode: (id) =>
    set((state) => ({
      nodes: state.nodes.filter((node) => node.id !== id),
      edges: state.edges.filter(
        (edge) => edge.source !== id && edge.target !== id
      ),
      selectedNodeId: state.selectedNodeId === id ? null : state.selectedNodeId,
    })),

  addEdge: (edge) =>
    set((state) => {
      // 중복 체크
      const exists = state.edges.some(
        (e) => e.source === edge.source && e.target === edge.target
      )
      if (exists) return state
      return { edges: [...state.edges, edge] }
    }),

  removeEdge: (id) =>
    set((state) => ({
      edges: state.edges.filter((edge) => edge.id !== id),
    })),

  setSelectedNode: (id) =>
    set(() => ({
      selectedNodeId: id,
    })),

  setNodes: (nodes) =>
    set(() => ({
      nodes,
    })),

  setEdges: (edges) =>
    set(() => ({
      edges,
    })),

  clearPipeline: () =>
    set(() => ({
      nodes: [],
      edges: [],
      selectedNodeId: null,
    })),
}))

