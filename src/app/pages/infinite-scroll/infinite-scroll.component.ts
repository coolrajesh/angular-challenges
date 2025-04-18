import { Component, OnInit,ViewChild,ElementRef,HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChallengeDetailsComponent } from '../../pages/challenge-details/challenge-details.component';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-infinite-scroll',
  standalone: true,
  imports: [CommonModule, FormsModule,ChallengeDetailsComponent],
  templateUrl: './infinite-scroll.component.html',
  styleUrl: './infinite-scroll.component.css'
})
export class InfiniteScrollComponent implements OnInit{

  
  challenges = {
    title:
      "Implement Infinite Scrolling for a List of Items.Instead of traditional pagination, implement infinite scrolling where more items load as the user scrolls down.",
    requirements: [
      'Fetch data dynamically from an API when the user reaches the bottom.',
      'Show a loading indicator while new data is being loaded.',
      'Prevent duplicate API calls when already loading data.',
      'Handle API errors gracefully.'
    ],
    features: [
      'API Integration with Pagination(Data is fetched from an API using pagination parameters).',
      'Auto Load More Data on Scroll(As the user scrolls down, new items automatically load without needing to click a button.)',
      'Loading Indicator(A spinner or loading message appears when fetching new data.)',
      'Prevent Duplicate API Calls(Ensure that the API is called only once per scroll trigger.)',
      'Handle API Errors Gracefully(If the API request fails, display an error message instead of breaking the UI.)',
      'Stop Loading When No More Data Exists(If the API returns no more data, stop further requests.)',
      'If there is no more data, stop making API requests and display a "No more items" message.'
    ],
  };

  posts: any[] = [];
  page = 1;
  limit = 10;
  loading = false;
  hasMoreData = true; // Flag to check if more data is available
  errorMessage = false;

  constructor(private apiService: ApiService) {

  }

  ngOnInit(): void {
    this.getPosts();   
  }

  getPosts(): void { 
    this.loading = true;
    this.apiService.getAPI('posts', this.page, this.limit).subscribe({
      next: (response) => {
        this.posts = response.body ?? [];      
        this.posts.forEach((element, index) => {
          element.index = index + 1; // Add index property to each post
        });
        this.loading = false;        
      },error: (error) => {
        console.error('Error fetching posts:', error);
        this.loading = false;
      }
    });
  }

  loadMorePosts(): void {
    if (this.loading || !this.hasMoreData) return; // Prevent duplicate calls
    this.loading = true;
    this.page++;
    this.apiService.getAPI('posts', this.page, this.limit).subscribe({
      next: (response) => {
        const newPosts = response.body??[];
        if (newPosts.length === 0) {
          this.hasMoreData = false; // No more data available
        } else {
          this.posts.push(...newPosts); // Append new posts to the existing list
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching more posts:', error);
        this.loading = false;
        this.errorMessage = true;
      }
    });
  }

  @HostListener('window:scroll', []) onScroll(): void {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const fullHeight = document.documentElement.scrollHeight;
    console.log('Scroll Position:', scrollTop);
    console.log('Window Height:', windowHeight);
    console.log('Full Page Height:', fullHeight);
    // Check if the user reached the bottom
    if (scrollTop + windowHeight >= fullHeight - 10) { // Adding a small buffer (10px)      
      this.loadMorePosts(); // Load more posts
    }
  }
}
