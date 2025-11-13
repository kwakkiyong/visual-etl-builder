import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Plus, Play, FileText, Clock } from "lucide-react"

export function Dashboard() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">대시보드</h1>
        <p className="text-gray-600">파이프라인을 관리하고 실행하세요</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">전체 파이프라인</span>
            <FileText className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-2xl font-bold">12</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">실행 중</span>
            <Play className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-2xl font-bold">3</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">성공</span>
            <Clock className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-2xl font-bold">45</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">실패</span>
            <Clock className="w-5 h-5 text-red-500" />
          </div>
          <div className="text-2xl font-bold">2</div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">최근 파이프라인</h2>
          <Link to="/pipelines">
            <Button variant="outline">전체 보기</Button>
          </Link>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
            <div>
              <div className="font-medium">데이터 변환 파이프라인 #1</div>
              <div className="text-sm text-gray-600">2시간 전 실행</div>
            </div>
            <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
              성공
            </span>
          </div>
          <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
            <div>
              <div className="font-medium">ETL 프로세스 #2</div>
              <div className="text-sm text-gray-600">5시간 전 실행</div>
            </div>
            <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
              성공
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Link to="/pipelines/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            새 파이프라인 생성
          </Button>
        </Link>
      </div>
    </div>
  )
}

