import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileMenuComponent } from '../profile-menu/profile-menu.component';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ProfileMenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  showMenu = signal(false);

  constructor(public bookingService: BookingService) {}

  toggleMenu(): void {
    this.showMenu.update(value => !value);
  }

  goToHome(): void {
    this.bookingService.setCurrentView('search');
    this.showMenu.set(false);
  }

  goToMyBookings(): void {
    this.bookingService.goToMyBookings();
    this.showMenu.set(false);
  }
}