// src/frontend/core/services/api.ts

const API_BASE = '/api'

export interface EvaluateRequest {
  question: string
  user_answer: string
  model_answer: string
  key_points: string[]
  topic_id: string
}

export interface EvaluateResponse {
  score: number
  is_correct: boolean | 'partial'
  feedback: string
  missing_concepts: string[]
  suggestion: string
}

export interface HintRequest {
  question: string
  model_answer: string
  hint_level: number
  previous_hints: string[]
}

export interface HintResponse {
  hint: string
  hint_level: number
  hints_remaining: number
}

export async function evaluateAnswer(data: EvaluateRequest): Promise<EvaluateResponse> {
  const res = await fetch(`${API_BASE}/evaluate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error(`Evaluation failed: ${res.statusText}`)
  return res.json()
}

export async function getHint(data: HintRequest): Promise<HintResponse> {
  const res = await fetch(`${API_BASE}/hint`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error(`Hint failed: ${res.statusText}`)
  return res.json()
}

export async function saveProgress(data: {
  topic_id: string
  question_id: string
  question_type: string
  score: number
  user_answer: string
  hints_used: number
}): Promise<void> {
  await fetch(`${API_BASE}/progress/save`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}
