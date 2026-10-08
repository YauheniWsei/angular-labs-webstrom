import { Component, computed, signal } from '@angular/core';
import { RestaurantCard } from '../restaurant-card/restaurant-card';
import { CUISINE_LABELS, Restaurant, SortOption } from '../models/Restaurant.model';
import restaurantsData from '../data/restaurants.json';

@Component({
  imports: [RestaurantCard],
  selector: 'app-restaurant-list',
  styleUrl: './restaurant-list.scss',
  templateUrl: './restaurant-list.html',
})
export class RestaurantList {
  protected readonly restaurants = signal<Restaurant[]>(restaurantsData);

  protected readonly searchText = signal('');
  protected readonly cuisine = signal('all');
  protected readonly onlyActive = signal(false);
  protected readonly sortBy = signal<SortOption | null>(null);

  protected readonly cuisineOptions = Object.entries(CUISINE_LABELS).map(([value, label]) => ({ value, label }));

  protected readonly sortOptions: { value: SortOption; label: string }[] = [
    { value: 'rating', label: 'Najlepiej oceniane' },
    { value: 'deliveryTime', label: 'Najszybsza dostawa' },
    { value: 'deliveryFee', label: 'Najtańsza dostawa' },
  ];

  protected readonly visibleRestaurants = computed(() => {
    const text = this.searchText().trim().toLowerCase();
    const cuisine = this.cuisine();
    const onlyActive = this.onlyActive();

    const filtered = this.restaurants().filter(
      (r) =>
        (r.name.toLowerCase().includes(text) || r.description.toLowerCase().includes(text)) &&
        (cuisine === 'all' || r.cuisine === cuisine) &&
        (!onlyActive || r.isActive),
    );

    switch (this.sortBy()) {
      case 'rating':
        return [...filtered].sort((a, b) => b.rating - a.rating);
      case 'deliveryTime':
        return [...filtered].sort((a, b) => a.deliveryTimeMin - b.deliveryTimeMin);
      case 'deliveryFee':
        return [...filtered].sort((a, b) => a.deliveryFee - b.deliveryFee);
      default:
        return filtered;
    }
  });

  protected toggleSort(option: SortOption) {
    this.sortBy.update((current) => (current === option ? null : option));
  }

  protected updateRestaurant(updated: Restaurant) {
    this.restaurants.update((list) => list.map((r) => (r.id === updated.id ? updated : r)));
  }

  protected resetFilters() {
    this.searchText.set('');
    this.cuisine.set('all');
    this.onlyActive.set(false);
    this.sortBy.set(null);
  }
}
