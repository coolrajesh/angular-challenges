import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChallengeDetailsComponent } from '../../pages/challenge-details/challenge-details.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [FormsModule,CommonModule,ChallengeDetailsComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent implements OnInit{
  challenges = {
    title:
      "Todo List with Filtering & Persistence",
    requirements: [
      'Users can add a new task (input + "Add" button)',
      'Tasks display in a list with checkboxes (✔) to mark them as done',
      'Each task has edit and delete buttons',
      'Clicking a completed task strikes it out',
      'Filtering:',
      'All → Show all tasks',
      'Active" → Show only incomplete tasks',
      'Completed" → Show only completed tasks',
      'Persistence:',
      'Save the tasks in localStorage so they stay after a page refresh'
    ],
    features: [
      'User can add / edit / delete tasks',
      'User can mark tasks as completed',
      'Tasks remain after refresh',
      'Filtering works smoothly',
      'Implement animations when adding/removing tasks',
      'Add due dates to tasks'
    ],
  };
  todoInput: string = '';
  list: { todolist: string, isCompleted: boolean }[] = [];
  filteredTasks: { todolist: string, isCompleted: boolean }[] = [];
  successMessage = ''; 
  showNotification = false; 
  errorMessage = '';
  selectedIndex: number[] = [];
  editIndex: number = -1;
  btnText: string = 'Add Task';
  filterValue: string = '';

  ngOnInit(): void {
    this.loadTasks();
    this.filterTask();
  }
  addTask() { 
    if (!this.todoInput.trim()) {
      this.errorMessage = 'Enter a valid task';
      setTimeout(() => {
        this.errorMessage = '';
      }, 3000);
      return;
    } else {
      this.errorMessage = '';
    }
    if (this.editIndex < 0) {
      this.list = [{ todolist: this.todoInput.trim(), isCompleted: false }, ...this.list,];
    } else {
      this.list[this.editIndex].todolist = this.todoInput.trim();
    }
    this.filteredTasks = [...this.list];
    this.todoInput = ''; 
    this.saveTasks();
    this.editIndex = -1;
    this.showSuccessMessage('Task added successfully');
  } 

  // Load tasks from localStorage
  loadTasks() {
    const storedTasks = localStorage.getItem('taskList');
    this.list = storedTasks ? JSON.parse(storedTasks) : [];
  }

  // Save tasks to localStorage
  saveTasks() {
    this.btnText = 'Add Task';
    localStorage.setItem('taskList', JSON.stringify(this.list));    
  } 
  
  showSuccessMessage(message: string) {
    this.successMessage = message;
    this.showNotification = true;
    setTimeout(() => {
      this.showNotification = false;
    }, 3000);
  }

  toggleSelection(index:number) {
    if (this.selectedIndex.includes(index)) {
      this.selectedIndex = this.selectedIndex.filter(i => i !== index);
    } else {
      this.selectedIndex.push(index);
    }
  }

  markAsDone() {
   this.selectedIndex.forEach(index => {      
      this.list[index].isCompleted = true      
   });
   this.saveTasks();
   this.selectedIndex = [];
  }

  undoCompleted(index: number) {   
    this.list[index].isCompleted = false;    
    this.filteredTasks = [...this.list];
    this.saveTasks();
  }
  
  deleteTask(index: number) {
    this.list.splice(index, 1);
    this.filteredTasks = [...this.list];
    this.saveTasks();
  }

  editTask(index: number) {
    this.todoInput = this.list[index].todolist;
    this.editIndex = index;
    this.btnText = 'Edit Task';
  }

  filterTask() {  
    if (this.filterValue !== '') {
      this.filteredTasks = this.list.filter(element => element.isCompleted === (this.filterValue === 'true'));
    } else {
      this.filteredTasks = [...this.list];
    }
    this.saveTasks();
  }
}
