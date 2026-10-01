import { Component, signal } from '@angular/core';
type PhotoType = 'image';

interface Restaurant {
  id: number;
  name: string;
  description: string;
  photo: PhotoType;
  rate: string;
  status: string;
  address: string;
}

@Component({
  imports: [],
  selector: 'app-restaurant-list',
  styleUrl: './restaurant-list.scss',
  templateUrl: './restaurant-list.html',
})
export class RestaurantList {
  protected readonly restaurants = signal<Restaurant[]>([
    { id: 1, name: 'Test', description: 'Testing desc', photo: 'image', rate: '5/5', status: 'open', address: 'Aleja Słowackiego 12/2' },
    { id: 2, name: 'Test2', description: 'Testing desc', photo: 'image', rate: '5/5', status: 'open', address: 'Aleja Słowackiego 12/2' },
    { id: 3, name: 'Test3', description: 'Testing desc', photo: 'image', rate: '5/5', status: 'open', address: 'Aleja Słowackiego 12/2' },
    { id: 4, name: 'Test4', description: 'Testing desc', photo: 'image', rate: '5/5', status: 'open', address: 'Aleja Słowackiego 12/2' },
  ]);
}
