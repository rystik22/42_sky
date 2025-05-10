export interface Event {
  id: number
  title: string
  category: string
  date: string
  time: string
  location: string
  description: string
  image: string
  beginAt?: string
  endAt?: string
  maxAttendees?: number | null
  currentAttendees?: number
}