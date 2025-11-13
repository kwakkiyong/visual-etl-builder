import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Layout } from "./components/Layout"
import { Dashboard } from "./pages/Dashboard"
import { PipelineList } from "./pages/PipelineList"
import { PipelineEditor } from "./pages/PipelineEditor"
import { RunHistory } from "./pages/RunHistory"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/pipelines"
          element={
            <Layout>
              <PipelineList />
            </Layout>
          }
        />
        <Route path="/pipelines/new" element={<PipelineEditor />} />
        <Route path="/pipelines/:id/edit" element={<PipelineEditor />} />
        <Route
          path="/logs"
          element={
            <Layout>
              <RunHistory />
            </Layout>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
