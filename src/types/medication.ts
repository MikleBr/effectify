export interface Medication {
  id: string
  name: string
  type: string
  dosage: string
  times: string[]
  frequency: string
  startDate: string
  endDate: string
  reminder: boolean
}

export interface MedicationLog {
  id: string
  medicationId: string
  date: string
  taken: boolean
  timestamp: string
}
