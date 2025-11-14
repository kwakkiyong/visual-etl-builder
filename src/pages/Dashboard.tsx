import { Link } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { Plus, Search } from "lucide-react"
import { JobStatusCard } from "@/components/dashboard/JobStatusCard"
import { Title } from "@/components/ui/Title"
import { PipelineUsagePieChart } from "@/components/chart/PipelineUsagePieChart"
import { NodeUsageColumnChart } from "@/components/chart/NodeUsageColumnChart"
import { DailySuccessRateChart } from "@/components/chart/DailySuccessRateChart.tsx"

export function Dashboard() {
  const jobStatusData = {
    total: 20,
    ing: 2,
    success: 15,
    failed: 3,
  }

  return (
    <div className="p-8 space-y-4">
      <Title title="대시보드" subTitle="파이프라인을 관리하고 실행하세요" />

      <JobStatusCard status={jobStatusData} />

      {/* Charts */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div className="bg-white p-4 rounded shadow">
          <DailySuccessRateChart />
        </div>

        <div className="bg-white p-4 rounded shadow">
          <PipelineUsagePieChart />
        </div>

        <div className="bg-white p-4 rounded shadow">
          <NodeUsageColumnChart />
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">최근 파이프라인</h2>
          <div className="flex gap-2">
            <Link to="/pipelines/new" className="inline-block">
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                생성
              </Button>
            </Link>
            <Link to="/pipelines" className="inline-block">
              <Button variant="outline">
                <Search className="w-4 h-4 mr-2" />
                전체 보기
              </Button>
            </Link>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md bg-white">
            <div>
              <div className="font-medium text-gray-900">데이터 변환 파이프라인 #1</div>
              <div className="text-sm text-gray-600">2시간 전 실행</div>
            </div>
            <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">성공</span>
          </div>
          <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md bg-white">
            <div>
              <div className="font-medium text-gray-900">ETL 프로세스 #2</div>
              <div className="text-sm text-gray-600">5시간 전 실행</div>
            </div>
            <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">성공</span>
          </div>
        </div>
      </div>
    </div>
  )
}
