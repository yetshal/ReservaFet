import { Injectable, signal } from '@angular/core';
import { Space, Booking, FilterOptions } from '../models/space.model';
import { StorageService } from './storage.service';
import { BookingRecord } from '../models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private spacesSignal = signal<Space[]>([
    {
      id: 1,
      name: 'Aula 101',
      type: 'Aula',
      capacity: 30,
      building: 'Bloque 1',
      floor: 2,
      equipment: ['Proyector', 'Computador', 'Tablero'],
      available: true
    },
    {
      id: 2,
      name: 'Lab. Informática 1',
      type: 'Laboratorio',
      capacity: 30,
      building: 'Bloque 1',
      floor: 1,
      equipment: ['30 Computadores', 'Proyector', 'A/C'],
      available: true
    },
    {
      id: 3,
      name: 'Aula 205',
      type: 'Aula',
      capacity: 35,
      building: 'Bloque 1',
      floor: 2,
      equipment: ['Proyector', 'Tablero'],
      available: false
    },
    {
      id: 4,
      name: 'Lab. Química',
      type: 'Laboratorio',
      capacity: 25,
      building: 'Bloque 2',
      floor: 1,
      equipment: ['Equipo de laboratorio', 'Extractor'],
      available: true
    },
    {
      id: 5,
      name: 'Auditorio',
      type: 'Auditorio',
      capacity: 80,
      building: 'Bloque 1',
      floor: 1,
      equipment: ['Sistema de sonido', 'Proyector', 'Decoración', 'A/C'],
      available: false
    },
    {
      id: 6,
      name: 'Aula 214',
      type: 'Aula',
      capacity: 45,
      building: 'Bloque 2',
      floor: 3,
      equipment: ['Proyector', 'Computador', 'Tablero'],
      available: true
    },
    {
      id: 7,
      name: 'Lab. Informática 2',
      type: 'Laboratorio',
      capacity: 30,
      building: 'Bloque 2',
      floor: 1,
      equipment: ['30 Computadores', 'Proyector', 'A/C'],
      available: true
    }
  ]);

  private selectedSpaceSignal = signal<Space | null>(null);
  private selectedDateSignal = signal<string>(this.getTomorrowDate());
  private selectedTimeSignal = signal<string>('');
  private searchTermSignal = signal<string>('');
  private currentViewSignal = signal<'search' | 'confirmation' | 'my-bookings'>('search');
  private filterOptionsSignal = signal<FilterOptions>({
    type: 'Todos',
    minCapacity: null,
    building: 'Todos'
  });

  // Getters públicos para los signals
  spaces = this.spacesSignal.asReadonly();
  selectedSpace = this.selectedSpaceSignal.asReadonly();
  selectedDate = this.selectedDateSignal.asReadonly();
  selectedTime = this.selectedTimeSignal.asReadonly();
  searchTerm = this.searchTermSignal.asReadonly();
  currentView = this.currentViewSignal.asReadonly();
  filterOptions = this.filterOptionsSignal.asReadonly();

  constructor(private storageService: StorageService) {}

  private getTomorrowDate(): string {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  }

  selectSpace(space: Space): void {
    if (space.available) {
      this.selectedSpaceSignal.set(space);
    }
  }

  setDate(date: string): void {
    this.selectedDateSignal.set(date);
  }

  selectTime(time: string): void {
    this.selectedTimeSignal.set(time);
  }

  setSearchTerm(term: string): void {
    this.searchTermSignal.set(term);
  }

  setFilterOptions(options: Partial<FilterOptions>): void {
    this.filterOptionsSignal.update(current => ({
      ...current,
      ...options
    }));
  }

  setCurrentView(view: 'search' | 'confirmation' | 'my-bookings'): void {
    this.currentViewSignal.set(view);
  }

  getFilteredSpaces(): Space[] {
    const term = this.searchTermSignal().toLowerCase();
    const filters = this.filterOptionsSignal();
    
    return this.spacesSignal().filter(space => {
      // Filtro de búsqueda
      const matchesSearch = 
        space.name.toLowerCase().includes(term) ||
        space.type.toLowerCase().includes(term) ||
        space.building.toLowerCase().includes(term);

      // Filtro de tipo
      const matchesType = 
        filters.type === 'Todos' || 
        space.type === filters.type;

      // Filtro de capacidad
      const matchesCapacity = 
        filters.minCapacity === null || 
        space.capacity >= filters.minCapacity;

      // Filtro de edificio
      const matchesBuilding = 
        filters.building === 'Todos' || 
        space.building === filters.building;

      return matchesSearch && matchesType && matchesCapacity && matchesBuilding;
    });
  }

  confirmBooking(): BookingRecord | null {
    const space = this.selectedSpaceSignal();
    const date = this.selectedDateSignal();
    const time = this.selectedTimeSignal();

    if (space && date && time) {
      const bookingRecord: BookingRecord = {
        id: this.generateId(),
        spaceId: space.id,
        spaceName: space.name,
        spaceType: space.type,
        building: space.building,
        floor: space.floor,
        date: date,
        timeSlot: time,
        status: 'active',
        createdAt: new Date().toISOString()
      };

      // Guardar en localStorage
      this.storageService.saveBooking(bookingRecord);
      
      this.currentViewSignal.set('confirmation');
      return bookingRecord;
    }
    return null;
  }

  private generateId(): string {
    return `booking-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  resetBooking(): void {
    this.selectedSpaceSignal.set(null);
    this.selectedTimeSignal.set('');
    this.currentViewSignal.set('search');
  }

  newBooking(): void {
    this.resetBooking();
  }

  goToMyBookings(): void {
    this.currentViewSignal.set('my-bookings');
  }

  clearFilters(): void {
    this.filterOptionsSignal.set({
      type: 'Todos',
      minCapacity: null,
      building: 'Todos'
    });
  }
}