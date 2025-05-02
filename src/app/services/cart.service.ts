import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';
import { CartItem } from '../models/cartItem.models'; // Import the CartItem interface

@Injectable({
  providedIn: 'root'
})
export class CartService {


  private cart: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartSubject.asObservable();

  constructor() { }

  addToCart(product: Product) {   
    const existing = this.cart.find(p => p.id === product.id);
    if (existing) {
      existing.quantity++;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
    this.cartSubject.next(this.cart);
  }

  updateQuantity(id: number, qty: number) {
    const item = this.cart.find(p => p.id === id);
    if (item) item.quantity = qty;
    this.cartSubject.next(this.cart);
  }

  removeFromCart(id: number) {
    this.cart = this.cart.filter(p => p.id !== id);
    this.cartSubject.next(this.cart);
  }

  clearCart() {
    this.cart = [];
    this.cartSubject.next(this.cart);
  }
}

// export interface CartItem extends Product {
//   quantity: number;
// }
