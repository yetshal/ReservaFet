import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../../services/booking.service';
import { SPACE_TYPES, BUILDINGS } from '../../models/space.model';

@Component({
  selector: 'app-search-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-section.component.html',
  styleUrl: './search-section.component.css'
})
export class SearchSectionComponent {
  showFilters = signal(false);
  spaceTypes = SPACE_TYPES;
  buildings = BUILDINGS;

  selectedType = signal('Todos');
  selectedBuilding = signal('Todos');
  minCapacity = signal<number | null>(null);

  constructor(public bookingService: BookingService) {}

  toggleFilters(): void {
    this.showFilters.update(value => !value);
  }

  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.bookingService.setSearchTerm(input.value);
  }

  onDateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.bookingService.setDate(input.value);
  }

  onTypeChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedType.set(select.value);
    this.updateFilters();
  }

  onBuildingChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedBuilding.set(select.value);
    this.updateFilters();
  }

  onCapacityChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value ? parseInt(input.value) : null;
    this.minCapacity.set(value);
    this.updateFilters();
  }

  updateFilters(): void {
    this.bookingService.setFilterOptions({
      type: this.selectedType(),
      building: this.selectedBuilding(),
      minCapacity: this.minCapacity()
    });
  }

  clearFilters(): void {
    this.selectedType.set('Todos');
    this.selectedBuilding.set('Todos');
    this.minCapacity.set(null);
    this.bookingService.clearFilters();
    
    // Limpiar inputs
    const capacityInput = document.querySelector('input[type="number"]') as HTMLInputElement;
    if (capacityInput) {
      capacityInput.value = '';
    }
  }
}