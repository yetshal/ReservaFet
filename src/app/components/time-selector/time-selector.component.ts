import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../services/booking.service';
import { TIME_SLOTS } from '../../models/space.model';

@Component({
  selector: 'app-time-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './time-selector.component.html',
  styleUrl: './time-selector.component.css'
})
export class TimeSelectorComponent {
  timeSlots = TIME_SLOTS;

  constructor(public bookingService: BookingService) {}

  selectTime(slot: string): void {
    this.bookingService.selectTime(slot);
  }

  isSelected(slot: string): boolean {
    return this.bookingService.selectedTime() === slot;
  }

  confirmBooking(): void {
    this.bookingService.confirmBooking();
  }

  canConfirm(): boolean {
    return !!this.bookingService.selectedTime();
  }
}