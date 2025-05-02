import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-imageupload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './imageupload.component.html',
  styleUrl: './imageupload.component.css'
})
export class ImageuploadComponent {

  imageFiles: File[] = [];
  imagePreviews: string[] = [];
  //headers = ['Status', 'NSA8208-266', 'BAC13789', 'Total'];
  headers: string[] = [];
  rows: any[] = [];
  columnTotals: Record<string, number> = {};
  grandTotal: number = 0;
  //rows: any[] = [];

  //columnTotals: any = {};
  data = [
    { status: 'Received', values: [10, 5, 15] },
    { status: 'Quarantine', values: [2, 0, 2] },
    { status: 'Shipped', values: [0, 0, 0] },
    { status: 'Total', values: [12, 5, 17] }
  ];

  stockHeaders = ['Stock Status', 'Quantity in Plant 8022', 'Quantity in Plant 8000', 'Total'];
  stockData = [
    { status: 'Un-restricted Quantity', values: [17, 4, 21] },
    { status: 'QI - Open Inspection lot', values: [0, 5, 5] },
    { status: 'Restricted Quantity/Blocked', values: [0, 0, 0] },
    { status: 'Total', values: [17, 9, 26] }
  ];

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (!target.files) return;
    const files = Array.from(target.files);
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        this.imageFiles.push(file);
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagePreviews.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    });

    console.log('iamgefiles', this.imageFiles);
    console.log('imagepreviews', this.imagePreviews);
  }

  removeImage(index: number): void {
    this.imageFiles.splice(index, 1);
    this.imagePreviews.splice(index, 1);
  }

  ngOnInit() {
    // Simulated API response
    const response = {
      headers: ['NSA8208-266', 'BAC13789'],
      rows: [
        {
          status: 'Received',
          data: { 'NSA8208-266': 10, 'BAC13789': 5 }
        },
        {
          status: 'Quarantine',
          data: { 'NSA8208-266': 2, 'BAC13789': 0 }
        },
        {
          status: 'Shipped',
          data: { 'NSA8208-266': 0, 'BAC13789': 0 }
        }
      ]
    };


  }
}
