import { Link, useLocation } from "react-router-dom"
import { LayoutDashboard, Workflow, History } from "lucide-react"
import { cn } from "@/lib/utils"

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation()

  const navItems = [
    { path: "/", label: "대시보드", icon: LayoutDashboard },
    { path: "/pipelines", label: "파이프라인", icon: Workflow },
    { path: "/logs", label: "실행 이력", icon: History },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <nav className="bg-white border-b border-gray-200">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold">Visual ETL Builder</h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = location.pathname === item.path
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={cn(
                        "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors",
                        isActive
                          ? "border-blue-500 text-gray-900"
                          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                      )}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {item.label}
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  )
}

