// src/content/ipdg/index.ts
import type { Course } from '@/core/types/content'
import { erpGrundlagenTopic } from './topics/erp-grundlagen'
import { crmTopic } from './topics/crm'
import { businessIntelligenceTopic } from './topics/business-intelligence'
import { bigDataTopic } from './topics/big-data'
import { sapS4HanaTopic } from './topics/sap-s4hana'

export const ipdgCourse: Course = {
  id: 'ipdg',
  title: 'Implementierung digitaler Geschäftsprozesse',
  description: 'ERP, CRM, Business Intelligence, Big Data, SAP S/4HANA',
  topics: [
    erpGrundlagenTopic,
    crmTopic,
    businessIntelligenceTopic,
    bigDataTopic,
    sapS4HanaTopic,
  ],
}
