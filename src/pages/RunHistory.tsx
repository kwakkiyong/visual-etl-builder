import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { ArrowLeft, Play, CheckCircle, XCircle, Clock } from "lucide-react"
import { Link } from "react-router-dom"

interface RunLog {
  id: string
  pipelineId: string
  pipelineName: string
  status: "pending" | "running" | "success" | "failed"
  startedAt: string
  completedAt?: string
  duration?: string
}

export function RunHistory() {
  const [logs] = useState<RunLog[]>([
    {
      id: "1",
      pipelineId: "1",
      pipelineName: "데이터 변환 파이프라인 #1",
      status: "success",
      startedAt: "2024-01-15 10:30:00",
      completedAt: "2024-01-15 10:32:15",
      duration: "2분 15초",
    },
    {
      id: "2",
      pipelineId: "2",
      pipelineName: "ETL 프로세스 #2",
      status: "success",
      startedAt: "2024-01-15 08:15:00",
      completedAt: "2024-01-15 08:18:30",
      duration: "3분 30초",
    },
    {
      id: "3",
      pipelineId: "3",
      pipelineName: "데이터 웨어하우스 로드",
      status: "running",
      startedAt: "2024-01-15 12:00:00",
    },
    {
      id: "4",
      pipelineId: "1",
      pipelineName: "데이터 변환 파이프라인 #1",
      status: "failed",
      startedAt: "2024-01-14 15:20:00",
      completedAt: "2024-01-14 15:22:10",
      duration: "2분 10초",
    },
  ])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "failed":
        return <XCircle className="w-5 h-5 text-red-500" />
      case "running":
        return <Play className="w-5 h-5 text-blue-500 animate-pulse" />
      default:
        return <Clock className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "success":
        return "성공"
      case "failed":
        return "실패"
      case "running":
        return "실행 중"
      default:
        return "대기 중"
    }
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-gray-900">실행 이력</h1>
          <p className="text-gray-600">파이프라인 실행 로그를 확인하세요</p>
        </div>
        <Link to="/" className="inline-block">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            대시보드로
          </Button>
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  상태
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  파이프라인
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  시작 시간
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  완료 시간
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  소요 시간
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  작업
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(log.status)}
                      <span className="text-sm">{getStatusText(log.status)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{log.pipelineName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{log.startedAt}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {log.completedAt || "-"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {log.duration || "-"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Button variant="outline" size="sm">
                      로그 보기
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

