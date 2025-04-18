import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { ChallengeDetailsComponent } from '../../pages/challenge-details/challenge-details.component';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-crud',
  standalone: true,
  imports: [CommonModule, FormsModule, ChallengeDetailsComponent],
 // providers: [provideToastr(ToastrModule.forRoot())],
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.css'
})
export class CrudComponent {

  posts: any[] = [];
  newPost = { title: '', body: '' };
  isEditing = false;
  editId: number | null = null;
  loading = false;
  challenges = {
    title:
      "CRUD Operations with API",
    requirements: [
      'Fetch data from an API and display it in a table.',
      'Implement a form to add new records to the API.',
      'Add edit functionality to update records.',
      'Allow deletion of records with a confirmation prompt.',
      'Show loading indicators when making API calls.'
    ],
    features: [
      'Use https://jsonplaceholder.typicode.com/posts for fake API calls.',
      'Create a form with title and body fields for adding new posts.',
      'Display a toast message after successful operations.',
      'Use loading indicators while waiting for API responses.'
    ],
  };

  constructor(private apiService: ApiService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.loading = true;
    this.apiService.getAPI('posts').subscribe({
      next: (response) => {
        this.posts = response.body ?? [];
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching posts:', error);
        this.loading = false;
      }
    });    
  }

  submit() { 
    if(this.newPost.title.trim() && this.newPost.body.trim()) {
      this.loading = true;
      this.posts = [];
      this.isEditing ? this.updatePost() : this.addPost();
    }else {
      this.toastr.error('Please fill in all fields!');
    }
  }

  addPost() {
    this.apiService.postAPI('posts', this.newPost).subscribe({
      next: (response) => {
        this.toastr.success('Post created successfully!', 'Success');
        this.getPosts(); // Refresh the posts list after adding a new post
        this.newPost = { title: '', body: '' };
        this.loading = false;
      },
      error: (error) => {
        console.error('Error adding post:', error);
        this.loading = false;
      }
    });
  }

  editPost(post: any) {
    this.newPost = { title: post.title, body: post.body };
    this.loading = false;
    this.isEditing = true;
    this.editId = post.id;
  }

  updatePost() {
    this.apiService.putAPI(`posts/${this.editId}`, this.newPost).subscribe({
      next: (response) => {
        const index = this.posts.findIndex(post => post.id === this.editId);
        this.getPosts(); // Refresh the posts list after updating a post
        this.newPost = { title: '', body: '' };
        this.isEditing = false;
        this.editId = null;
        this.loading = false;
        this.toastr.success('Post updated successfully!', 'Success');
      },
      error: (error) => {
        console.error('Error updating post:', error);
        this.loading = false;
      }
    });
  }

  deletePost(id: number) {
    if (confirm('Are you sure you want to delete this post?')) {
      this.loading = true;
      this.apiService.deleteAPI(`posts/${id}`).subscribe({
        next: (response) => {
          this.getPosts(); // Refresh the posts list after deleting a post
          this.loading = false;
        },
        error: (error) => {
          console.error('Error deleting post:', error);
          this.loading = false;
        }
      });
    }
  }
}
