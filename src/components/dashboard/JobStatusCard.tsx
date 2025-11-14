import { Clock, FileText, Play } from "lucide-react"

interface StatusType {
  total: number
  ing: number
  success: number
  failed: number
}

interface ParametersType {
  status: StatusType
}

/* 대시보드 작업 현황 카드 */
export function JobStatusCard(parameters: ParametersType) {
  const status = parameters.status

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">전체 파이프라인</span>
          <FileText className="w-5 h-5 text-blue-500" />
        </div>
        <div className="text-2xl font-bold">{status.total}</div>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">실행 중</span>
          <Play className="w-5 h-5 text-green-500" />
        </div>
        <div className="text-2xl font-bold">{status.ing}</div>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">성공</span>
          <Clock className="w-5 h-5 text-blue-500" />
        </div>
        <div className="text-2xl font-bold">{status.success}</div>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">실패</span>
          <Clock className="w-5 h-5 text-red-500" />
        </div>
        <div className="text-2xl font-bold">{status.failed}</div>
      </div>
    </div>
  )
}
