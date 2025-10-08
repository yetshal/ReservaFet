export interface Space {
  id: number;
  name: string;
  type: 'Aula' | 'Laboratorio' | 'Auditorio';
  capacity: number;
  building: string;
  floor: number;
  equipment: string[];
  available: boolean;
}

export interface Booking {
  space: Space;
  date: string;
  timeSlot: string;
}

export interface FilterOptions {
  type: string;
  minCapacity: number | null;
  building: string;
}

export const TIME_SLOTS = [
  '07:00 - 09:00',
  '09:00 - 11:00',
  '11:00 - 13:00',
  '14:00 - 16:00',
  '16:00 - 18:00',
  '18:00 - 20:00'
];

export const SPACE_TYPES = ['Todos', 'Aula', 'Laboratorio', 'Auditorio'];
export const BUILDINGS = ['Todos', 'Bloque 1', 'Bloque 2'];