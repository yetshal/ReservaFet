import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../services/booking.service';
import { StorageService } from '../../services/storage.service';
import { BookingRecord } from '../../models/booking.model';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.css'
})
export class MyBookingsComponent {
  bookings = signal<BookingRecord[]>([]);
  filterStatus = signal<'all' | 'active' | 'completed' | 'cancelled'>('all');

  filteredBookings = computed(() => {
    const status = this.filterStatus();
    if (status === 'all') {
      return this.bookings();
    }
    return this.bookings().filter(b => b.status === status);
  });

  constructor(
    private bookingService: BookingService,
    private storageService: StorageService
  ) {
    this.loadBookings();
  }

  loadBookings(): void {
    this.bookings.set(this.storageService.getAllBookings());
  }

  setFilter(status: 'all' | 'active' | 'completed' | 'cancelled'): void {
    this.filterStatus.set(status);
  }

  cancelBooking(id: string): void {
    if (confirm('¿Estás seguro de que deseas cancelar esta reserva?')) {
      this.storageService.updateBookingStatus(id, 'cancelled');
      this.loadBookings();
    }
  }

  deleteBooking(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta reserva?')) {
      this.storageService.deleteBooking(id);
      this.loadBookings();
    }
  }

  backToSearch(): void {
    this.bookingService.setCurrentView('search');
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'active':
        return 'Activa';
      case 'completed':
        return 'Completada';
      case 'cancelled':
        return 'Cancelada';
      default:
        return status;
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}