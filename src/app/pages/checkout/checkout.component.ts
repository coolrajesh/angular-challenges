import { Component,OnInit,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cartItem.models'; // Import the CartItem interface

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  cartItems: CartItem[] = []; // Initialize cartData with an empty array
  private cartService = inject(CartService); // Inject the CartService
  private destroy$ = new Subject<void>();
  
  constructor() { 
  
  }

  ngOnInit() {    
    this.cartService.cart$.pipe(takeUntil(this.destroy$)).subscribe(cart => {
      this.cartItems = cart; // Update cartData whenever the cart changes
    })
  };

  get subtotal(): number {
    return this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  get tax(): number {
    return +(this.subtotal * 0.05).toFixed(2);
  }

  get total(): number {
    return this.subtotal + this.tax;
  }

  increaseQuantity(index: number): void {
    this.cartItems[index].quantity += 1;
  }

  decreaseQuantity(index: number): void {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity -= 1;
    }
  }

  removeItem(index: number): void {
    this.cartItems.splice(index, 1);
  }

  placeOrder(): void {
    if (!this.cartItems.length) {
      alert('Cart is empty!');
      return;
    }

    console.log('Order placed:', {
      //billing: this.billingInfo,
      items: this.cartItems,
      total: this.total
    });

    alert('✅ Order placed successfully!');
    // Reset form & cart (simulate)
    this.cartItems = [];
    //this.billingInfo = { name: '', email: '', address: '', paymentMethod: '' };
  }
 
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
