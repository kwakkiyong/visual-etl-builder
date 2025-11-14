import { NodePalette } from "@/components/NodePalette"
import { PipelineCanvas } from "@/features/pipeline-editor/PipelineCanvas"
import { NodeConfigPanel } from "@/components/NodeConfigPanel"
import { Button } from "@/components/ui/Button"
import { Save, Play, ArrowLeft } from "lucide-react"
import { Link, useParams } from "react-router-dom"
import { usePipelineStore } from "@/features/pipeline-editor/usePipelineStore"

export function PipelineEditor() {
  const { id } = useParams()
  const { nodes, edges } = usePipelineStore()

  const handleSave = () => {
    // 파이프라인 저장 로직
    if (nodes.length === 0) {
      alert("저장할 파이프라인이 없습니다.")
      return
    }
    console.log("Saving pipeline:", { nodes, edges })
    alert("파이프라인이 저장되었습니다.")
  }

  const handleRun = () => {
    // 파이프라인 실행 로직
    if (nodes.length === 0) {
      alert("실행할 파이프라인이 없습니다.")
      return
    }
    console.log("Running pipeline:", { nodes, edges })
    alert("파이프라인 실행을 시작합니다.")
  }

  return (
    <div className="h-screen flex flex-col">
      {/* 헤더 */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/pipelines">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              뒤로
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-semibold">
              {id ? `파이프라인 편집 #${id}` : "새 파이프라인"}
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            저장
          </Button>
          <Button onClick={handleRun}>
            <Play className="w-4 h-4 mr-2" />
            실행
          </Button>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="flex-1 flex overflow-hidden">
        <NodePalette />
        <div className="flex-1 relative">
          <PipelineCanvas />
        </div>
        <NodeConfigPanel />
      </div>
    </div>
  )
}

