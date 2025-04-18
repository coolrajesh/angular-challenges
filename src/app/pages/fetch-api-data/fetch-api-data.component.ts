import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChallengeDetailsComponent } from '../../pages/challenge-details/challenge-details.component';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-fetch-api-data',
  standalone: true,
  imports: [CommonModule, FormsModule,ChallengeDetailsComponent],
  templateUrl: './fetch-api-data.component.html',
  styleUrl: './fetch-api-data.component.css'
})
export class FetchApiDataComponent implements OnInit{

  challenges = {
    title:
      "Build an Angular component that fetches data from a public API and displays it in a sortable, paginated table with search functionality.",
    requirements: [
      'Fetch data from an API(e.g., JSONPlaceholder or any other public API).',
      'Display the fetched data in a table with Tailwind.',
      'Add search functionality to filter results dynamically.',
      'Implement sorting(ascending/ descending) for table columns.',
      'Implement pagination to handle large datasets.'
    ],
    features: [
      'Allow users to toggle visible columns dynamically.',
      'Add debounce search input to optimize filtering.',
      'Show loading indicators when fetching data.',
      'Implement error handling for API failures.'
    ],
  };

  posts: any[] = []; 
  currentPage = 1;
  totalPages = 0;
  pageSize = 10;
  totalItems = 0;
  pageNumbers: number[] = [];


  constructor(private apiService: ApiService) {
    
  }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void { 
    this.apiService.getAPI('posts',this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        console.table(response);
        this.posts = response.body??[];
        this.totalItems = Number(response.headers.get('X-Total-Count'));
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
        this.posts.forEach((element, index) => {
          element.index = index + 1;
        });
        this.generatePageNumbers();
        console.log(this.posts)
      },
      error: (err) => console.error('Error:', err),
    });
  }

  changePage(newPage: number) {
    if (newPage > 0 && newPage <= this.totalPages) {
      this.currentPage = newPage;
      this.getPosts();
    }
  }

  generatePageNumbers() {
    this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
