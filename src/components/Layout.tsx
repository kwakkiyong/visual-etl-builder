import { Link, useLocation, useNavigate } from "react-router-dom"
import { History, LayoutDashboard, Menu, Workflow } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Button } from "@/components/ui/Button"

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const navItems = [
    { path: "/", label: "대시보드", icon: LayoutDashboard },
    { path: "/pipelines", label: "파이프라인", icon: Workflow },
    { path: "/logs", label: "실행 이력", icon: History },
  ]

  const handleLogoClick = () => {
    navigate("/")
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* 사이드바 */}
      <aside
        className={cn(
          "bg-white border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col",
          isSidebarOpen ? "w-64" : "w-24"
        )}
      >
        {/* 사이드바 헤더 */}
        <div className="h-16 border-b border-gray-200 flex items-center justify-between px-4">
          <div
            className={cn(
              "flex items-center justify-center hover:cursor-pointer overflow-hidden",
              isSidebarOpen ? "flex-1" : "w-0"
            )}
            onClick={handleLogoClick}
          >
            {isSidebarOpen && (
              <h1 className="text-xl font-bold whitespace-nowrap">Visual ETL Builder</h1>
            )}
          </div>
        </div>

        {/* 사이드바 메뉴 */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer overflow-hidden",
                      isActive
                        ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                        : "text-gray-700 hover:bg-gray-100",
                      !isSidebarOpen && "justify-center"
                    )}
                    title={!isSidebarOpen ? item.label : undefined}
                  >
                    <Icon className={cn("h-5 w-5 flex-shrink-0", isSidebarOpen && "mr-3")} />
                    {isSidebarOpen && (
                      <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                        {item.label}
                      </span>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </aside>

      {/* 메인 컨텐츠 */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* 헤더 */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center px-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="cursor-pointer"
            aria-label={isSidebarOpen ? "사이드바 접기" : "사이드바 펼치기"}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </header>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
