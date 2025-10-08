export interface BookingRecord {
  id: string;
  spaceId: number;
  spaceName: string;
  spaceType: string;
  building: string;
  floor: number;
  date: string;
  timeSlot: string;
  status: 'active' | 'completed' | 'cancelled';
  createdAt: string;
}