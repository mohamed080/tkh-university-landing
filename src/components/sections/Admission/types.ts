import type { Admission as AdmissionsType } from '@/payload-types'

export type AdmissionsData = AdmissionsType
export type AdmissionStep = NonNullable<AdmissionsData['steps']>[number]