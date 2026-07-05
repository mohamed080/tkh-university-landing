import type { Experience as ExperienceType } from '@/payload-types'

export type ExperienceData = ExperienceType
export type ExperienceTab = NonNullable<ExperienceData['tabs']>[number]