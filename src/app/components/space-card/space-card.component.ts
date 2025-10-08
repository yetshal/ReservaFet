import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Space } from '../../models/space.model';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-space-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './space-card.component.html',
  styleUrl: './space-card.component.css'
})
export class SpaceCardComponent {
  @Input({ required: true }) space!: Space;

  constructor(public bookingService: BookingService) {}

  onSelectSpace(): void {
    if (this.space.available) {
      this.bookingService.selectSpace(this.space);
    }
  }

  isSelected(): boolean {
    return this.bookingService.selectedSpace()?.id === this.space.id;
  }
}