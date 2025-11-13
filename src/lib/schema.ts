import { z } from "zod"

// Node 타입 정의
export const NodeTypeSchema = z.enum([
  "source",
  "transform",
  "load",
])

// Source Node 타입
export const SourceNodeTypeSchema = z.enum([
  "file",
  "database",
  "api",
])

// Transform Node 타입
export const TransformNodeTypeSchema = z.enum([
  "filter",
  "map",
  "aggregate",
])

// Load Node 타입
export const LoadNodeTypeSchema = z.enum([
  "save-to-db",
  "save-to-file",
])

// Base Node Schema
export const BaseNodeSchema = z.object({
  id: z.string(),
  type: NodeTypeSchema,
  position: z.object({
    x: z.number(),
    y: z.number(),
  }),
  data: z.record(z.any()),
})

// Source Node Schema
export const SourceNodeSchema = BaseNodeSchema.extend({
  type: z.literal("source"),
  data: z.object({
    sourceType: SourceNodeTypeSchema,
    config: z.record(z.any()),
  }),
})

// Transform Node Schema
export const TransformNodeSchema = BaseNodeSchema.extend({
  type: z.literal("transform"),
  data: z.object({
    transformType: TransformNodeTypeSchema,
    config: z.record(z.any()),
  }),
})

// Load Node Schema
export const LoadNodeSchema = BaseNodeSchema.extend({
  type: z.literal("load"),
  data: z.object({
    loadType: LoadNodeTypeSchema,
    config: z.record(z.any()),
  }),
})

// Edge Schema
export const EdgeSchema = z.object({
  id: z.string(),
  source: z.string(),
  target: z.string(),
  sourceHandle: z.string().optional(),
  targetHandle: z.string().optional(),
})

// Pipeline Schema
export const PipelineSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  nodes: z.array(BaseNodeSchema),
  edges: z.array(EdgeSchema),
  createdAt: z.string(),
  updatedAt: z.string(),
})

// Run Log Schema
export const RunLogSchema = z.object({
  id: z.string(),
  pipelineId: z.string(),
  status: z.enum(["pending", "running", "success", "failed"]),
  startedAt: z.string(),
  completedAt: z.string().optional(),
  logs: z.array(z.object({
    timestamp: z.string(),
    level: z.enum(["info", "warning", "error"]),
    message: z.string(),
  })),
})

export type NodeType = z.infer<typeof NodeTypeSchema>
export type SourceNodeType = z.infer<typeof SourceNodeTypeSchema>
export type TransformNodeType = z.infer<typeof TransformNodeTypeSchema>
export type LoadNodeType = z.infer<typeof LoadNodeTypeSchema>
export type BaseNode = z.infer<typeof BaseNodeSchema>
export type SourceNode = z.infer<typeof SourceNodeSchema>
export type TransformNode = z.infer<typeof TransformNodeSchema>
export type LoadNode = z.infer<typeof LoadNodeSchema>
export type Edge = z.infer<typeof EdgeSchema>
export type Pipeline = z.infer<typeof PipelineSchema>
export type RunLog = z.infer<typeof RunLogSchema>

