// src/content/ipdg/index.ts
import type { Course } from '@/core/types/content'
import { erpSystemeTopic } from './topics/erp-systeme'
import { projektChangeManagementTopic } from './topics/projekt-change-management'
import { sapPlattformTopic } from './topics/sap-plattform'
import { sapSdVertriebTopic } from './topics/sap-sd-vertrieb'
import { crmTopic } from './topics/crm'
import { businessIntelligenceTopic } from './topics/business-intelligence'
import { bigDataTopic } from './topics/big-data'

export const ipdgCourse: Course = {
  id: 'ipdg',
  title: 'Implementierung digitaler Geschäftsprozesse',
  description:
    'Geschäftsprozesse, ERP, Change Management, SAP S/4HANA, CRM, Business Intelligence, Big Data',
  topics: [
    erpSystemeTopic,
    projektChangeManagementTopic,
    sapPlattformTopic,
    sapSdVertriebTopic,
    crmTopic,
    businessIntelligenceTopic,
    bigDataTopic,
  ],
}
