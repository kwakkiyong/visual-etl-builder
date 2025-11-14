import { Link } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { Plus, Play, Edit, Trash2 } from "lucide-react"
import { useState } from "react"

interface Pipeline {
  id: string
  name: string
  description?: string
  updatedAt: string
  status: "success" | "failed" | "running"
}

export function PipelineList() {
  const [pipelines] = useState<Pipeline[]>([
    {
      id: "1",
      name: "데이터 변환 파이프라인 #1",
      description: "CSV 파일을 읽어서 변환 후 DB에 저장",
      updatedAt: "2024-01-15 10:30",
      status: "success",
    },
    {
      id: "2",
      name: "ETL 프로세스 #2",
      description: "API 데이터 수집 및 변환",
      updatedAt: "2024-01-15 08:15",
      status: "success",
    },
    {
      id: "3",
      name: "데이터 웨어하우스 로드",
      description: "여러 소스에서 데이터 수집",
      updatedAt: "2024-01-14 16:45",
      status: "running",
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800"
      case "failed":
        return "bg-red-100 text-red-800"
      case "running":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-gray-900">파이프라인 목록</h1>
          <p className="text-gray-600">파이프라인을 생성, 편집, 실행하세요</p>
        </div>
        <Link to="/pipelines/new" className="inline-block">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            새 파이프라인
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {pipelines.map((pipeline) => (
          <div
            key={pipeline.id}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{pipeline.name}</h3>
                  <span
                    className={`px-2 py-1 text-xs rounded ${getStatusColor(
                      pipeline.status
                    )}`}
                  >
                    {pipeline.status === "success"
                      ? "성공"
                      : pipeline.status === "failed"
                      ? "실패"
                      : "실행 중"}
                  </span>
                </div>
                {pipeline.description && (
                  <p className="text-gray-600 mb-2">{pipeline.description}</p>
                )}
                <p className="text-sm text-gray-500">
                  마지막 수정: {pipeline.updatedAt}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Link to={`/pipelines/${pipeline.id}/edit`} className="inline-block">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    편집
                  </Button>
                </Link>
                <Button variant="outline" size="sm">
                  <Play className="w-4 h-4 mr-2" />
                  실행
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

