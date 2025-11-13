import { memo } from "react"
import { Handle, Position, NodeProps } from "reactflow"
import { BaseNode } from "@/lib/schema"
import { cn } from "@/lib/utils"

interface CustomNodeProps extends NodeProps {
  data: BaseNode
}

const nodeTypeColors = {
  source: "bg-blue-500",
  transform: "bg-yellow-500",
  load: "bg-green-500",
}

const nodeTypeLabels = {
  source: "Source",
  transform: "Transform",
  load: "Load",
}

export const CustomNode = memo(({ data, selected }: CustomNodeProps) => {
  const nodeType = data.type || "source"
  const color = nodeTypeColors[nodeType] || "bg-gray-500"
  const label = nodeTypeLabels[nodeType] || "Node"

  return (
    <div
      className={cn(
        "px-4 py-2 shadow-md rounded-md border-2 bg-white min-w-[150px]",
        selected ? "border-blue-500" : "border-gray-300"
      )}
    >
      <div className="flex items-center gap-2">
        <div className={cn("w-3 h-3 rounded-full", color)} />
        <div className="font-semibold">{label}</div>
      </div>
      <div className="text-xs text-gray-600 mt-1">
        {data.sourceType || data.transformType || data.loadType || "Node"}
      </div>
      {nodeType !== "load" && (
        <Handle
          type="source"
          position={Position.Right}
          className="w-3 h-3 bg-blue-500"
        />
      )}
      {nodeType !== "source" && (
        <Handle
          type="target"
          position={Position.Left}
          className="w-3 h-3 bg-blue-500"
        />
      )}
    </div>
  )
})

CustomNode.displayName = "CustomNode"

