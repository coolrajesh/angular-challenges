import { Component,inject } from '@angular/core';
import { ActivatedRoute, Router,RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { ProductFactoryService } from '../../factories/product-factory.service'; 
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

  product: Product;
  private cartService = inject(CartService);
  private apiService = inject(ApiService);
  private route = inject(ActivatedRoute);
  private productFactory = inject(ProductFactoryService);
  cartCount = 0;
  errorMessage = false;
  productId: number = 0;
  images: string[] = [];
  selectedImage: string = '';
  selectedImageIndex: number = 0;
  showPopup = false;
  zoomStyle = {};


  
  constructor() {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.productFactory.createEmptyProduct();   
    this.cartService.cart$.subscribe(cart => {
      this.cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    });
  }

  ngOnInit() {
    this.getProductDetails(this.productId); 
  }

  getProductDetails(id: number): void {      
    this.apiService.getByIdAPI<Product>('products', id).subscribe({
      next: (response) => {
        const productData = response.body ?? null; // Use null if no data is returned
        if (productData) {
          this.product = productData; 
          this.images = this.product.images;        
          this.selectedImage = this.images[0]; 
        } else {
          this.errorMessage = true; 
        }      
      },
      error: (error) => {
        console.error('Error fetching product details:', error);        
        this.errorMessage = true;
      }
    });
  }  

  addToCart(product: Product) {
     this.cartService.addToCart(product);
  }
  
  selectImage(img: string) {
    this.selectedImage = img;
  }

  onMouseMove(event: MouseEvent) {
    const container = (event.target as HTMLElement).getBoundingClientRect();
    const x = ((event.clientX - container.left) / container.width) * 100;
    const y = ((event.clientY - container.top) / container.height) * 100;

    this.zoomStyle = {
      transform: 'scale(2)',
      'transform-origin': `${x}% ${y}%`
    };
  }

  onMouseLeave() {
    this.zoomStyle = {
      transform: 'scale(1)',
      'transform-origin': 'center center'
    };
  }
}
