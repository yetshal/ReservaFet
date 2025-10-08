import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { SearchSectionComponent } from './components/search-section/search-section.component';
import { SpaceCardComponent } from './components/space-card/space-card.component';
import { TimeSelectorComponent } from './components/time-selector/time-selector.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { MyBookingsComponent } from './components/my-bookings/my-bookings.component';
import { FooterComponent } from './components/footer/footer.component';
import { BookingService } from './services/booking.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    SearchSectionComponent,
    SpaceCardComponent,
    TimeSelectorComponent,
    ConfirmationComponent,
    MyBookingsComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(public bookingService: BookingService) {}
}