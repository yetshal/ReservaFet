import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css'
})
export class ConfirmationComponent {
  constructor(public bookingService: BookingService) {}

  newBooking(): void {
    this.bookingService.newBooking();
  }

  goToMyBookings(): void {
    this.bookingService.goToMyBookings();
  }
}