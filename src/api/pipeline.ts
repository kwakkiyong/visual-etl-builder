import axios from "axios"
import { Pipeline, RunLog } from "@/lib/schema"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
})

// 파이프라인 목록 조회
export async function getPipelines(): Promise<Pipeline[]> {
  // TODO: 실제 API 연동
  // const response = await api.get("/pipelines")
  // return response.data
  return []
}

// 파이프라인 조회
export async function getPipeline(id: string): Promise<Pipeline> {
  // TODO: 실제 API 연동
  // const response = await api.get(`/pipelines/${id}`)
  // return response.data
  throw new Error("Not implemented")
}

// 파이프라인 생성
export async function createPipeline(pipeline: Omit<Pipeline, "id" | "createdAt" | "updatedAt">): Promise<Pipeline> {
  // TODO: 실제 API 연동
  // const response = await api.post("/pipelines", pipeline)
  // return response.data
  throw new Error("Not implemented")
}

// 파이프라인 업데이트
export async function updatePipeline(id: string, pipeline: Partial<Pipeline>): Promise<Pipeline> {
  // TODO: 실제 API 연동
  // const response = await api.put(`/pipelines/${id}`, pipeline)
  // return response.data
  throw new Error("Not implemented")
}

// 파이프라인 삭제
export async function deletePipeline(id: string): Promise<void> {
  // TODO: 실제 API 연동
  // await api.delete(`/pipelines/${id}`)
  throw new Error("Not implemented")
}

// 파이프라인 실행
export async function runPipeline(id: string): Promise<RunLog> {
  // TODO: 실제 API 연동
  // const response = await api.post(`/pipelines/${id}/run`)
  // return response.data
  throw new Error("Not implemented")
}

// 실행 이력 조회
export async function getRunLogs(pipelineId?: string): Promise<RunLog[]> {
  // TODO: 실제 API 연동
  // const response = await api.get("/logs", { params: { pipelineId } })
  // return response.data
  return []
}

// 실행 로그 상세 조회
export async function getRunLog(id: string): Promise<RunLog> {
  // TODO: 실제 API 연동
  // const response = await api.get(`/logs/${id}`)
  // return response.data
  throw new Error("Not implemented")
}

