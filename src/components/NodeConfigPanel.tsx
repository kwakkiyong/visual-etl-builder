import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/Sheet"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { usePipelineStore } from "@/features/pipeline-editor/usePipelineStore"
import { BaseNode } from "@/lib/schema"

export function NodeConfigPanel() {
  const { selectedNodeId, nodes, updateNode, setSelectedNode } = usePipelineStore()
  const selectedNode = nodes.find((n) => n.id === selectedNodeId)

  if (!selectedNode) return null

  const handleSave = () => {
    // 설정 저장 로직
    setSelectedNode(null)
  }

  const handleChange = (key: string, value: any) => {
    updateNode(selectedNodeId!, {
      data: {
        ...selectedNode.data,
        [key]: value,
      },
    })
  }

  return (
    <Sheet open={!!selectedNode} onOpenChange={(open) => !open && setSelectedNode(null)}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>노드 설정</SheetTitle>
        </SheetHeader>
        <div className="space-y-4 mt-4">
          <div>
            <label className="text-sm font-medium">노드 ID</label>
            <Input value={selectedNode.id} disabled className="mt-1" />
          </div>
          <div>
            <label className="text-sm font-medium">노드 타입</label>
            <Input value={selectedNode.type} disabled className="mt-1" />
          </div>
          {selectedNode.data.sourceType && (
            <div>
              <label className="text-sm font-medium">Source Type</label>
              <Input
                value={selectedNode.data.sourceType}
                onChange={(e) => handleChange("sourceType", e.target.value)}
                className="mt-1"
              />
            </div>
          )}
          {selectedNode.data.transformType && (
            <div>
              <label className="text-sm font-medium">Transform Type</label>
              <Input
                value={selectedNode.data.transformType}
                onChange={(e) => handleChange("transformType", e.target.value)}
                className="mt-1"
              />
            </div>
          )}
          {selectedNode.data.loadType && (
            <div>
              <label className="text-sm font-medium">Load Type</label>
              <Input
                value={selectedNode.data.loadType}
                onChange={(e) => handleChange("loadType", e.target.value)}
                className="mt-1"
              />
            </div>
          )}
          <div className="flex gap-2 pt-4">
            <Button onClick={handleSave} className="flex-1">
              저장
            </Button>
            <Button
              variant="outline"
              onClick={() => setSelectedNode(null)}
              className="flex-1"
            >
              취소
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

