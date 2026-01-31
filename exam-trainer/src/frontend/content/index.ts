// src/content/index.ts
import type { Course } from '@/core/types/content'
import { webTechnologiesCourse } from './web-technologies'
import { ipdgCourse } from './ipdg'

export const courses: Record<string, Course> = {
  'web-technologies': webTechnologiesCourse,
  'ipdg': ipdgCourse,
}

export function getCourse(courseId: string): Course | undefined {
  return courses[courseId]
}

export function getTopic(courseId: string, topicId: string) {
  const course = getCourse(courseId)
  return course?.topics.find((t) => t.id === topicId)
}
