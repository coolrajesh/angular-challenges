import { Injectable } from '@angular/core';
import { Product } from '../models/product.model'; // adjust the path as needed
import { Category } from '../models/category.model'; // adjust the path as needed

@Injectable({
  providedIn: 'root'
})
export class ProductFactoryService {

  constructor() { }

  createEmptyProduct(): Product {
    return {
      id: 0,
      title: '',
      description: '',
      price: 0,
      images: [],
      stock: 0,
      rating: 0,
      category: {
        id: 0,
        name: '',
        imageUrl: ''
      }
    };
  }

  createEmptyCategory(): Category {
    return {
      id: 0,
      name: ''
    };
  }
}
