import { usePipelineStore } from "@/features/pipeline-editor/usePipelineStore"
import { BaseNode } from "@/lib/schema"
import { FileText, Database, Globe, Filter, Map, BarChart3, Save, Download } from "lucide-react"

const nodeTemplates = [
  {
    type: "source" as const,
    label: "File",
    icon: FileText,
    data: { sourceType: "file", config: {} },
  },
  {
    type: "source" as const,
    label: "Database",
    icon: Database,
    data: { sourceType: "database", config: {} },
  },
  {
    type: "source" as const,
    label: "API",
    icon: Globe,
    data: { sourceType: "api", config: {} },
  },
  {
    type: "transform" as const,
    label: "Filter",
    icon: Filter,
    data: { transformType: "filter", config: {} },
  },
  {
    type: "transform" as const,
    label: "Map",
    icon: Map,
    data: { transformType: "map", config: {} },
  },
  {
    type: "transform" as const,
    label: "Aggregate",
    icon: BarChart3,
    data: { transformType: "aggregate", config: {} },
  },
  {
    type: "load" as const,
    label: "Save to DB",
    icon: Save,
    data: { loadType: "save-to-db", config: {} },
  },
  {
    type: "load" as const,
    label: "Save to File",
    icon: Download,
    data: { loadType: "save-to-file", config: {} },
  },
]

export function NodePalette() {
  const { addNode } = usePipelineStore()

  const handleAddNode = (template: typeof nodeTemplates[0]) => {
    const newNode: BaseNode = {
      id: `${template.type}-${Date.now()}`,
      type: template.type,
      position: {
        x: Math.random() * 400 + 100,
        y: Math.random() * 400 + 100,
      },
      data: template.data,
    }
    addNode(newNode)
  }

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">노드 팔레트</h2>
      <div className="space-y-2">
        <div className="text-sm font-medium text-gray-500 mb-2">Source</div>
        {nodeTemplates
          .filter((n) => n.type === "source")
          .map((template) => (
            <button
              key={template.label}
              onClick={() => handleAddNode(template)}
              className="w-full flex items-center gap-2 p-3 text-left border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
            >
              <template.icon className="w-5 h-5" />
              <span>{template.label}</span>
            </button>
          ))}
        <div className="text-sm font-medium text-gray-500 mb-2 mt-4">Transform</div>
        {nodeTemplates
          .filter((n) => n.type === "transform")
          .map((template) => (
            <button
              key={template.label}
              onClick={() => handleAddNode(template)}
              className="w-full flex items-center gap-2 p-3 text-left border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
            >
              <template.icon className="w-5 h-5" />
              <span>{template.label}</span>
            </button>
          ))}
        <div className="text-sm font-medium text-gray-500 mb-2 mt-4">Load</div>
        {nodeTemplates
          .filter((n) => n.type === "load")
          .map((template) => (
            <button
              key={template.label}
              onClick={() => handleAddNode(template)}
              className="w-full flex items-center gap-2 p-3 text-left border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
            >
              <template.icon className="w-5 h-5" />
              <span>{template.label}</span>
            </button>
          ))}
      </div>
    </div>
  )
}

