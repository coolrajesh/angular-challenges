import { Component, inject,HostListener, ViewChild, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Router,RouterLink } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { Options } from '@angular-slider/ngx-slider';
import { fromEvent, Observable,Subject } from 'rxjs';
import { map,startWith } from 'rxjs/operators';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { Category } from '../../models/category.model';
import { ProductFactoryService } from '../../factories/product-factory.service';
import { LoaderComponent } from '../../loader/loader.component';
import { ApiService } from '../../services/api.service';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, NgSelectModule, NgxSliderModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

  @ViewChild('categorySelect') categorySelect!: NgSelectComponent; // Reference to the ng-select component
  products: Product[] = [];
  product: Product;
  categoriesList: Category[] = []; // List of categories
  category: Category;
  cartCount = 0;
  page = 1;
  limit = 10;
  hasMoreData = true; // Flag to check if more data is available
  errorMessage = false;  
  value: number = 0;
  minValue: number = 10; // Initialize with a default minimum value
  maxValue: number = 2000; // Initialize with a default maximum value
  options: Options = {
    floor: 0,
    ceil: 2000
  };
  
  selectedCategories: string[] = []; // Initialize selectedCategories with an empty array

  
  private cartService = inject(CartService);
  private router = inject(Router);
  private productFactory = inject(ProductFactoryService);

  constructor(private apiService: ApiService) {
    this.cartService.cart$.subscribe(cart => {
      this.cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    });
    this.product = this.productFactory.createEmptyProduct(); 
    this.category = this.productFactory.createEmptyCategory(); // Initialize category
  }

  ngOnInit() {
    this.getProducts(); // Initial fetch of products
    this.getCategory(); // Fetch categories
    
    // this.apiService.getAll<Product>('products').subscribe({
    //   next: (response) => {
    //     this.products = response.body ?? [];
    //   }
    // });
  }

  getProducts(): void {    
   
    this.apiService.getGenericAPI<Product>('products', {offset: this.page,limit: this.limit}).subscribe({
      next: (response) => {
        const newProducts = response.body ?? [];
        if (newProducts.length === 0) {
          this.hasMoreData = false; // No more data available
        } else {
          this.products.push(...newProducts); // Append new products to the existing list
        }
       
      },
      error: (error) => {
        console.error('Error fetching products:', error);        
        this.errorMessage = true;
      }
    });
  }

  loadMoreProducts(): void {
    if (!this.hasMoreData) return; // Prevent duplicate calls   
    this.page++;
    this.apiService.getGenericAPI<Product>('products', { offset: this.page, limit: this.limit, categoryId: this.selectedCategories }).subscribe({
      next: (response) => {
        const newProducts = response.body ?? [];
        if (newProducts.length === 0) {
          this.hasMoreData = false; // No more data available
        } else {
          this.products.push(...newProducts); // Append new posts to the existing list
        }        
      },
      error: (error) => {
        console.error('Error fetching more posts:', error);        
        this.errorMessage = true;
      }
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  getCategory() {
    this.apiService.getGenericAPI<Category>('categories').subscribe({
      next: (response) => {
        this.categoriesList = response.body ?? [];         
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
        this.errorMessage = true;
      }
    });
  }

  onUserChange(changeContext: any): void {
    this.minValue = changeContext.value;
    this.maxValue = changeContext.highValue;
    console.log(`Min Value: ${this.minValue}, Max Value: ${this.maxValue}`);
    this.getFilteredProducts({ price_min: this.minValue, price_max: this.maxValue, categoryId: this.selectedCategories });
    // You can now use this.minValue and this.maxValue for filtering or other logic
  }

  @HostListener('window:scroll', []) onScroll() : void {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const fullHeight = document.documentElement.scrollHeight;
    if (scrollTop + windowHeight >= fullHeight - 10) {
      this.loadMoreProducts(); // Call the method to fetch more products when scrolled to the bottom
    }
  }

  goToProductDetails(product: Product) {
    this.router.navigate(['/product-details', product.id] );    
  }

  onChange(event: any) {    
    console.log(this.selectedCategories);    
    this.getFilteredProducts({ price_min: this.minValue, price_max: this.maxValue,categoryId: this.selectedCategories }); // Call the method to fetch filtered products
  }

  getFilteredProducts(params: any): void {
    this.products = [];
    this.apiService.getGenericAPI<Product>('products',params ).subscribe({
      next: (response) => {
        const newProducts = response.body ?? [];
        if (newProducts.length === 0) {
          this.hasMoreData = false; // No more data available
        } else {
          this.products.push(...newProducts); // Append new products to the existing list
        }        
      },
      error: (error) => {
        console.error('Error fetching products:', error);        
        this.errorMessage = true;
      }
    });
  }
 
}
