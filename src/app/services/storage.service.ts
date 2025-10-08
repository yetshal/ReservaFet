import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BookingRecord } from '../models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly BOOKINGS_KEY = 'uni-reserva-bookings';
  private platformId = inject(PLATFORM_ID);
  private isBrowser: boolean;

  constructor() {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.initializeStorage();
    }
  }

  private initializeStorage(): void {
    if (!this.isBrowser) return;
    
    try {
      if (!localStorage.getItem(this.BOOKINGS_KEY)) {
        localStorage.setItem(this.BOOKINGS_KEY, JSON.stringify([]));
      }
    } catch (error) {
      console.error('Error al inicializar localStorage:', error);
    }
  }

  getAllBookings(): BookingRecord[] {
    if (!this.isBrowser) return [];
    
    try {
      const data = localStorage.getItem(this.BOOKINGS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error al leer reservas:', error);
      return [];
    }
  }

  saveBooking(booking: BookingRecord): void {
    if (!this.isBrowser) return;
    
    try {
      const bookings = this.getAllBookings();
      bookings.push(booking);
      localStorage.setItem(this.BOOKINGS_KEY, JSON.stringify(bookings));
    } catch (error) {
      console.error('Error al guardar reserva:', error);
    }
  }

  deleteBooking(id: string): void {
    if (!this.isBrowser) return;
    
    try {
      const bookings = this.getAllBookings();
      const filtered = bookings.filter(b => b.id !== id);
      localStorage.setItem(this.BOOKINGS_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error('Error al eliminar reserva:', error);
    }
  }

  updateBookingStatus(id: string, status: 'active' | 'completed' | 'cancelled'): void {
    if (!this.isBrowser) return;
    
    try {
      const bookings = this.getAllBookings();
      const booking = bookings.find(b => b.id === id);
      if (booking) {
        booking.status = status;
        localStorage.setItem(this.BOOKINGS_KEY, JSON.stringify(bookings));
      }
    } catch (error) {
      console.error('Error al actualizar reserva:', error);
    }
  }

  clearAllBookings(): void {
    if (!this.isBrowser) return;
    
    try {
      localStorage.setItem(this.BOOKINGS_KEY, JSON.stringify([]));
    } catch (error) {
      console.error('Error al limpiar reservas:', error);
    }
  }

  isStorageAvailable(): boolean {
    return this.isBrowser;
  }
}